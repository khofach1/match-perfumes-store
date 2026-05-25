
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com", "picsum.photos"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" }
    ]
  }
};
export default nextConfig;
