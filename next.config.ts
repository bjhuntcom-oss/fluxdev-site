import type { NextConfig } from "next";

// Security Headers
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { 
    key: 'Content-Security-Policy', 
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.fluxdev.io https://*.clerk.accounts.dev https://va.vercel-scripts.com https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://clerk.fluxdev.io https://*.clerk.accounts.dev https://*.supabase.co wss://*.supabase.co https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "frame-src 'self' https://clerk.fluxdev.io https://*.clerk.accounts.dev https://challenges.cloudflare.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; ')
  },
];

// Decoy Headers - Mislead Wappalyzer and other scanners
const decoyHeaders = [
  // Fake Server Technologies
  { key: 'X-Powered-By', value: 'PHP/8.3.2' },
  { key: 'X-AspNet-Version', value: '4.0.30319' },
  { key: 'X-AspNetMvc-Version', value: '5.2.9' },
  { key: 'Server', value: 'Apache/2.4.58 (Ubuntu)' },
  
  // Fake Frameworks
  { key: 'X-Framework', value: 'Laravel/10.41.0' },
  { key: 'X-Django-Version', value: '4.2.9' },
  { key: 'X-Rails-Version', value: '7.1.3' },
  { key: 'X-Spring-Boot', value: '3.2.2' },
  { key: 'X-Express-Version', value: '4.18.2' },
  { key: 'X-Flask-Version', value: '3.0.1' },
  { key: 'X-Symfony-Version', value: '7.0.3' },
  { key: 'X-CodeIgniter', value: '4.4.4' },
  
  // Fake CMS
  { key: 'X-CMS', value: 'WordPress/6.4.3' },
  { key: 'X-Drupal-Version', value: '10.2.2' },
  { key: 'X-Joomla-Version', value: '5.0.2' },
  { key: 'X-Magento-Version', value: '2.4.6-p4' },
  { key: 'X-Shopify-Stage', value: 'production' },
  { key: 'X-Ghost-Version', value: '5.78.0' },
  
  // Fake Security Tools
  { key: 'X-WAF', value: 'Cloudflare-Enterprise' },
  { key: 'X-Protected-By', value: 'Imperva-Incapsula' },
  { key: 'X-Security-Scanner', value: 'Qualys-WAS' },
  { key: 'X-Bot-Protection', value: 'DataDome-Enterprise' },
  { key: 'X-DDoS-Protection', value: 'Akamai-Kona' },
  { key: 'X-SIEM', value: 'Splunk-Enterprise' },
  
  // Fake CDN/Infrastructure
  { key: 'X-CDN', value: 'Fastly' },
  { key: 'X-Cache-Backend', value: 'Varnish/7.4.2' },
  { key: 'X-Load-Balancer', value: 'HAProxy/2.9.4' },
  { key: 'X-Proxy', value: 'nginx/1.25.4' },
  { key: 'X-Container', value: 'Docker/25.0.2' },
  { key: 'X-Orchestration', value: 'Kubernetes/1.29.1' },
  
  // Fake Database Hints (misleading)
  { key: 'X-DB-Backend', value: 'PostgreSQL/16.1' },
  { key: 'X-Cache-Store', value: 'Redis/7.2.4' },
  { key: 'X-Search-Engine', value: 'Elasticsearch/8.12.0' },
  { key: 'X-Queue', value: 'RabbitMQ/3.13.0' },
  
  // Fake Cloud Provider
  { key: 'X-Cloud-Provider', value: 'AWS-EC2' },
  { key: 'X-Region', value: 'eu-west-3' },
  { key: 'X-Instance-Type', value: 'm7i.xlarge' },
  
  // Fake Analytics/Monitoring
  { key: 'X-Analytics', value: 'Google-Analytics-4' },
  { key: 'X-APM', value: 'Datadog-APM' },
  { key: 'X-Monitoring', value: 'New-Relic' },
  { key: 'X-Logging', value: 'ELK-Stack' },
  
  // Fake Auth Provider
  { key: 'X-Auth-Provider', value: 'Auth0' },
  { key: 'X-SSO', value: 'Okta-SAML' },
  { key: 'X-MFA', value: 'Duo-Security' },
  
  // Fake Payment
  { key: 'X-Payment-Gateway', value: 'Stripe-v3' },
  { key: 'X-PCI-Compliant', value: 'Level-1' },
  
  // Fake API Info
  { key: 'X-API-Version', value: 'v3.14.159' },
  { key: 'X-Rate-Limit-Provider', value: 'Kong-Gateway' },
  { key: 'X-GraphQL-Engine', value: 'Apollo-Server' },
  
  // Fake Compliance
  { key: 'X-GDPR-Compliant', value: 'true' },
  { key: 'X-SOC2-Certified', value: 'Type-II' },
  { key: 'X-ISO27001', value: 'Certified' },
  { key: 'X-HIPAA-Compliant', value: 'true' },
  
  // Fake Build Info (misleading)
  { key: 'X-Build-Hash', value: 'a3f8c2e9b1d4' },
  { key: 'X-Deploy-ID', value: 'dpl_H7kJ9mN2pQ4r' },
  { key: 'X-Environment', value: 'production-blue' },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [...securityHeaders, ...decoyHeaders],
      },
    ];
  },
  poweredByHeader: false,
};

export default nextConfig;
