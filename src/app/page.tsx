import Navbar from '@/components/Navbar'
import axios from 'axios';
import WeatherData from '@/types/Weather';




export default async function Home() {

  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=tel%20aviv&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=2`)
  const weatherData: WeatherData = data
  console.log('weatherData:', weatherData)

  if (!data) {
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    )
  }
  return (
    <main className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <Navbar />
    </main>
  )
}
