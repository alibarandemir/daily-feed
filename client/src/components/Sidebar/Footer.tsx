'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { GithubFilled, LinkedinFilled, MediumCircleFilled } from '@ant-design/icons';
import { Layout } from 'antd';
import { useMediaQuery } from 'react-responsive';

const {Footer}= Layout


export default function FooterSidebar() {
    
    const [year,setYear]= useState<number>(new Date().getFullYear())
    useEffect(()=>{
        setYear(new Date().getFullYear())
    },[])
    const isMobile=useMediaQuery({query:'(max-width:524px)'})
  return (
    <div className={`w-full absolute  ${!isMobile?'bottom-0':''} flex items-center flex-col  text-main`}>
        
        <p className='text-gray-400 dark:text-main'>{`© ${year}.Ali Baran Demir.`}</p>
        <div className='flex gap-x-3 text-gray-400 dark:text-main'>
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