import Navbar from '@/components/Navbar'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios';
import WeatherData from '@/types/Weather';




export default async function Home() {

  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=tel%20aviv&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=2`)
  const weatherData: WeatherData = data
  console.log('weatherData:', weatherData)
  // const { isPending, error, data } = useQuery<WeatherData>({
  //   queryKey: ['repoData'],
  //   queryFn: async () => {
  //     const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=tel%20aviv&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=2`)
  //     return data
  //   }
  // })
  // console.log(data)

  // if (isPending) return 'Loading...'

  // if (error) return 'An error has occurred: ' + error.message
  return (
    <main className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <Navbar />
    </main>
  )
}
