const createNextIntlPluginImport = require('next-intl/plugin');
// Handle both CJS and ESM-interop shapes of the plugin export.
const createNextIntlPlugin =
  createNextIntlPluginImport.default ?? createNextIntlPluginImport;

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Node.js server build for Railway (nixpacks runs `next start`).
  output: 'standalone',
  reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig);
