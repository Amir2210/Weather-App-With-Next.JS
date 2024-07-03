import Navbar from '@/components/Navbar'
import WeatherData from '@/types/Weather';
import { timestampToDate, timestampToDay, timestampToHHMM, timestampToMMDD } from '@/utils/formatedDate';
import Container from '@/components/Container';
import { kelvinToCelsius } from '@/utils/kelvinToCelsius';
import WeatherIcon from '@/components/WeatherIcon';
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';
import WeatherDetail from '@/components/WeatherDetail';
import { metersToKilometers } from '@/utils/metersToKilometers';
import { convertWindSpeed } from '@/utils/convertWindSpeed';
import ForecastWeatherDetail from '@/components/ForecastWeatherDetail';
import { getWeatherData } from '@/services/weather.service';
import { GlobeDemo } from '@/components/Globe';



export default async function Home({ searchParams }: { searchParams: { city?: string } }) {
  const city = searchParams.city || 'tel aviv';
  const weatherData: WeatherData = await getWeatherData(city)
  const firstData = weatherData?.list[0]

  const uniqueDates = [
    ...new Set(
      weatherData?.list.map(
        (entry: { dt: number; }) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ];

  // Filtering weatherData to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return weatherData?.list.find((entry: { dt: number; }) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    })
  })


  if (!weatherData) {
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    )
  }
  return (
    <main className='flex flex-col gap-4 bg-gradient-to-r from-sky-700 to-blue-600 min-h-screen'>
      <Navbar cityName={weatherData.city.name} />
      <GlobeDemo />
      <section className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-5'>
        <section className='space-y-4'>
          <div className='flex items-center gap-2 space-y-2 text-white'>
            <div className=' hidden sm:flex gap-2 text-4xl items-end font-mono'>
              <h2>{timestampToDay(firstData?.dt)}</h2>
              <h3 className='text-lg'>({timestampToDate(Date.now())})</h3>
              <h2>{weatherData.city.name}</h2>
            </div>
            <div className='flex flex-col gap-2  sm:hidden text-4xl font-mono'>
              <div className='flex items-center gap-2'>
                <h2>{timestampToDay(firstData?.dt)}</h2>
                <h3 className='text-lg'>({timestampToDate(Date.now())})</h3>
              </div>
              <div>
                <h2 className='mb-2'>{weatherData.city.name}</h2>
              </div>
            </div>
          </div>
          <Container className='gap-10 px-6 items-center text-white' >
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
                <div key={i} className='flex flex-col justify-between gap-2 items-center text-xs font-semibold '>
                  <p>{data.dt_txt.slice(10, 16)}</p>
                  <WeatherIcon iconName={getDayOrNightIcon(data.weather[0].icon, data.dt_txt)} />
                  <p>{kelvinToCelsius(data?.main.temp ?? 0)}°</p>
                </div>
              )}
            </div>
          </Container>
        </section>
        <div className='flex gap-4'>
          <Container className='w-fit justify-center flex-col px-4 items-center text-white'>
            <p className='capitalize text-center'>{firstData?.weather[0].description}</p>
            <WeatherIcon iconName={getDayOrNightIcon(firstData?.weather[0].icon ?? '', firstData?.dt_txt ?? '')} />
          </Container>
          <Container className='bg-gradient-to-r from-yellow-200 to-yellow-300 px-6 gap-4 justify-between overflow-x-auto'>
            <WeatherDetail
              className='text-black/80'
              visibility={metersToKilometers(firstData?.visibility ?? 10000)}
              airPressure={`${firstData?.main.pressure} hPa`}
              windSpeed={`${convertWindSpeed(firstData?.wind.speed)}`}
              humidity={`${firstData?.main.humidity}%`}
              sunrise={`${timestampToHHMM(weatherData?.city.sunrise)}`}
              sunset={`${timestampToHHMM(weatherData?.city.sunset)}`}
            />
          </Container>
        </div>
        <section className='flex flex-col w-full gap-4'>
          <p className='capitalize text-4xl text-white font-mono'>forecast (7 days)</p>
          {firstDataForEachDate.map((data, index) => (
            <ForecastWeatherDetail key={index}
              description={data?.weather[0].description ?? ''}
              weatherIcon={data?.weather[0].icon ?? '01d'}
              date={timestampToMMDD(data?.dt ?? 1719738000)}
              day={timestampToDay(data?.dt ?? 1719738000)}
              feels_like={data?.main.feels_like ?? 0}
              temp={data?.main.temp ?? 0}
              temp_max={data?.main.temp_max ?? 0}
              temp_min={data?.main.temp_min ?? 0}
              airPressure={`${data?.main.pressure} hPa`}
              humidity={`${data?.main.humidity}%`}
              sunrise={`${timestampToHHMM(weatherData?.city.sunrise)}`}
              sunset={`${timestampToHHMM(weatherData?.city.sunset)}`}
              visibility={`${metersToKilometers(data?.visibility ?? 1000)}`}
              windSpeed={`${convertWindSpeed(data?.wind.speed ?? 1.64)}`}
            />
          ))}
        </section>
      </section>
      {/* <div className='block sm:hidden'>
        <GlobeDemo />
      </div> */}
    </main>
  )
}
