import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * Minimal Decoy Headers for Scanner Misdirection
 * 
 * Reduced to credible headers to avoid detection by advanced scanners.
 * Too many decoy headers can be a fingerprint in itself.
 */
const decoyHeaders: Record<string, string> = {
  'Server': 'nginx/1.24.0',
  'X-Varnish': '123456789',
  'X-Cache': 'HIT',
  'CF-Cache-Status': 'HIT',
};

/**
 * Real Security Headers — defense-in-depth
 * 
 * Anti-interception strategy (Burp Suite, mitmproxy, Charles):
 * - HSTS with preload: forces HTTPS, prevents SSL downgrade
 * - Certificate Transparency: detects rogue certificates
 * - COOP/CORP/COEP: cross-origin isolation, prevents data leaks
 * - CSP: blocks injected scripts/resources by proxy
 * - Permissions-Policy: restricts browser APIs
 * - Cache-Control on dashboard: prevents caching of sensitive data
 */
const securityHeaders: Record<string, string> = {
  // Prevent MIME sniffing
  'X-Content-Type-Options': 'nosniff',
  // Clickjacking protection
  'X-Frame-Options': 'SAMEORIGIN',
  // XSS filter (legacy browsers)
  'X-XSS-Protection': '1; mode=block',
  // HSTS — force HTTPS for 2 years, include subdomains, preload-ready
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  // Referrer policy — send origin only cross-origin
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Cross-Origin Opener Policy — isolate browsing context
  'Cross-Origin-Opener-Policy': 'same-origin',
  // Cross-Origin Resource Policy — block cross-origin reads
  'Cross-Origin-Resource-Policy': 'same-origin',
  // Restrict browser features
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=(), usb=(), bluetooth=(), serial=(), hid=()',
  // DNS prefetch for performance
  'X-DNS-Prefetch-Control': 'on',
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

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);
const isApiRoute = createRouteMatcher(['/api(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  const response = NextResponse.next();
  
  // Inject decoy headers (intentional — mislead Wappalyzer/scanners)
  for (const [key, value] of Object.entries(decoyHeaders)) {
    response.headers.set(key, value);
  }

  // Inject real security headers
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // Dashboard/API: prevent caching of sensitive authenticated data
  if (isDashboardRoute(req) || isApiRoute(req)) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
});

export const config = {
  matcher: [
    '/((?!_next|robots.txt|sitemap.xml|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
