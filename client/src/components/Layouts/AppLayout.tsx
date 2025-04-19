"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useAppSelector } from "@/hooks/Redux";
import { Row, Col, Pagination, Skeleton } from "antd";
import { useMediaQuery } from "react-responsive";

type Props = {};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );

  const isMobile=useMediaQuery({query:'(max-width:527px)'})
 

  return (
    <div className="w-full h-full bg-gray-200 dark:bg-back  flex">
      <Sidebar />
      <main
        className={`flex flex-col items-center w-full ${
          isSideBarCollapsed && !isMobile ? "ml-24" : isMobile ? "ml-0" : "ml-52"
        } ${isMobile ? 'mt-16' : ''}  bg-gray-200 dark:bg-back`}
      >
        <Navbar />
        <div className="h-screen ">
          {children}
        </div>
      </main>
    </div>
  );
}
