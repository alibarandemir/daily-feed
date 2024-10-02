import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// API GET Endpoint
export async function GET(request: NextRequest) {
  // URL'den lat ve long parametrelerini alıyoruz
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
 
  try {
    if (lat && long) {
      // Hava durumu verilerini çekiyoruz
      const weatherData = await fetchWeatherData(lat, long);
      return NextResponse.json(weatherData);
    } else {
      return NextResponse.json({ error: "Lat ve Long değerleri eksik." }, { status: 400 });
    }
  } catch (error) {
    
    return NextResponse.json(
      { error: "Hava durumu verisi alınırken bir hata oluştu." },
      { status: 500 }
    );
  }
}

// Hava durumu verilerini çekmek için fonksiyon
async function fetchWeatherData(lat: string, long: string) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=d780740bfe56e5c7cd466bf586696193`
  );
  
  const temp=Math.floor(response.data.main.temp)
  const icon=response.data.weather[0].icon
  const location= response.data.name
  const description=response.data.weather[0].description
  return {
    temp: temp,
    icon: icon,
    location:location,
    description:description
  };
}
