import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import WeatherDetail, { WeatherDetailProps } from './WeatherDetail'
import { kelvinToCelsius } from '@/utils/kelvinToCelsius'

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string
  date: string
  day: string
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  description: string
}

export default function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
  const {
    weatherIcon = "02d",
    date = "22.10",
    day = "Sunday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description
  } = props
  return (
    <Container className=''>
      <section className='flex gap-4 items-center px-4'>
        <div className='flex flex-col gap-1 items-center'>
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className='text-sm'>{day}</p>
        </div>
        <div className='flex flex-col justify-between px-4 h-full'>
          <span className='text-5xl'>{kelvinToCelsius(temp ?? 0)}°</span>
          <p className='text-xs space-x-1 whitespace-nowrap'>
            <span>Feels like</span>
            <span>{kelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className='capitalize'>{description}</p>
        </div>
      </section>
      <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
        <WeatherDetail {...props} className='text-white' />
      </section>
    </Container>
  )
}