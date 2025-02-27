"use client";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { NewsCard } from "@/components/Card/NewsCard";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { getNews } from "@/stores/News/actions";
import { Col, Row, Skeleton } from "antd";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { getUserFeed } from "@/stores/News/actions";
import InfiniteScrollForFeed from "@/components/InfiniteScroll/InfiniteScrollForFeed";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {};

const MyFeedPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { loading, news, error, hasMore } = useAppSelector(
    (state) => state.news
  );

  if (loading) {
    return <Skeleton active />;
  }

  if (error) {
    return <div>Haberler Yüklenemedi: {error}</div>;
  }

  return (
    <>
      <ProtectedRoute>
        
        <div className="flex items-center justify-center w-full gap-x-1">
          <h2 className="font-bold text-2xl">Senin Dünyan</h2>
          <span role="img" aria-label="world">
            🌍
          </span>
        </div>

        <InfiniteScrollForFeed/>
        
      </ProtectedRoute>
    </>
  );
};
export default MyFeedPage;
