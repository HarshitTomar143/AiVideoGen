import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <div className='flex mt-4 pl-2 justify-between pr-4 shadow-md pb-2'>
      <Image src={'/logo.png'} width={80} height={80} alt='Logo Image' className='rounded-3xl '/>
      <h1 className='font-bold text-6xl'>Ai Short Video Generator</h1>
      <button className='pr-10 bg-white rounded-3xl items-center text-2xl font-black '>Dashboard</button>
    </div>
  )
}

