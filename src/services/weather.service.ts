import WeatherData from '@/types/Weather'
import axios from 'axios'

export async function getWeatherData(place: string): Promise<WeatherData> {
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`)
  return data
}