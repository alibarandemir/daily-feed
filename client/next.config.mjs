/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  images: {
    domains: ['cdn.weatherapi.com', 'openweathermap.org','storage.evrimagaci.org','sozcu01.sozcucdn.com'], 
    remotePatterns:[{
      protocol:'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',
    },
    {protocol:'https',
      hostname: 'sozcu01.sozcucdn.com',
      pathname: '/**',}
  ]
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

