/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  allowedDevOrigins: [
    "http://172.26.16.1:3000",
    "http://localhost:3000"
  ]

}

module.exports = nextConfig