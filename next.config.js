/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol:'https', hostname:'img.youtube.com' },
      { protocol:'https', hostname:'api.microlink.io' },
      { protocol:'https', hostname:'**.microlink.io' },
      { protocol:'https', hostname:'shot.screenshotapi.net' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://online.pubhtml5.com",
              "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://fonts.googleapis.com",
              "font-src 'self' https://api.fontshare.com https://fonts.gstatic.com",
              // ✅ Added: YouTube thumbnails + Microlink screenshots
              "img-src 'self' data: blob: https://online.pubhtml5.com https://img.youtube.com https://api.microlink.io https://*.microlink.io https://shot.screenshotapi.net",
              // ✅ Added: YouTube embeds
              "frame-src 'self' https://online.pubhtml5.com https://www.youtube.com https://www.youtube-nocookie.com",
              // ✅ Added: Gemini AI API
              "connect-src 'self' https://online.pubhtml5.com https://va.vercel-scripts.com https://generativelanguage.googleapis.com https://www.googleapis.com",
              "strict-transport-security max-age=63072000; includeSubDomains; preload",
            ].join('; ')
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
