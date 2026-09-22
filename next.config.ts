import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The Blue J application deck was folded into the generic pitch
        // route. Kept as a redirect so links already sent out still land
        // somewhere real; the query string (magic-link token, UTM params)
        // is preserved by default, so gating and attribution survive.
        source: '/bluej-custom-pitch',
        destination: '/custom-deck',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
