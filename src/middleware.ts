import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * Minimal Decoy Headers for Scanner Misdirection
 * 
 * Reduced to 8 credible headers to avoid detection by advanced scanners.
 * Too many decoy headers can be a fingerprint in itself.
 */
const decoyHeaders: Record<string, string> = {
  // Standard server header (common misdirection)
  'Server': 'nginx/1.24.0',
  
  // Varnish cache (very common)
  'X-Varnish': '123456789',
  'X-Cache': 'HIT',
  
  // Cloudflare-like headers (widely used)
  'CF-Cache-Status': 'HIT',
  
  // Security headers (legitimate)
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
};

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
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Role-based access control is handled client-side in layout.tsx
  // This ensures Supabase is the single source of truth for roles
  // Clerk publicMetadata can be out of sync with Supabase

  // Create response with decoy headers
  const response = NextResponse.next();
  
  // Inject decoy headers to mislead scanners
  for (const [key, value] of Object.entries(decoyHeaders)) {
    response.headers.set(key, value);
  }
  
  return response;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
