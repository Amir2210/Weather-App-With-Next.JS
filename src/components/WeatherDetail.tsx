import React from 'react'
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";
import { cn } from '@/utils/cn';
export interface WeatherDetailProps {
  visibility: string
  humidity: string
  windSpeed: string
  airPressure: string
  sunrise: string
  sunset: string
}

export default function WeatherDetail(props: WeatherDetailProps & React.HTMLProps<HTMLDivElement>) {
  const {
    visibility = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48"
  } = props
  return (
    <>
      <SingleWeatherDetail {...props} icon={<LuEye />} information='Visibility' value={visibility} />
      <SingleWeatherDetail {...props} icon={<FiDroplet />} information='Humidity' value={humidity} />
      <SingleWeatherDetail {...props} icon={<MdAir />} information='Wind speed' value={windSpeed} />
      <SingleWeatherDetail {...props} icon={<ImMeter />} information='Air pressure' value={airPressure} />
      <SingleWeatherDetail {...props} icon={<LuSunrise />} information='Sun rise' value={sunrise} />
      <SingleWeatherDetail {...props} icon={<LuSunset />} information='Sun set' value={sunset} />
    </>
  )
}

export interface SingleWeatherDetailProps {
  information: string
  icon: React.ReactNode
  value: string
}

function SingleWeatherDetail(props: SingleWeatherDetailProps & React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col justify-between gap-2 items-center text-sm font-semibold', props.className)}>
      <p className='whitespace-nowrap'>{props.information}</p>
      <div className='text-3xl'>{props.icon}</div>
      <p>{props.value}</p>
    </div>
  )
}