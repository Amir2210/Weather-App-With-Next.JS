import { cn } from '@/utils/cn';
import React from 'react'
import { IoSearch } from "react-icons/io5";
type Props = {
  className?: string
  value: string,
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

export default function SearchBox(props: Props) {
  return (
    <form onSubmit={props.onSubmit} className={cn('flex relative items-center justify-center h-10', props.className)}>
      <input onChange={props.onChange} value={props.value} type="text" placeholder='Search location...' className='capitalize px-4 py-2 w-[230px] rounded-r-none rounded-l-md focus:outline-none focus:border-blue-500 h-full text-black/80 z-50' />
      <button className='px-4 py-[9px] bg-white rounded-r-md border-collapse   h-full hover:bg-gray-200 duration-150'>
        <IoSearch className='text-black/80' />
      </button>
    </form>
  )
}