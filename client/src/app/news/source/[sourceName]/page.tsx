'use client'
import React, { useEffect, useState } from 'react';
import Router, { useParams, useRouter } from 'next/navigation';
import { NewsCard } from '@/components/Card/NewsCard';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import { getNews, getNewsBySourceName } from '@/stores/News/actions';
import { Col, Row, Skeleton } from 'antd';
import Pagination from '@/components/Pagination/Pagination';
import { slugDict } from '@/utils/slugify';
import NoNewsFound from '@/components/NoNewsFound';

type Props = {};

export default function NewsSourcePage() {
  const dispatch = useAppDispatch();
  const { loading, news, error } = useAppSelector((state) => state.news);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const { sourceName } = useParams(); 
  const sourceNameKey = Array.isArray(sourceName) ? sourceName[0] : sourceName; // İlk elemanı al

  useEffect(() => {
    if (sourceNameKey) {
      console.log(sourceNameKey)
      const originalSourceName = slugDict[sourceNameKey];
      console.log(slugDict)
      const offset = (currentPage - 1) * 9;
      dispatch(getNewsBySourceName({ sourceName: originalSourceName, offset }));
    }
  }, [dispatch, currentPage, sourceNameKey]); 

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Skeleton active />;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  return (
    <>
      {news&&news.length>0 ?(news.map((item) => (
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
        createdDate={item.createdDate}
        
      />
    
      </Col>
      ))):<NoNewsFound/>}
      <Col style={{ display: "flex", justifyItems: "center", justifyContent: "center", marginBottom: '20px' }} span={24}>
        <Pagination
          current={currentPage}
          pageSize={10}
          total={100} 
          onChange={onPageChange}
        />
      </Col>
    </>
  );
}
