import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
      },
    images:{
        remotePatterns:[
            {
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};

export default nextConfig;
