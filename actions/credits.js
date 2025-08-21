"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { format, startOfMonth } from "date-fns";
import { revalidatePath } from "next/cache";

const PLAN_CREDITS = {
  free_user: 0,
  standard: 10,
  premium: 24,
};

const APPOINTMENT_CREDIT_COST = 2;

export async function checkAndAllocateCredits(user) {
  try {
    if (!user) {
      return null;
    }

    if (user.role !== "PATIENT") {
      return user;
    }

    const { has } = await auth();

    const hasBasic = has({ plan: "free_user" });
    const hasStandard = has({ plan: "standard" });
    const hasPremium = has({ plan: "premium" });

    let currentPlan = null;
    let creditsToAllocate = 0;

    if (hasPremium) {
      currentPlan = "premium";
      creditsToAllocate = PLAN_CREDITS.premium;
    } else if (hasStandard) {
      currentPlan = "standard";
      creditsToAllocate = PLAN_CREDITS.standard;
    } else if (hasBasic) {
      currentPlan = "free_user";
      creditsToAllocate = PLAN_CREDITS.free_user;
    }

    if (!currentPlan) {
      return user;
    }

    const currentMonth = format(new Date(), "yyyy-MM");

    if (user.transactions.length > 0) {
      const latestTransaction = user.transactions[0];
      const transactionMonth = format(
        new Date(latestTransaction.createdAt),
        "yyyy-MM"
      );

      const transactionPlan = latestTransaction.packageId;
      if (
        transactionMonth === currentMonth &&
        transactionPlan === currentPlan
      ) {
        return user;
      }
    }

    const updatedUser = await prisma.$transaction(async (tx) => {
      // Double-check inside the transaction to reduce race risk
      const existing = await tx.creditTransaction.findFirst({
        where: {
          userId: user.id,
          type: "CREDIT_PURCHASE",
          packageId: currentPlan,
          createdAt: { gte: startOfMonth(new Date()) },
        },
        orderBy: { createdAt: "desc" },
      });
      if (existing) {
        return tx.user.findUnique({ where: { id: user.id } });
      }
      await tx.creditTransaction.create({
        data: {
          userId: user.id,
          amount: creditsToAllocate,
          type: "CREDIT_PURCHASE",
          packageId: currentPlan,
        },
      });

      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          credits: {
            increment: creditsToAllocate,
          },
        },
      });

      return updatedUser;
    });

    revalidatePath("/doctor");
    revalidatePath("/appointments");

    return updatedUser;
  } catch (error) {
    console.error(
      "Failed to check subscription and allocate credits:",
      error.message
    );
    return null;
  }
}
