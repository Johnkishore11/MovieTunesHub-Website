/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    enableFeedbackButton: false, // ✔ Removes bottom-left Next.js icon
  },
  images: {
    domains: ['image.tmdb.org'], // ✔ Enables TMDB image loading
  },
};

export default nextConfig;
