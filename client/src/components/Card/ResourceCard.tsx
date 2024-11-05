import { slugify } from '@/utils/slugify'
import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type ResourceProps = {
  name:string,
  sourceImg:string
}

export default function ResourceCard({name,sourceImg}: ResourceProps) {
  const [slug,setSlug]= useState<string>();

  const slugResource= slugify(name)
  useEffect(()=>{
    const slugResource=slugify(name)
    setSlug(slugResource)
  })
  return (
    
    <Card hoverable style={{width:'300px',borderRadius:'5px',boxShadow:' 10px #ffff'}} cover={ <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
    <Image alt={name} layout="fill" objectFit="cover" src={sourceImg} />
  </div>}>
    
        <Meta title={name} description={<Link href={`/news/source/${slug}`} passHref  className='text-appcolor font-bold hover:text-opacity-50'>Haberleri gör...</Link>}/>
        
    </Card>
    
  )
}