"use client"
import React, { useState } from 'react'
import Header from '../dashboard/_components/header'
import SideNav from '../dashboard/_components/sideNav'
import SelectTopic from './_components/selectTopic'
import SelectStyle from './_components/selectStyle'
import SelectDuration from './_components/selectDuration'
import axios from 'axios'
import CustomLoading from './_components/customLoading'

export default function CreateNew() {

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errorMsg, setErrorMsg] = useState<string>("");
  const onHandleInputchange = (fieldName: string, fieldValue: any) => {
    console.log(fieldName, fieldValue);
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
    if (fieldName && fieldValue) {
      setErrorMsg("");
    }
  }

  const onClickVideoHandler= ()=>{
    const missingFields = [];
    if (!formData.topic || formData.topic.trim() === "") missingFields.push("topic");
    if (!formData.duration || formData.duration.trim() === "") missingFields.push("duration");
    if (!formData.imageStyle || formData.imageStyle.trim() === "") missingFields.push("style");
    if (missingFields.length > 0) {
      setErrorMsg(`Please select or enter: ${missingFields.join(", ")}`);
      return;
    }
    getVideoScript();
  }

  const[videoScript, setVideoScript]= useState()

  const prompt = `write a script to generate a ${formData.duration || '30 seconds'} video on topic: ${formData.topic} along with Ai image prompt in ${formData.imageStyle || 'realistic'} format in each scene and give result in json format with imageprompt and contenttext as field`;
  
  const getVideoScript= async()=>{
    setLoading(true)
    const result = await axios.post('/api/getVideoScript',{
      topic: formData.topic,
      duration: formData.duration,
      imageStyle: formData.imageStyle
    } ).then(res=>{
      console.log(res.data.result)
      setVideoScript(res.data.result);
      
    });
    setLoading(false)
    
  }

  const [loading,setLoading]= useState(false)

  

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
              {errorMsg && (
                <div className="text-red-600 font-semibold mt-2 mb-2 text-center">{errorMsg}</div>
              )}
              <button onClick={onClickVideoHandler} className='mt-10 w-full cursor-pointer bg-blue-950 text-white h-12 rounded-lg hover:scale-105 duration-200 font-semibold hover:bg-blue-900 '>Create short Video</button>
          </div>
        </div>
      </div>

      <CustomLoading loading={loading}/>
    </div>
  )
}

 