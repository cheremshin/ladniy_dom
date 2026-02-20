import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/files/**',
            },
        ],
    },
    redirects: () => {
        return [
            {
                source: '/product',
                destination: '/',
                permanent: true,
            },
            {
                source: '/auth/:path',
                has: [
                    {
                        type: 'cookie',
                        key: 'session',
                    },
                ],
                destination: '/',
                permanent: false,
            },
            {
                source: '/account',
                missing: [
                    {
                        type: 'cookie',
                        key: 'session',
                    },
                ],
                destination: '/auth/sign-in',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
