import { DownCircleOutlined, ExportOutlined, InboxOutlined, UpCircleOutlined } from '@ant-design/icons'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type NewsProps = {
  title: string,
  link: string,
  description: string,
  image: string,
  category: string,
  source: string,
  upvote: number,
  downvote: number
}

export const NewsCard: React.FC<NewsProps> = ({ title, link, description, image, category, source, upvote, downvote }) => {
  return (
    <div className='flex flex-col w-80 h-96 border-2 border-appcolor rounded-lg p-3 shadow-lg transition-transform transform hover:shadow-xl '>
      {/* Top segment */}
      <div className='w-full flex-col items-center justify-between mb-2'>
        <div className='flex justify-between items-center'>
          <div className='text-gray-500 font-medium'>{source}</div>

          <Link href={link} className='bg-main text-white text-sm flex items-center rounded px-3 py-1 cursor-pointer hover:bg-blue-600 transition-colors'>
            Haberi Oku
            <ExportOutlined className='ml-1' />
          </Link>
        </div>
        
        <h2 className='text-center font-bold text-lg mt-2'>{title}</h2>
      </div>

      {/* Image */}
      <div className='flex-grow mb-2'>
        <Image src={image} alt={title} layout="responsive" width={300} height={150} className='rounded-lg' />
      </div>

      {/* Bottom segment */}
      <div className='flex flex-col flex-grow-0'>
        <div className='text-sm text-gray-700 mb-2'>{description}</div>

        <div className='flex items-center justify-between'>
          {/* Upvote/Downvote */}
          <div className='flex items-center gap-2'>
            <div className='flex items-center p-2 rounded text-green-500 hover:bg-green-700 transition-colors cursor-pointer'>
              <UpCircleOutlined />
              <span className='ml-1'>{upvote}</span>
            </div>
            <div className='flex items-center p-2 rounded text-red-500 hover:bg-red-700 transition-colors cursor-pointer'>
              <DownCircleOutlined />
              <span className='ml-1'>{downvote}</span>
            </div>
          </div>

          {/* Save/Category */}
          <div className='flex items-center justify-center bg-gray-900 p-3 rounded gap-3'>
            <InboxOutlined className='text-white text-lg hover:text-gray-700 transition-colors cursor-pointer' />
            
          </div>
        </div>
      </div>
    </div>
  )
}
