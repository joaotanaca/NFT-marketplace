/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["ipfs.io", "ipfs.atomichub.io"],
    },
};

module.exports = nextConfig;
