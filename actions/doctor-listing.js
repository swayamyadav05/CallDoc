"use server";

import prisma from "@/lib/prisma";

export async function getDoctorsBySpecialty(rawSpecialty) {
  try {
    const specialty = (() => {
      try {
        return decodeURIComponent(String(rawSpecialty));
      } catch {
        return String(rawSpecialty);
      }
    })().trim();
    const doctors = await prisma.user.findMany({
      where: {
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
        specialty,
      },
      select: {
        id: true,
        name: true,
        specialty: true,
        experience: true,
        description: true,
        imageUrl: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return { doctors };
  } catch (error) {
    console.error("Failed to fetch doctors by specialty:", error);
    return { error: "Failed to fetch doctors" };
  }
}
