/** @type {import('next').NextConfig} */
const { i18n } = require("./i18n.config.js");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  i18n,
  trailingSlash: true,
};
// module.exports = ;
