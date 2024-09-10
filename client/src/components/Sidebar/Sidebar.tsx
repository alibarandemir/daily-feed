'use client'

import React, { useState } from 'react'
import Footer from './Footer'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { AppstoreOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import Sider from 'antd/es/layout/Sider'
import { setIsSideBarCollapsed } from '@/stores/Global/GlobalSlice'

type MenuItem = Required<MenuProps>['items'][number];

export default function Sidebar() {
  const isSideBarCollapsed= useAppSelector((state)=>state.global.isSideBarCollapsed)
  const dispatch= useAppDispatch()
  const [openKey, setOpenKey] = useState<string[]>([]);

  // Menü açıldığında ve kapandığında openKey state'ini günceller
  const onOpenChange = (keys: string[]) => {
    if (keys.length === 0) {
      setOpenKey([]); // Menü kapandığında
    } else {
      setOpenKey([keys[keys.length - 1]]); // Sadece en son açılan menüyü tutar
    }
  };

 
  const getIconColor = (menuKey: string) => {
    console.log(openKey)
    return openKey.includes(menuKey) ? '#229799' : '#000';  // Menü açıkken mavi, kapalıyken siyah
  };

  const items: MenuItem[] = [
    {
      key: 'sub1',
      label: <h2 className='text-2xl text-black'>Kaynaklar</h2>,
      icon: <AppstoreOutlined style={{ fontSize: '2rem', color: getIconColor('sub1') }} />,  // Sadece ikon rengi ve boyutu
      children: [
        { key: '1', label: <span className="text-xl">Option 1</span> },
        { key: '2', label: <span className="text-xl">Option 2</span> },
      ],
    }
  ];

  const categoryClasname = "relative inline-block text-black before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-appcolor before:transition-all before:duration-300 hover:before:w-full cursor-pointer";

  return (
    
      <Sider
        collapsible
        collapsed={isSideBarCollapsed}
        onCollapse={(collapsed) => dispatch(setIsSideBarCollapsed())}
        breakpoint="lg" 
        collapsedWidth="80" 
        trigger={null} 
        className='fixed bg-white h-full flex flex-col justify-between '
      >
          {/* Toggle Butonu */}
          <div className="menu-trigger" style={{ padding: '16px', cursor: 'pointer' }}>
          {isSideBarCollapsed ? (
            <MenuUnfoldOutlined style={{color:'#229799',fontSize:'40px'}}  onClick={()=>dispatch(setIsSideBarCollapsed())} className="trigger-icon " />
          ) : (
            <MenuFoldOutlined style={{color:'#1E201E',fontSize:'20px'}} onClick={()=>dispatch(setIsSideBarCollapsed())} className="trigger-icon " />
          )}
        </div>
        {/* Sidebar Başlık */}
        <div className={`w-full text-secondary font-extrabold text-3xl text-center ${isSideBarCollapsed ? 'hidden': 'block'}`}>
          Daily Feed
        </div>
  
        {/* Kategoriler */}
        <div className={`flex flex-col w-full ${isSideBarCollapsed ? 'hidden': 'block'}`}>
          <div className='w-full text-center text-3xl py-3'>
            <span className={categoryClasname}>Gündem</span>
          </div>
          <div className='w-full text-center text-3xl'>
            <span className={categoryClasname}>Bilim</span>
          </div>
          <div className='w-full text-center text-3xl py-3'>
            <span className={categoryClasname}>Ekonomi</span>
          </div>
          <div className='w-full text-center text-3xl py-3'>
            <span className={categoryClasname}>Yazılım</span>
          </div>
        </div>
  
        {/* Menü */}
        <div className='w-full text-center text-3xl py-3'>
          <Menu
            mode='inline'
            items={items}
            className='text-xl'
            openKeys={openKey}
            onOpenChange={onOpenChange}
          />
        </div>
  
      
  
        {/* Footer */}
        {
          isSideBarCollapsed?<div className='bottom-0 absolute'>Logo</div>:<Footer/>
        }
        
        
      </Sider>
  );
}
