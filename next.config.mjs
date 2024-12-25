/** @type {import('next').NextConfig} */
const nextConfig = {

    async redirects() {
        return [
            {
                source: '/',
                destination: '/index',
                permanent: true,
            },
        ]
    }

};

export default nextConfig;
