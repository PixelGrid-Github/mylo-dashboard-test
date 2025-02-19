/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	output: "export",
	assetPrefix: ".",
	images: {
		domains: ["img.youtube.com"],
	},
};

module.exports = nextConfig;
