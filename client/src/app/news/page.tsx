'use client'
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { NewsCard } from '@/components/Card/NewsCard';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import { getNews } from '@/stores/News/actions';
import { Col, Row, Skeleton } from 'antd';
import Pagination from '@/components/Pagination/Pagination';

type Props = {};

export default function NewsPage() {
  const [currentPage,setCurrentPage]= useState<number>(1)
  const dispatch = useAppDispatch();
  const { loading, news, error } = useAppSelector((state) => state.news);
  useEffect(() => {
    dispatch(getNews((currentPage-1)*9));
  }, [dispatch,currentPage]);
  const onPageChange = (page: number) => {
    setCurrentPage(page); // Sayfa değiştiğinde mevcut sayfayı ayarla
  };
    
  if (loading) {
    return <Skeleton active />;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }
  
  
   

  return (
    <>
      {/* Burada news card componentlerini render edeceksin */}
      {news.map((item) => (
      <Col style={{width:'24rem'}} xs={24} xl={8} lg={12} md={12} span={8} key={item.id}>
             <NewsCard key={item.id}
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
      />
    
      </Col>
      ))}
      
      <Col style={{display:"flex",justifyItems:"center",justifyContent:"center",marginBottom:'20px'}}   span={24}>
          <Pagination
            current={currentPage}
            pageSize={10}
            total={500} // Toplam haber sayısını dinamik olarak alın
            onChange={onPageChange}
          />
        </Col>
    
  
      
       
     
    </>
  );
}
