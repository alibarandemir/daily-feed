/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.weatherapi.com', 'openweathermap.org',], 
    remotePatterns:[{
      protocol:'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',
    }]
  },
    redirects:
        () =>{
          return [
            // Basic redirect
            {
              source: '/',
              destination: '/news',
              permanent: true,
            },
           
          ]
        
        }
};


export default nextConfig;

