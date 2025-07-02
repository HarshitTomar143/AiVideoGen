"use client"
import React from 'react'
import { CircleFadingArrowUpIcon, Hammer, PanelsTopLeft, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideNav() {

    const MenuOptions=[
        {
            id:1,
            name:'Dashboard',
            path:'/dashboard',
            icons: PanelsTopLeft
        },
        {
            id:2,
            name:'Create New',
            path:'/createnew',
            icons: Hammer
        },
        {
            id:3,
            name:'Upgrade',
            path:'/upgrade',
            icons: CircleFadingArrowUpIcon
        },
        {
            id:4,
            name:'Account',
            path:'/account',
            icons: UserRound
        }
    ]

    const path= usePathname();

    return (
    <div className='w-64 min-h-159 shadow-md p-5 '>
        <div>
           {MenuOptions.map((item,index)=>(
           <Link key={item.id} href={item.path}>
           <div className={`flex items-center gap-3 p-3  hover:bg-blue-950 hover:text-white cursor-pointer rounded-md ${path==item.path && 'bg-blue-950 text-white'}`}>
                 <item.icons/>
                <h2>{item.name}</h2>
           </div>
           </Link>
           ))}
        </div>
    </div>
  )
}


