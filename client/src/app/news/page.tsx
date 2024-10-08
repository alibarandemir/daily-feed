'use client'
import React, { useEffect } from 'react'
import Router from 'next/router'
import { NewsCard } from '@/components/Card/NewsCard'

import { useAppDispatch, useAppSelector } from '@/hooks/Redux'

type Props = {}

export default function NewsPage() {
  const dispatch= useAppDispatch()
  useEffect(()=>{
    //burada haberleri çekeceksin
  },[])
  return (
    <div className='mt-24'>
      {/* Burada news card componentlerini render edeceksin */}
        <NewsCard title='İlk Haber' description='' link='' source='Bundle' upvote={10} downvote={20} category='' image=''/>
    
    </div>
  )

}
//app routerda ssr kullanılmaz



