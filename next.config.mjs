/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async headers() {
		return [
			{
				source: '/api/(.*)',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET, POST, PUT, DELETE, OPTIONS',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Type, Authorization',
					},
					{
						key: 'Content-Range',
						value: 'bytes : 0-9/*',
					},
				],
			},
		];
	},
	experimental: {
		esmExternals: true,
	},
};

export default nextConfig;
