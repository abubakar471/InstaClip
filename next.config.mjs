import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.bhlist.co.in", "images.clerk.dev", "cdn.discordapp.com", "images.unsplash.com"],
    },
};

export default withNextVideo(nextConfig);