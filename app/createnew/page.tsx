"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_components/header'
import SideNav from '../dashboard/_components/sideNav'
import SelectTopic from './_components/selectTopic'
import SelectStyle from './_components/selectStyle'
import SelectDuration from './_components/selectDuration'

export default function CreateNew() {

  const [formData, setFormData] = useState<Record<string, any>>({});
  const onHandleInputchange = (fieldName: string, fieldValue: any) => {
    console.log(fieldName, fieldValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <div className="md:px-20  w-320">
          <h2 className='font-bold text-4xl text-blue-950 text-center mt-5'>Create New</h2>
          <div className='mt-10 shadow-md p-10'>
              <SelectTopic onUserSelect={onHandleInputchange}/>
              <SelectStyle onUserSelect={onHandleInputchange}/>
              <SelectDuration onUserSelect={onHandleInputchange} />
              <button className='mt-10 w-full cursor-pointer bg-blue-950 text-white h-12 rounded-lg hover:scale-105 duration-200 font-semibold hover:bg-blue-900 '>Create short Video</button>
          </div>
        </div>
      </div>
    </div>
  )
}

 