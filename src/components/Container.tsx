import { cn } from '@/utils/cn'
import React from 'react'


export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div{...props} className={cn('w-full bg-white/20 text-white  rounded-xl flex py-4 shadow-2xl', props.className)}></div>
  )
}