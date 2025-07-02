"use client"
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

export default function SelectDuration({onUserSelect}:any) {

    const [selectedOption, setSelectedOptions]= useState("")

  return (
    <div className='mt-6 mb-4'>
      <h1 className='font-bold text-2xl text-blue-950'>Duration</h1>
      <p className='text-gray-500'>Select the duration of your video?</p>
      <Select onValueChange={(value)=> {
        setSelectedOptions(value)
        value!='Custom Promt'&&onUserSelect('duration',value)
        }}>
        <SelectTrigger className="w-full mt-1 p-5 text-lg font-semibold border-2">
            <SelectValue placeholder="Duration Time" />
        </SelectTrigger>
        <SelectContent>

            <SelectItem value='30 Seconds'>30 Seconds</SelectItem>
            <SelectItem value='60 Seconds'>60 Seconds</SelectItem>
           
        </SelectContent>
      </Select>

      
    </div>
  )
}

