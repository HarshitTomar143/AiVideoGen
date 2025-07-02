"use client"

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Textarea } from '@/components/ui/textarea';

export default function SelectTopic({onUserSelect}:any) {
    const options= ['Custom Promt','Random Ai Story','Scary Story','Historical Facts','Bed Time Story','Motivational','Fun Facts']
    const [selectedOptions, setSelecetedOptions] = useState("");
    return (
    <div className='mt-2 mb-4'>
      <h1 className='font-bold text-2xl text-blue-950'>Content</h1>
      <p className='text-gray-500'>What is the topic of your video?</p>
      <Select onValueChange={(value)=> {
        setSelecetedOptions(value)
        value!='Custom Promt'&&onUserSelect('topic',value)
        }}>
        <SelectTrigger className="w-full mt-1 p-5 text-lg font-semibold border-2">
            <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>

            {options.map((item,index)=>(
                <SelectItem key={item} value={item}>{item}</SelectItem>
            ))}

            
            
        </SelectContent>
      </Select>

      {
        selectedOptions=="Custom Promt"&&
        <Textarea className='mt-4'
        onChange={(e)=>onUserSelect('topic',e.target.value)}
        placeholder='Enter the custom promt to generate your required video! '/>
      }
    </div>
  )
}


