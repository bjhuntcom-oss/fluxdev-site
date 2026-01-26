import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/connexion(.*)',
  '/inscription(.*)',
  '/services(.*)',
  '/projets(.*)',
  '/equipe',
  '/contact',
  '/mentions-legales',
  '/confidentialite',
  '/cgv',
  '/api/webhooks(.*)',
]);

const isAdminRoute = createRouteMatcher(['/dashboard/admin(.*)']);
const isStaffRoute = createRouteMatcher(['/dashboard/staff(.*)']);
const isDevRoute = createRouteMatcher(['/dashboard/dev(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (userId) {
    // Get user's publicMetadata to check role
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const role = (user.publicMetadata?.role as string) || 'user';

    if (isAdminRoute(req) && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (isStaffRoute(req) && !['staff', 'admin'].includes(role)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (isDevRoute(req) && !['dev', 'admin'].includes(role)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
