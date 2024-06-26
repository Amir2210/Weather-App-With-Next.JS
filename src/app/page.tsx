import Navbar from '@/components/Navbar'
import axios from 'axios';
import WeatherData from '@/types/Weather';
import { timestampToDate, timestampToDay } from '@/utils/formatedDate';
import Container from '@/components/Container';
import { kelvinToCelsius } from '@/utils/kelvinToCelsius';
import WeatherIcon from '@/components/WeatherIcon';
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';





export default async function Home() {

  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=tel%20aviv&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`)
  const weatherData: WeatherData = data
  const firstData = weatherData?.list[0]
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
      <section className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
        <section className='space-y-4'>
          <div className='flex items-center gap-2 space-y-2'>
            <h2 className='flex gap-1 text-2xl items-end'>
              <p>{timestampToDay(Date.now())}</p>
              <p className='text-lg'>({timestampToDate(Date.now())})</p>
            </h2>
          </div>
          <Container className='gap-10 px-6 items-center' >
            <div className='flex flex-col px-4'>
              <span className='text-5xl'>
                {kelvinToCelsius(firstData?.main.temp)}°
              </span>
              <p className='text-xs space-x-1 whitespace-nowrap'>
                <span className='capitalize'>feels like</span>
                <span>{kelvinToCelsius(firstData?.main.feels_like)}°</span>
              </p>
              <p className='text-xs space-x-2'>
                <span>{kelvinToCelsius(firstData?.main.temp_min)}°↓</span>
                <span>{kelvinToCelsius(firstData?.main.temp_max)}°↑</span>
              </p>
            </div>
            <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
              {weatherData?.list.map((data, i) =>
                <div key={i} className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'>
                  <p>{data.dt_txt.slice(10, 16)}</p>
                  <WeatherIcon iconName={getDayOrNightIcon(data.weather[0].icon, data.dt_txt)} />
                  <p>{kelvinToCelsius(data?.main.temp ?? 0)}°</p>
                </div>
              )}
            </div>
          </Container>
        </section>
        <section></section>
      </section>
    </main>
  )
}
