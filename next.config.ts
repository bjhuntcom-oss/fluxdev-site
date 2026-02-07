import type { NextConfig } from "next";

// Security Headers
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), usb=(), bluetooth=(), serial=(), hid=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
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

// Minimal Decoy Headers - Reduced to avoid fingerprinting
// Too many fake headers can be detected by advanced scanners
const decoyHeaders = [
  { key: 'Server', value: 'nginx/1.24.0' },
  { key: 'X-Varnish', value: '123456789' },
  { key: 'X-Cache', value: 'HIT' },
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
