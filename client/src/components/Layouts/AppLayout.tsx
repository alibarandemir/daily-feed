"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useAppSelector } from "@/hooks/Redux";
import { Row, Col, Pagination, Skeleton } from "antd";

type Props = {};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );
 

  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full ${
          isSideBarCollapsed ? "ml-24" : "ml-52"
        } `}
      >
        <Navbar />
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}
