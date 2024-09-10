import React, { useActionState, useState } from 'react'
import { useEffect } from 'react'
import { apiRoute } from '@/config/axios'
import Image from 'next/image'

interface weatherData{
    location:string,
    temp:string,
    icon:string
    description:string
}
type Props = {}

export const DisplayWeather = (props: Props) => {
    const [location,setLocation]=useState<string>("Istanbul");
    const [weatherData,setWeatherData]= useState<weatherData|null>(null)

    const getWeather= async(lat:number=41.015137,long:number=28.979530)=>{
            const response= await apiRoute.get("/getWeather",{
                params:{lat,long}
            })
            console.log(response)
            setWeatherData(response.data)

    }
    
    useEffect(()=>{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((position)=>{
            const { latitude, longitude } = position.coords;
                getWeather(latitude,longitude)
          },(error) => {
            getWeather()
          })
        }
       
      },[])
      const weatherIconUrl=  weatherData?.icon
      ? `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`
      : '';
  return (
    <div className='relative'>
        
        {weatherData?(
            <div className='flex flex-col justify-center items-center' >
                <Image width={40} height={40} src={weatherIconUrl} alt={weatherData.description} />
                <div className='flex gap-x-1'>
                  <p>{weatherData?.location}</p>
                  <p>{weatherData?.temp}°C</p>
                </div>
                
                
            </div>):''}

        
    </div>
  )
}