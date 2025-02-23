import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DownCircleOutlined, ExportOutlined, InboxOutlined, UpCircleOutlined } from '@ant-design/icons';
import AuthPopover from '../AuthPopover/AuthPopover';
import useAuth from '@/hooks/useAuth';

import BottomButtons from './BottomButtons';
import { api } from '@/config/axios';

import debounce from "lodash.debounce";
import { motion, AnimatePresence } from "framer-motion";
import { showToast } from '@/utils/showToast';
import { convertDateToString } from '@/utils/convertDateToString';


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
  isHot:boolean,
  createdDate:string,
  blurHash:string
};

export const NewsCard: React.FC<NewsProps> = React.memo((newsContent) => {
  const [loading,setLoading]=useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [summary,setSummary]=useState('')
  console.log(newsContent.createdDate)
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

  const getSummary = async () => {
    console.log('getSummary çalıştı')
    if (summary) {
      console.log('summary var')
      setIsModalOpen(true);
      return;
    }
  
    setLoading(true);
  
    try {
      console.log('try içinde')
      if (newsContent.summary !== '') {
        console.log('default summary')
        setSummary(newsContent.summary);
      } else {
        console.log('istek atılacak')
        const response = await api.get('/getSummary', { params: { newsId: newsContent.id } });
        console.log(response.data)
        setSummary(response.data.summary);
        showToast(`${response.data.success ? 'success' : 'error'}`, response.data.message);
      }
    } catch (e: any) {
      console.error(e.message);
    } finally {
      setLoading(false);
      setIsModalOpen(true);  // Modal'ı en son açalım ki önce veri yüklensin
    }
  };
  
  // Modal kapatıldığında özeti temizleyelim
  const closeModal = () => {
    setIsModalOpen(false);
    setSummary('');
  };
  const placeholderBlurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVRIDbXBAQEAAAABIP6PzgpVAAAAAAAAAAAAAAAAAAAAAPyfA8xAAQJZBSwAAAAASUVORK5CYII=';
  

  return (
    <div className="flex flex-col w-96 min-h-[500px] border-2 border-appcolor rounded-lg p-3 shadow-lg transition-transform transform hover:shadow-xl"
    onMouseEnter={() => setShowButton(true)}
    onMouseLeave={() => setShowButton(false)}>
       {/* Özet Yüklenirken Bulanıklaştırma */}
       {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-30 flex items-center justify-center text-lg font-bold text-gray-800 rounded-lg">
            Özet oluşturuluyor...
          </div>
        )}

         {/* Özet Butonu (Sadece Hover Edildiğinde Göster) */}
         {showButton &&  !loading && (
          <button
            className="absolute sm:hidden md:hidden -top-7 left-2 bg-appcolor hover:bg-opacity-40 text-white px-2 py-1 text-sm rounded shadow-md transition-opacity "
            onClick={getSummary}
          >
            Özetle
          </button>
        )}

        <div className='xl:hidden lg:hidden bg-appcolor absolute top-12 -right-8 rounded p-2 text-center font-bold cursor-pointer h-2/3 w-7 flex justify-center items-center'>
            <p className='[writing-mode:vertical-lr] text-lg' onClick={getSummary}>Özetle</p>
        </div>
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
          <div className='text-appcolor text-opacity-80'>{convertDateToString(newsContent.createdDate)}</div>
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
      <div className="flex-grow mb-2 mt-3 ">
        <Image
          src={newsContent.image}
          alt={newsContent.title}
          //layout="responsive"
          width={340}
          height={150}
          placeholder='blur'
          blurDataURL={placeholderBlurDataURL}
          className="rounded-lg object-cover mx-auto"
        />
      </div>

      {/* Bottom Segment */}
      <div className="flex flex-col flex-grow-0">
        <div className="text-sm text-gray-700 mb-2">{newsContent.description}</div>
        <BottomButtons upvote={newsContent.upvote} downvote={newsContent.downvote} actions={newsContent.actions} newsLink={newsContent.link} category={newsContent.categoryName} />
      </div>
      <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-semibold text-appcolor mb-2">Haber Özeti</h2>
                <p className="text-gray-700">{summary}</p>
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={closeModal}
                >
                  Kapat
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>  
    </div>
  );
},(prevProps,nextProps)=>prevProps.isHot===nextProps.isHot

);
