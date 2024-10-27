/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'openweathermap.org',
        },
        {
          hostname: 'coin-images.coingecko.com',
        },
        {
          hostname: 'gasprice.kapook.com',
        },
      ],
    },
  }
  
  export default nextConfig
  