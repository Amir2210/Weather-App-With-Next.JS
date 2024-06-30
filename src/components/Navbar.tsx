import React from 'react'
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from './SearchBox';
type Props = {}

export default function Navbar({ }: Props) {
  return (
    <nav className='shadow-xl sticky top-0 left-0 z-50 bg-gradient-to-r from-sky-600 to-blue-500'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-white text-4xl capitalize'>weather</h2>
          <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
        </div>
        <section className='flex gap-2 items-center'>
          <MdMyLocation className='text-2xl text-white/80 hover:opacity-80 cursor-pointer duration-150' />
          <MdOutlineLocationOn className='text-3xl text-white/80' />
          <p className='text-white text-sm capitalize'>tel aviv</p>
          <div><SearchBox /></div>
        </section>
      </div>
    </nav>
  )
}