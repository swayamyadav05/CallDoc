"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setUserRole(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Find user in the database
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found in database");

  const role = formData.get("role");

  if (!role || !["PATIENT", "DOCTOR"].includes(role)) {
    throw new Error("Invalid role selection");
  }

  try {
    if (role === "PATIENT") {
      await prisma.user.update({
        where: {
          clerkUserId: userId,
        },
        data: {
          role: "PATIENT",
        },
      });

      revalidatePath("/");
      return { success: true, redirect: "/doctors" };
    }

    if (role === "DOCTOR") {
      const specialty = String(
        formData.get("specialty") || ""
      ).trim();
      const experienceRaw = formData.get("experience");
      const experience = Number.parseInt(String(experienceRaw), 10);
      const credentialUrl = String(
        formData.get("credentialUrl") || ""
      ).trim();
      const description = String(
        formData.get("description") || ""
      ).trim();

      if (!specialty || !credentialUrl || !description) {
        throw new Error("All fields are required");
      }
      if (
        !Number.isInteger(experience) ||
        experience < 1 ||
        experience > 80
      ) {
        throw new Error(
          "Experience must be and integer between 1 and 80."
        );
      }
      try {
        const url = new URL(credentialUrl);
        if (!["https:", "http:"].includes(url.protocol)) {
          throw new Error("Invalid credential URL protocol.");
        }
      } catch {
        throw new Error("Invalid credential URL.");
      }

      await prisma.user.update({
        where: {
          clerkUserId: userId,
        },
        data: {
          role: "DOCTOR",
          specialty,
          experience,
          credentialUrl,
          description,
          verificationStatus: "PENDING",
        },
      });

      revalidatePath("/");
      return { success: true, redirect: "/doctor/verification" };
    }
  } catch (error) {
    console.error("Failed to set user role:", error);
    throw new Error(
      `Failed to update user profile: ${error.message}`
    );
  }
}

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to get user information:", error);
    return null;
  }
}
