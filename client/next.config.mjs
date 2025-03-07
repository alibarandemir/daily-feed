/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  images: {
    domains: ['cdn.weatherapi.com', 'openweathermap.org','storage.evrimagaci.org','sozcu01.sozcucdn.com','www.cumhuriyet.com.tr','cdn.webrazzi.com','static.euronews.com'], 
    remotePatterns:[{
      protocol:'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',
    },
    {protocol:'https',
      hostname: 'sozcu01.sozcucdn.com',
      pathname: '/**',},
      {
        protocol:'https',
        hostname:'cumhuriyet.com.tr',
        pathname:'/**'
      },
      {protocol:'https',
        hostname:'bgcdn.gmgadmin.com',
        pathname:'/**'
      },
      {protocol:'https',
        hostname:'image.cnnturk.com',
        pathname:'/**'
      }
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

