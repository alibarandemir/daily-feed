import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { api } from '@/config/axios';
import { Button, Col, Row, Skeleton, Spin } from 'antd';
import { get } from 'http';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import { getUserFeed } from '@/stores/News/actions';
import { NewsCard } from '../Card/NewsCard';
import Link from 'next/link';



const InfiniteScrollForFeed = () => {
  const [page, setPage] = useState(1);
  const [news, setNews] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useAppDispatch();
  const fetchMoreData = async () => {
    try {
      const response = await api.get('/getUserFeed', { params: { page }, withCredentials: true });
      setNews([...news, ...response.data.news]);
      setHasMore(response.data.hasMore);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, [dispatch,page]);

  if (news.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center mx-auto gap-y-4 p-6 bg-gray-100 rounded-lg shadow-md'>
        <h2 className=' font-bold text-2xl text-gray-800'>Akış Oluşturmamışsınız</h2>
        <p className='text-lg text-gray-600 text-center'>
          Görünüşe göre ilgi alanlarınızı seçmemişsiniz. Hızlıca beğendiğiniz kategorileri belirleyip kendi akışını görebilirsiniz.
        </p>
        <Link href='/news/myfeed/create-feed'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'>
            Akış Oluştur
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-y-6'>
      
        <Row
          align="middle"
          justify="center"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          {news.map((item: any, index: number) => (
            <Col
              style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
              xs={24}
              sm={12}
              md={8}
              className="gutter-row"
              key={index}
            >
              <NewsCard {...item} />
            </Col>
          ))}
        </Row>
        {hasMore?<Button className='mb-4' onClick={()=>setPage((prev)=>prev+1)}>Daha fazla göster</Button>
          :<p>Daha fazla gösterilecek haber yok</p>}
          
    </div>
  );
};

export default InfiniteScrollForFeed;
