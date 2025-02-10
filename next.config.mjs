/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ hostname: "s3.nyeki.dev" }],
  },
};

export default nextConfig;
