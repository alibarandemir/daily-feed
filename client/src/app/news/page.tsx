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
  const dispatch = useAppDispatch();
  const { loading, news, error } = useAppSelector((state) => state.news);
  const [currentPage,setCurrentPage]= useState<number>(1)

  useEffect(() => {
    dispatch(getNews((currentPage-1)*10));
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
      <Col xs={24} lg={8} span={8}>
        <NewsCard key={item.link} 
        title={item.title}
        link={item.link}
        description={item.description}
        image={item.image}
        categoryName={item.categoryName}
        sourceName={item.sourceName}
        upvote={item.upvote}
        downvote={item.downvote}
        summary={item.summary}
      />
      </Col>
      ))}
      <Row justify="center" style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Pagination
            current={currentPage}
            pageSize={10}
            total={100} // Toplam haber sayısını dinamik olarak alın
            onChange={onPageChange}
          />
        </Col>
      </Row>
    </>
  );
}
