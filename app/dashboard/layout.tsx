"use client"
import React, {useState} from 'react'
import Header from './_components/header'
import SideNav from './_components/sideNav'
import EmptyState from './_components/emptyState'

export default function layout({children}:any) {
    const [videoList, setVideoList]=useState([]);
  return (
    <div className=" flex flex-col h-screen ">
        <div>
            <Header/>
        </div>
        <div className='flex  '>
            <div className='hidden md:block  mt-2 bg-white shadow-md w-64'>
                <SideNav/>
            </div>
            <div className='p-4 w-full '>
                {children}
                 {videoList?.length==0&&<div>
            <EmptyState/>    
        </div>}
            </div>
        </div>

        {/* empty state */}
       
    </div>
  )
}

 
