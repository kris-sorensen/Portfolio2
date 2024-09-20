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
  webpack: (config) => {
    // Add raw-loader for GLSL files
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: "raw-loader",
      exclude: /node_modules/,
    });

    return config;
  },
};

export default nextConfig;
