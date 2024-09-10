'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { GithubFilled, LinkedinFilled, MediumCircleFilled } from '@ant-design/icons';




export default function Footer() {
    const [year,setYear]= useState<number>(new Date().getFullYear())
    useEffect(()=>{
        setYear(new Date().getFullYear())
    },[])
  return (
    <div className='w-full flex items-center flex-col  text-main'>
        
        <p>{`© ${year}.Ali Baran Demir.`}</p>
        <div className='flex gap-x-3'>
            <Link className='hover:text-xl text-lg hover:text-appcolor'  href='https://github.com/alibarandemir' >
                <GithubFilled />
            </Link>
            <Link className='hover:text-xl text-lg hover:text-appcolor'  href='https://www.linkedin.com/in/ali-baran-demir-55b0181b4/'>
                <LinkedinFilled />
            </Link>
            <Link className='hover:text-xl text-lg hover:text-appcolor'  href='https://medium.com/@alibarandemir798'>
                <MediumCircleFilled />
            </Link>
        </div>



    </div>
  )
}