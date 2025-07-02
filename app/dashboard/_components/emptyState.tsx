import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function EmptyState() {
  return (
    <div className='p-5 py-20 gap-5 flex items-center flex-col mt-10 border-2 border-dotted'>
        <Image src={'/Daco_2442877.png'} width={400} height={80} alt='Logo Image' />
        <h2 className='text-2xl font-semibold '>You don't Have any short video created</h2>
        <Link href={"/createnew"}>
            <button className='bg-blue-950 cursor-pointer hover:bg-blue-900 text-white h-12 w-60 font-semibold rounded-xl'>Create New Short Video</button>
        </Link>
    </div>
  )
}

 
