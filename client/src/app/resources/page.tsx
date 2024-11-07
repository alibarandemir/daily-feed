"use client";
import ResourceCard from "@/components/Card/ResourceCard";
import { useAppSelector } from "@/hooks/Redux";
import { getAllResources } from "@/stores/Resource/actions";
import { Button, Col, Row, Skeleton, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/Redux";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollResources from "@/components/InfiniteScrollResources/InfiniteScrollResources";
import '../globals.css'
import { AuthLayout } from "@/components/Layouts/AuthLayout";

type Props = {};
const { Content, Header } = Layout;

export default function ResourcesPage({}: Props) {
  
  const contentStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "100vh",
    flexDirection: "column",
  };

  
  
  const router = useRouter();

 
  
  return (
    <AuthLayout>

      <Content style={contentStyle}>
        <InfiniteScrollResources/>
      </Content>
    </AuthLayout>
    
  );
}
