// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**", // This will match all paths on the hostname
      },
      {
        protocol: "https",
        hostname: "sleek-gerbil-160.convex.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "modest-blackbird-659.convex.cloud",
        port: "",
        pathname: "/**",
      },
    ],
    // ... any other existing config
  },
  transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
};

export default nextConfig;
