/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/classes',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
