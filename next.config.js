/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
	dest: 'public'
})

module.exports = withPWA({
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	pwa: {
		dest: 'public',
		register: true,
		// disable: process.env.NODE_ENV === 'development',
		skipWaiting: true
	},
	images: {
		// loader: 'imgix',
		// path: 'firebasestorage.googleapis.com',
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				port: ''
				//   pathname: '/account123/**',
			}
		]
	}
})
