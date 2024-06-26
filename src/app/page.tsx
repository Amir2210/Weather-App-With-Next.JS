import Navbar from '@/components/Navbar'
import axios from 'axios';
import WeatherData from '@/types/Weather';
import { timestampToDate, timestampToDay } from '@/utils/formatedDate';
import Container from '@/components/Container';
import { kelvinToCelsius } from '@/utils/kelvinToCelsius';





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
  const { dt: date, main } = data
  return (
    <main className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <Navbar />
      <section className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
        <section className='space-y-4'>
          <div className='flex items-center gap-2 space-y-2'>
            <h2 className='flex gap-1 text-2xl items-end'>
              <p>{timestampToDay(date)}</p>
              <p className='text-lg'>({timestampToDate(date)})</p>
            </h2>
          </div>
          <Container className='gap-10 px-6 items-center' >
            <div className='flex flex-col px-4'>
              <span className='text-5xl'>
                {kelvinToCelsius(main.temp)}°
              </span>
              <p className='text-xs space-x-1 whitespace-nowrap'>
                <span className='capitalize'>feels like</span>
                <span>{kelvinToCelsius(main.feels_like)}°</span>
              </p>
              <p className='text-xs space-x-2'>
                <span>{kelvinToCelsius(main.temp_min)}°↓</span>
                <span>{kelvinToCelsius(main.temp_max)}°↑</span>
              </p>
            </div>
          </Container>
        </section>
        <section></section>
      </section>
    </main>
  )
}
