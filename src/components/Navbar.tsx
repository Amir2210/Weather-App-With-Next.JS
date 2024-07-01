'use client'
import React, { useState } from 'react'
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from './SearchBox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface Navbar {
  cityName: string
}

export default function Navbar(props: Navbar) {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter();
  async function handleInputChange(value: string) {
    setCity(value)
    if (value.length >= 3) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
        const suggestions = response.data.list.map((item: any) => item.name)
        setSuggestions(suggestions)
        setError('')
        setShowSuggestions(true)
      } catch (error) {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  function handleSuggestionClick(city: string) {
    router.push(`/?city=${encodeURIComponent(city)}`)
    setShowSuggestions(false)
    setCity('')
  }

  async function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (suggestions.length === 0) {
      setError('Location not found')
    } else {
      setError('')
      setCity('')
      router.push(`/?city=${encodeURIComponent(city)}`)
      setShowSuggestions(false)
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
          const { city } = response.data
          console.log(city.name)
          router.push(`/?city=${encodeURIComponent(city.name)}`)
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
  return (
    <>
      <nav className='shadow-xl sticky top-0 left-0 z-50 bg-gradient-to-r from-sky-600 to-blue-500'>
        <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
          <div className='flex items-center justify-center gap-2'>
            <h2 className='text-white text-4xl capitalize'>weather</h2>
            <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
          </div>
          <section className='flex gap-2 items-center'>
            <MdMyLocation title='Your Current Location' onClick={handleCurrentLocation} className='text-2xl text-white/80 hover:opacity-80 cursor-pointer duration-150' />
            <MdOutlineLocationOn className='text-3xl text-white/80' />
            <p className='text-white text-sm capitalize'>{props.cityName}</p>
            <div className='relative sm:flex hidden'>
              <SearchBox className='' value={city} onChange={(e) => handleInputChange(e.target.value)} onSubmit={handleSubmitSearch} />
              <SuggestionsBox {...{ showSuggestions, suggestions, handleSuggestionClick, error }} />
            </div>
          </section>
        </div>
      </nav>
      <section className='flex max-w-7xl px-3 sm:hidden'>
        <div className='relative'>
          <SearchBox value={city} onChange={(e) => handleInputChange(e.target.value)} onSubmit={handleSubmitSearch} />
          <SuggestionsBox {...{ showSuggestions, suggestions, handleSuggestionClick, error }} />
        </div>
      </section>
    </>
  )
}

function SuggestionsBox({ showSuggestions, suggestions, handleSuggestionClick, error }
  : {
    showSuggestions: boolean,
    suggestions: string[],
    handleSuggestionClick: (item: string) => void,
    error: string
  }) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}