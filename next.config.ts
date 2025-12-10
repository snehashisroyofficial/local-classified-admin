// next.config.mjs
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  disable: false,
  register: true,
  cacheOnFrontEndNav: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: "https",  <-- REMOVE THIS LINE
        hostname: "**",
        // pathname is optional, you can keep it or remove it depending on needs
      },
    ],
  },
};

export default withPWA(nextConfig);
