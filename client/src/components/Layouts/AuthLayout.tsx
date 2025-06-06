'use client'
import React, { Component } from 'react'
import Footer from '../Footer/Footer'
import { Button, Col, Layout, Row } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';



const { Content, Header } = Layout;
export function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
 
    const router = useRouter();
   //ant design layout tanımlanacak
    return (
    <div className='bg-gray-200 dark:bg-back'>
      <Layout  style={{ minHeight: "100vh",background:"none" }}>
      <Header
        style={{
          background:"none",
          display: "flex",
          alignItems: "end",
        }}
      >
        <Row justify="start">
          <Col
            style={{ display: "flex", justifyContent: "center" }}
            md={8}
            xs={24}
          >
            <Button
              type="link"
              icon={<LeftOutlined />}
              style={{ color: "#229799", fontSize: "18px" }}
              onClick={() => router.push('/')}
            >
              Geri
            </Button>
          </Col>
        </Row>
      </Header>
      {children}
    </Layout>
    </div>
    )
  
}