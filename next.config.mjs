/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bit.ly",
        // port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
