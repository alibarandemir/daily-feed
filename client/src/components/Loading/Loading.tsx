import { EyeOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

type Props = {}

export default function Loading({}: Props) {
  return (
    <div className='flex flex-col gap-y-3'>
        <div className=' flex flex-col justify-end items-center'>
            <EyeOutlined className='text-appcolor' style={{fontSize:'32px'}}/>
            <h2 className='font-extrabold text-xl text-gray-600 dark:text-white'>Biraz göz dinlendirmesi</h2>
        </div>
      
      <Spin />
    </div>
  )
}