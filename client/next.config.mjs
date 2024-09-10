/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.weatherapi.com', 'openweathermap.org'], 
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

