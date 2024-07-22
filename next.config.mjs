/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cryptoradar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
