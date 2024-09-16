'use client'
import React from 'react'
import Router from 'next/router'
import { NewsCard } from '@/components/Card/NewsCard'

type Props = {}

export default function NewsPage({}: Props) {
  return (
    <div className='mt-24'>
      {/* Burada news card componentlerini render edeceksin */}
        <NewsCard title='İlk Haber' description='' link='' source='Bundle' upvote={10} downvote={20} category='' image=''/>
    
    </div>
  )
}

