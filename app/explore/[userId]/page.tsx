// // app/explore/[userId]/page.tsx

// import { notFound } from "next/navigation";

// interface PageProps {
//   params: {
//     userId: string;
//   };
// }

// export default async function UserProfilePage({ params }: PageProps) {
//   const profile = await prisma.profile.findFirst({
//     where: {
//       userId: params.userId,
//     },
//   });

//   if (!profile) return notFound();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{profile.name}'s Profile</h1>
//       <img
//         src={profile.avatarImage}
//         alt={profile.name}
//         className="rounded-full my-4"
//         width={80}
//         height={80}
//       />
//       <p className="mb-2">
//         <strong>About:</strong> {profile.about}
//       </p>
//       <p>
//         <strong>Social Media:</strong>{" "}
//         <a href={profile.socialMediaURL} className="text-blue-600 underline">
//           {profile.socialMediaURL}
//         </a>
//       </p>
//     </div>
//   );
// }
