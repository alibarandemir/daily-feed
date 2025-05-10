'use client'
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { NewsCard } from '@/components/Card/NewsCard';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import { getNews } from '@/stores/News/actions';
import { Col, Row, Skeleton } from 'antd';
import Pagination from '@/components/Pagination/Pagination';
import NoNewsFound from '@/components/NoNewsFound';
import WelcomeModal from '@/components/Modal/WelcomeModal';

type Props = {};

export default function NewsPage() {
  const [currentPage,setCurrentPage]= useState<number>(1)
  const dispatch = useAppDispatch();
  const { loading, news, error } = useAppSelector((state) => state.news);
  const {isLogIn}=useAppSelector((state)=>state.auth)
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
      {news&&news.length>0 ?(news.map((item,index) => (
      <Col className='flex justify-center' style={{width:'24rem'}} xs={24} xl={8} lg={12} md={12} span={8} key={item.id}>
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
        createdDate={item.createdDate}
        index={index}
        
      />
    
      </Col>
      ))):<NoNewsFound title="" content=""/>}
      
      <Col style={{display:"flex",justifyItems:"center",justifyContent:"center",marginBottom:'20px'}}   span={24}>
          <Pagination
            current={currentPage}
            pageSize={10}
            total={500} // Toplam haber sayısını dinamik olarak alın
            onChange={onPageChange}
          />
        </Col>
    
        <WelcomeModal/>
      
       
     
    </>
  );
}
