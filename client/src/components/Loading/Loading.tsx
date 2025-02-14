import { EyeOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

type Props = {}

export default function Loading({}: Props) {
  return (
    <>
        <div className='h-1/2 flex flex-col justify-end items-center mb-10'>
            <EyeOutlined className='text-appcolor' style={{fontSize:'32px'}}/>
            <h2 className='text-white font-extrabold text-xl'>Biraz göz dinlendirmesi</h2>
        </div>
      
      <Spin fullscreen />
    </>
  )
}