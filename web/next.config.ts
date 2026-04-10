import type { NextConfig } from "next";
import path from "path";

/**
 * Build Mode Configuration
 * 
 * Set BUILD_MODE environment variable to choose output:
 * - 'standalone': Dynamic server app (default)
 *   npm run build
 * 
 * - 'export': Static HTML/CSS/JS (for CDN)
 *   BUILD_MODE=export npm run build
 */
const BUILD_MODE = process.env.BUILD_MODE || 'standalone';

const nextConfig: NextConfig = {
  // Dynamic or static output based on BUILD_MODE
  ...(BUILD_MODE === 'export' ? {
    output: 'export',
    trailingSlash: true,
  } : {
    output: 'standalone',
  }),
  
  turbopack: {
    root: path.join(__dirname),
  },
  
  /**
   * Rewrites for API routes
   * Forwards /api/* requests to backend server
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
        },
      ],
    };
  },
  
  async headers() {
    // Both environment variables must be set for production
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    
    if (!backendUrl || !appUrl) {
      console.warn(
        'Warning: NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_APP_URL is not set. ' +
        'CSP headers may be incomplete.'
      );
    }
    
    // Extract origin from URL
    const getOrigin = (url: string) => {
      try {
        const u = new URL(url);
        return `${u.protocol}//${u.host}`;
      } catch {
        return url;
      }
    };
    
    const backendOrigin = getOrigin(backendUrl);
    const appOrigin = getOrigin(appUrl);
    
    // Build CSP connect-src directive
    const connectSources = [
      "'self'",
      backendOrigin,
      appOrigin,
      'https://cdn.plaid.com',
      'https://*.plaid.com',
      'https://*.coingecko.com', // CoinGecko API for crypto prices
      'https://api.coingecko.com',
      'wss://relay.walletconnect.org', // WalletConnect relay (WebSocket)
      'wss://*.walletconnect.org', // WalletConnect relay endpoints
      'https://api.web3modal.org', // Web3Modal API
    ].join(' ');
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'fullscreen=*',
          },
          // Content-Security-Policy to allow Plaid, Web3Modal, WalletConnect
          {
            key: 'Content-Security-Policy',
            value: `script-src 'self' 'unsafe-inline' https://cdn.plaid.com https://*.plaid.com https://*.web3modal.org https://api.web3modal.org; style-src 'self' 'unsafe-inline' https://cdn.plaid.com https://*.plaid.com; frame-src 'self' https://cdn.plaid.com https://*.plaid.com; connect-src ${connectSources}`,
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "http",
        hostname: "googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com", // 💡 換成 Google Favicon API 網域      
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
      },
    ],
  },
};

export default nextConfig;
