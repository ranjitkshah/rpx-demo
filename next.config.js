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
	}
})
