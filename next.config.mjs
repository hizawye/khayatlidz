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
    ],
    // ... any other existing config
  },
};

export default nextConfig;
