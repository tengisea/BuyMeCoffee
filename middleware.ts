import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/",
  // энд бусад нээлттэй (public) route-уудыг нэмээрэй
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Onboarding замд орох эрхтэй хэрэглэгчдэд зөвшөөрнө
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }

  // Нэвтрээгүй байж private зам руу орвол sign-in рүү чиглүүлнэ
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Нэвтэрсэн ч onboarding-оо дуусгаагүй бол onboarding руу чиглүүлнэ
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // Бусад тохиолдолд хандалтыг зөвшөөрнө
  if (userId && !isPublicRoute(req)) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Next.js-ийн дотоод болон статик файлуудаас бусад замуудыг шалгана
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // API route-уудыг үргэлж шалгана
    "/(api|trpc)(.*)",
  ],
};
