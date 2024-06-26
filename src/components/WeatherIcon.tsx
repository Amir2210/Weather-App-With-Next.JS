import { cn } from '@/utils/cn'
import Image from 'next/image'
import React from 'react'

interface WeatherIconProps extends React.HTMLProps<HTMLDivElement> {
  iconName: string;
}

export default function WeatherIcon({ iconName, ...rest }: WeatherIconProps) {
  return (
    <div {...rest} className={cn('relative size-20')}>
      <Image width={100} height={100} alt='weather-icon' className='absolute size-full' src={`https://openweathermap.org/img/wn/${iconName}@2x.png`} />
    </div>
  );
}
