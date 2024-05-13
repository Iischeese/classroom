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
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'omlicebivegdzmftibvx.supabase.co',
            port: '',
            pathname: '/storage/**',
          },
        ],
      },
      experimental: {
        serverActions: {
          allowedOrigins: ["github.dev", "localhost:3000"]
        }
      }
};

export default nextConfig;
