/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  reactStrictMode: true
};

const ContentSecurityPolicy = `
  default-src 'none';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.prismic.io https://prismic.io https://www.googletagmanager.com;
  prefetch-src 'self' *.vercel.app;
  connect-src 'self' boards-api.greenhouse.io *.prismic.io;
  object-src 'none';
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  media-src 'none';
  img-src 'self' *.prismic.io www.googletagmanager.com data:;
  font-src 'self' fonts.googleapis.com fonts.gstatic.com data:;
  frame-src 'self' *.prismic.io *.youtube.com *.vimeo.com *.typeform.com;
  manifest-src 'self'
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim()
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on"
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-XSS-Protection",
    value: "1; mode=block"
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY"
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Optio
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload"
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin"
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: "Permissions-Policy",
    value: "geolocation=(), interest-cohort=()"
  }
];

module.exports = {
  async headers() {
    if (!isDev) {
      return [
        {
          source: "/:path*",
          headers: securityHeaders
        }
      ];
    }
    return [];
  },
  nextConfig
};
