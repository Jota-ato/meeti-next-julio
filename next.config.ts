import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    typedRoutes: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
            },
            {
                protocol: "https",
                hostname: "d8o50c5ogi.ufs.sh"
            }
        ],
    },
};

export default nextConfig;
