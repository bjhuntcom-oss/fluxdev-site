import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Decoy Headers - Mislead Wappalyzer and other scanners
const decoyHeaders: Record<string, string> = {
  // Fake Server Technologies
  'X-Powered-By': 'PHP/8.3.2',
  'X-AspNet-Version': '4.0.30319',
  'X-AspNetMvc-Version': '5.2.9',
  // Fake Frameworks
  'X-Framework': 'Laravel/10.41.0',
  'X-Django-Version': '4.2.9',
  'X-Rails-Version': '7.1.3',
  'X-Spring-Boot': '3.2.2',
  'X-Express-Version': '4.18.2',
  'X-Flask-Version': '3.0.1',
  'X-Symfony-Version': '7.0.3',
  'X-CodeIgniter': '4.4.4',
  // Fake CMS
  'X-CMS': 'WordPress/6.4.3',
  'X-Drupal-Version': '10.2.2',
  'X-Joomla-Version': '5.0.2',
  'X-Magento-Version': '2.4.6-p4',
  'X-Shopify-Stage': 'production',
  'X-Ghost-Version': '5.78.0',
  // Fake Security Tools
  'X-WAF': 'Cloudflare-Enterprise',
  'X-Protected-By': 'Imperva-Incapsula',
  'X-Security-Scanner': 'Qualys-WAS',
  'X-Bot-Protection': 'DataDome-Enterprise',
  'X-DDoS-Protection': 'Akamai-Kona',
  'X-SIEM': 'Splunk-Enterprise',
  // Fake CDN/Infrastructure
  'X-CDN': 'Fastly',
  'X-Cache-Backend': 'Varnish/7.4.2',
  'X-Load-Balancer': 'HAProxy/2.9.4',
  'X-Proxy': 'nginx/1.25.4',
  'X-Container': 'Docker/25.0.2',
  'X-Orchestration': 'Kubernetes/1.29.1',
  // Fake Database Hints
  'X-DB-Backend': 'PostgreSQL/16.1',
  'X-Cache-Store': 'Redis/7.2.4',
  'X-Search-Engine': 'Elasticsearch/8.12.0',
  'X-Queue': 'RabbitMQ/3.13.0',
  // Fake Cloud Provider
  'X-Cloud-Provider': 'AWS-EC2',
  'X-Region': 'eu-west-3',
  'X-Instance-Type': 'm7i.xlarge',
  // Fake Analytics/Monitoring
  'X-Analytics': 'Google-Analytics-4',
  'X-APM': 'Datadog-APM',
  'X-Monitoring': 'New-Relic',
  'X-Logging': 'ELK-Stack',
  // Fake Auth Provider
  'X-Auth-Provider': 'Auth0',
  'X-SSO': 'Okta-SAML',
  'X-MFA': 'Duo-Security',
  // Fake Payment
  'X-Payment-Gateway': 'Stripe-v3',
  'X-PCI-Compliant': 'Level-1',
  // Fake API Info
  'X-API-Version': 'v3.14.159',
  'X-Rate-Limit-Provider': 'Kong-Gateway',
  'X-GraphQL-Engine': 'Apollo-Server',
  // Fake Compliance
  'X-GDPR-Compliant': 'true',
  'X-SOC2-Certified': 'Type-II',
  'X-ISO27001': 'Certified',
  'X-HIPAA-Compliant': 'true',
  // Fake Build Info
  'X-Build-Hash': 'a3f8c2e9b1d4',
  'X-Deploy-ID': 'dpl_H7kJ9mN2pQ4r',
  'X-Environment': 'production-blue',
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
