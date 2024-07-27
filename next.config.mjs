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
      {
        protocol: "https",
        hostname: "s3.coinmarketcap.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
