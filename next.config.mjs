/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ hostname: "cdn.waifu.im" }],
  },
};

export default nextConfig;
