import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * Decoy Headers for Wappalyzer Misdirection
 * 
 * These headers use REAL patterns that Wappalyzer recognizes.
 * Goal: Display exactly 20 fake technologies to confuse fingerprinting.
 * 
 * Wappalyzer detects via:
 * - X-Powered-By (most important)
 * - X-Generator (CMS detection)
 * - X-AspNet-Version, X-AspNetMvc-Version (ASP.NET)
 * - X-Drupal-Cache, X-Drupal-Dynamic-Cache (Drupal)
 * - X-Shopify-Stage (Shopify)
 * - X-Varnish (Varnish Cache)
 * - X-Sucuri-ID (Sucuri WAF)
 * - Via header (proxies)
 */
const decoyHeaders: Record<string, string> = {
  // 1. PHP (X-Powered-By is the main detection)
  'X-Powered-By': 'PHP/8.3.2, ASP.NET, Express, PleskLin',
  
  // 2-3. ASP.NET (real headers Wappalyzer checks)
  'X-AspNet-Version': '4.0.30319',
  'X-AspNetMvc-Version': '5.2.9',
  
  // 4-5. Drupal (real headers)
  'X-Drupal-Cache': 'HIT',
  'X-Drupal-Dynamic-Cache': 'MISS',
  
  // 6. Generator meta equivalent (CMS detection)
  'X-Generator': 'WordPress 6.4.3, Joomla! 5.0, Drupal 10',
  
  // 7. Shopify (real header)
  'X-Shopify-Stage': 'production',
  
  // 8. Varnish Cache (real header)
  'X-Varnish': '123456789 987654321',
  
  // 9. Sucuri WAF (real header)
  'X-Sucuri-ID': 'abc123def456',
  
  // 10. Proxy/CDN chain (Via header is standard)
  'Via': '1.1 varnish, 1.1 nginx, 1.1 cloudflare',
  
  // 11. LiteSpeed (real header)
  'X-LiteSpeed-Cache': 'hit',
  
  // 12. Plesk (detected via X-Powered-By already, reinforce)
  'X-Plesk-Site': 'true',
  
  // 13. cPanel (real indicator)
  'X-cPanel': 'true',
  
  // 14. OpenResty/nginx variant
  'X-OpenResty': '1.25.3.1',
  
  // 15. Craft CMS (real header)
  'X-Craft-Token': 'disabled',
  
  // 16. Ghost CMS hint
  'X-Ghost-Cache-Status': 'HIT',
  
  // 17. Magento (real headers)
  'X-Magento-Vary': 'abc123',
  
  // 18. WP Engine (real header)
  'X-WPE-Cached': 'true',
  
  // 19. Cloudflare indicators
  'CF-Cache-Status': 'HIT',
  'CF-RAY': '8a1b2c3d4e5f6g7h-CDG',
  
  // 20. Fastly CDN (real header)
  'X-Served-By': 'cache-cdg20734-CDG, cache-par21345-PAR',
  'X-Cache': 'HIT, HIT',
  'X-Cache-Hits': '1, 1',
  
  // Bonus: Security tool hints that some scanners detect
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'X-Mod-Security': '2.9.7',
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
