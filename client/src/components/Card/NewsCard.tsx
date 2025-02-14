import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DownCircleOutlined, ExportOutlined, InboxOutlined, UpCircleOutlined } from '@ant-design/icons';
import AuthPopover from '../AuthPopover/AuthPopover';
import useAuth from '@/hooks/useAuth';

import BottomButtons from './BottomButtons';
import { api } from '@/config/axios';

import debounce from "lodash.debounce";

type NewsProps = {
  id:string;
  title: string;
  link: string;
  description: string;
  image: string;
  categoryName: string;
  sourceName: string;
  upvote: number;
  downvote: number;
  summary: string;
  actions:string[]
  isHot:boolean
};

export const NewsCard: React.FC<NewsProps> = React.memo((newsContent) => {
  

  const trackClick = debounce(async () => {
    try {
      const response = await api.post("api/track-click", {
        newsId: newsContent.id,
      });
      console.log(response.data);
    } catch (e: any) {
      console.error(e.message);
    }
  }, 500); // 📌 500ms içinde tekrar eden istekleri engeller
  

  return (
    <div className="flex flex-col w-96 min-h-[500px] border-2 border-appcolor rounded-lg p-3 shadow-lg transition-transform transform hover:shadow-xl">
      {/* Top Segment */}
      <div className="w-full flex-col items-center justify-between mb-2">
        {newsContent.isHot && (
           <div className="absolute top-2 right-2 z-10">
           <div className="relative">
             <span className="text-white text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 animate-pulse">
               HOT
             </span>
             <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur opacity-75 animate-fire"></span>
           </div>
         </div>
        )}
        <div className="absolute -top-6 right-2 z-10">
           <div className="relative">
             <span className="text-white text-xs font-bold px-2 py-1  bg-gradient-to-r from-orange-900 to-red-500 animate-pulse -z-20">
               HOT
             </span>
             <span className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-900 opacity-5 blur animate-fire"></span>
           </div>
         </div>
        
        <div className="flex justify-between items-center">
          <div className="text-gray-500 font-medium">{newsContent.sourceName}</div>
          <a
            target="_blank"
            href={newsContent.link}
            className="bg-main text-white text-sm flex items-center rounded px-3 py-1 cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={trackClick}
          >
            Haberi Oku
            <ExportOutlined className="ml-1" />
          </a>
        </div>
        <h2 className="text-center font-bold text-title text-lg mt-2">{newsContent.title}</h2>
      </div>

      {/* Image */}
      <div className="flex-grow mb-2">
        <img
          src={newsContent.image}
          alt={newsContent.title}
          //layout="responsive"
          width={300}
          height={150}
          className="rounded-lg"
        />
      </div>

      {/* Bottom Segment */}
      <div className="flex flex-col flex-grow-0">
        <div className="text-sm text-gray-700 mb-2">{newsContent.description}</div>
        <BottomButtons upvote={newsContent.upvote} downvote={newsContent.downvote} actions={newsContent.actions} newsLink={newsContent.link} category={newsContent.categoryName} />
      </div>
    </div>
  );
},(prevProps,nextProps)=>prevProps.isHot===nextProps.isHot

);
