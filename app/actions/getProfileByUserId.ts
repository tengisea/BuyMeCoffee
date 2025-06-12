"use server"
import prisma  from "@/lib/prisma"; // эсвэл өөрийн prisma зам

export async function getProfileByUserId(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      receivedDonations: {
        select: {
          id: true,
          amount: true,
          specialMessage: true,
          sspecialURLOrBuyMeACoffeeURL: true,
          donorId: true,
          donorName: true, // ← donorName одоо автоматаар зөвшөөрөгдөнө
          recipent: true,
          recipentId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  return profile
  
}
