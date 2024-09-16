'use client'
import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { useAppSelector } from '@/hooks/Redux';
import { Row, Col, Pagination } from 'antd';

type Props = {}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSideBarCollapsed = useAppSelector((state) => state.global.isSideBarCollapsed);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // 4 sütun ve 6 satır = 24 item
  const totalItems = React.Children.count(children); // Tüm item sayısını al

  // Sayfalama için gösterilecek item'ları belirle
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = React.Children.toArray(children).slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='w-full min-h-screen flex'>
      <Sidebar />
      <main className={`flex flex-col w-full h-full ${isSideBarCollapsed ? 'ml-24' : 'ml-52'} `}>
        <Navbar />
        
        {/* Grid Yapısı */}
        <div className='p-4'>
          <Row gutter={[16, 16]} justify="center">
            {currentItems.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                {item}
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <div className='mt-6 flex justify-center'>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={totalItems}
              onChange={handlePageChange}
              showSizeChanger={false} // Sayfa boyutunu değiştirme seçeneğini gizle
            />
          </div>
        </div>
      </main>
    </div>
  );
}
