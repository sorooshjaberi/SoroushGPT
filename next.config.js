/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  clientsClaim: true,
  reloadOnOnline: false,
  cleanupOutdatedCaches: true,
});
const nextConfig = withPWA({
  reactStrictMode: true,
});

module.exports = nextConfig;
