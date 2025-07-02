import React from 'react'
import Header from '../dashboard/_components/header'
import SideNav from '../dashboard/_components/sideNav'
import SelectTopic from './_components/selectTopic'

export default function CreateNew() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <div className="md:px-20  w-320">
          <h2 className='font-bold text-4xl text-blue-950 text-center mt-5'>Create New</h2>
          <div className='mt-10 shadow-md p-10'>
              <SelectTopic/>
          </div>
        </div>
      </div>
    </div>
  )
}

 