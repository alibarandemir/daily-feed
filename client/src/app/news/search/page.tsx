'use client'
import { NewsCard } from '@/components/Card/NewsCard'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import { searchNews } from '@/stores/News/actions'
import { Col, Pagination, Skeleton } from 'antd'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Search({}: Props) {
    const search= useSearchParams()
    const searchQuery= search ? search.get("q"):null
    const encodedSearchQuery= encodeURI(searchQuery||"")
    const [currentPage,setCurrentPage]= useState<number>(1)
    const dispatch = useAppDispatch();
    const { loading, news, error } = useAppSelector((state) => state.news);
    
    const onPageChange = (page: number) => {
      setCurrentPage(page); // Sayfa değiştiğinde mevcut sayfayı ayarla
    };
    useEffect(()=>{
        const offset= (currentPage-1)*9
        console.log(encodedSearchQuery)
        dispatch(searchNews({query:encodedSearchQuery,offset:offset}))
    },[currentPage,dispatch,encodedSearchQuery])
      
    if (loading) {
      return <Skeleton active />;
    }
  
    if (error) {
      return <div>Hata: {error}</div>;
    }
    return (
      <>
        {/* Burada news card componentlerini render edeceksin */}
        {news.map((item,index) => (
        <Col style={{width:'24rem'}} xs={24} xl={8} lg={12} md={12} span={8}>
               <NewsCard key={item.link} 
               id={item.id}
          title={item.title}
          link={item.link}
          description={item.description}
          image={item.image}
          categoryName={item.categoryName}
          sourceName={item.sourceName}
          upvote={item.upvote}
          downvote={item.downvote}
          summary={item.summary}
          actions={item.actions}
          isHot={item.isHot}
          createdDate={item.createdDate}
          index={index}
        />
      
        </Col>
        ))}
        
        <Col style={{display:"flex",justifyItems:"center",justifyContent:"center",marginBottom:'20px'}}   span={24}>
            <Pagination
              current={currentPage}
              pageSize={10}
              total={100} // Toplam haber sayısını dinamik olarak alın
              onChange={onPageChange}
            />
          </Col>
      
    
        
         
       
      </>
    );
}