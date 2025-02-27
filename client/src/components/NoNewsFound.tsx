import React from 'react'
import Image from 'next/image';

type Props = {
  title:string,
  content:string
}

export default function NoNewsFound({title,content}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center w-full">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-600">{content}</p>
        <Image src="/assets/images/logo.png" alt="No News" className="mt-6 w-1/4 max-w-md" width={200} height={200} />
    </div>
  )
}
