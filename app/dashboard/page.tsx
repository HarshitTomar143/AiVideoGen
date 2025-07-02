import React from 'react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
        <div className='flex justify-between '>
            <h2 className='font-bold text-2xl text-blue-950'>Dashboard</h2>
            <Link href={"/createnew"}>
                            <button className=' font-semibold bg-blue-950 text-white rounded-3xl h-11 w-30 cursor-pointer hover:bg-blue-900'>+ Create New</button>

            </Link>
        </div>
    </div>
  )
}


