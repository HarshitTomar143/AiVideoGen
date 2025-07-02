import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import Image  from 'next/image'

export default function CustomLoading({loading}:any) {
  return (
    <div>
      <AlertDialog open={loading}>
           
            <AlertDialogContent className='flex items-center flex-col'>
                <AlertDialogTitle>Generating your video... Do not refresh!</AlertDialogTitle>
                <Image src={"/progress.gif"} alt='Loading' width={100} height={100}/>
               
            </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}


