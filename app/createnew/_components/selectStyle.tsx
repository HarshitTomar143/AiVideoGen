"use client"
import React, { useState } from 'react'
import Image  from 'next/image'

export default function SelectStyle({onUserSelect}:any) {
    const styleOptions= [
        {
            name:'Realistic',
            image:'/real.jpg'
        },
         {
            name:'Cartoon',
            image:'/cartoon.jpg'
        },
         {
            name:'Comic',
            image:'/comic.jpg'
        },
         {
            name:'Water Color',
            image:'/waterColor.jpg'
        },
         {
            name:'GTA',
            image:'/gta.jpg'
        }
    ]

    const [selectedOptions, setSelecetedOptions]= useState("")
  return (
    <div className='mt-7'>
      <h1 className='font-bold text-2xl text-blue-950'>Style</h1>
      <p className='text-gray-500'>Choose the style of your video?</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
        {styleOptions.map((item,index)=>(
            <div key={item.name} className={`relative hover:scale-120 cursor-pointer transition-all rounded-2xl ${selectedOptions==item.name&&'border-4 border-blue-950'}`}>
                <Image src={item.image} alt='Image' width={100} height={100}
                className='h-48 object-cover rounded-lg w-full'
                onClick={()=> {setSelecetedOptions(item.name)
                    onUserSelect('imageStyle',item.name)
                }}
                />
                <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>{item.name}</h2>
            </div>
            
        ))}
      </div>
    </div>
  )
}

