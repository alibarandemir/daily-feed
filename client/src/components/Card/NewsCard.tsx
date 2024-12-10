import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DownCircleOutlined, ExportOutlined, InboxOutlined, UpCircleOutlined } from '@ant-design/icons';
import AuthPopover from '../AuthPopover/AuthPopover';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import { voteNews } from '@/stores/User/actions';
import { saveNews } from '@/stores/User/actions';
import { showToast } from '@/utils/showToast';
import BottomButtons from './BottomButtons';

type NewsProps = {
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
};

export const NewsCard: React.FC<NewsProps> = React.memo((newsContent) => {
  

  return (
    <div className="flex flex-col w-96 min-h-[500px] border-2 border-appcolor rounded-lg p-3 shadow-lg transition-transform transform hover:shadow-xl">
      {/* Top Segment */}
      <div className="w-full flex-col items-center justify-between mb-2">
        <div className="flex justify-between items-center">
          <div className="text-gray-500 font-medium">{newsContent.sourceName}</div>
          <a
            target="_blank"
            href={newsContent.link}
            className="bg-main text-white text-sm flex items-center rounded px-3 py-1 cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Haberi Oku
            <ExportOutlined className="ml-1" />
          </a>
        </div>
        <h2 className="text-center font-bold text-lg mt-2">{newsContent.title}</h2>
      </div>

      {/* Image */}
      <div className="flex-grow mb-2">
        <Image
          src={newsContent.image}
          alt={newsContent.title}
          layout="responsive"
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
});
