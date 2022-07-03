/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "www.gravatar.com",
      "firebasestorage.googleapis.com",
      "images.unsplash.com",
    ],
  },
  pageExtensions: ["page.tsx", "page.ts"],
  i18n: { locales: ["ja"], defaultLocale: "ja" },
};
