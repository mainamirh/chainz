import type { NextConfig } from "next";

const imageHostnames = [
  "s3.coinmarketcap.com",
  "s2.coinmarketcap.com",
  "static.coinpaprika.com",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "/**",
    })),
  },
};

export default nextConfig;
