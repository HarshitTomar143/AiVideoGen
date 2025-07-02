import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <div className='flex mt-4 pl-2 justify-between pr-4 shadow-md pb-2'>
      <Image src={'/logo.png'} width={80} height={80} alt='Logo Image' className='rounded-3xl '/>
      <h1 className='font-bold text-6xl'>Ai Short Video Generator</h1>
      <Link href={"/dashboard"}>
            <button className='p-2 bg-blue-950 rounded-xl items-center text-3xs w-30 mr-20 hover:bg-blue-900 text-white h-12 ' >Dashboard</button>
      </Link>
    </div>
  )
}

