/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // 🚫 desactiva revisión ESLint en builds
  },
};

export default nextConfig;
