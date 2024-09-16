import React, { useState } from 'react'
import Footer from './Footer'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { AppstoreOutlined, InboxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RocketOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import Sider from 'antd/es/layout/Sider'
import { setIsSideBarCollapsed } from '@/stores/Global/GlobalSlice'
import Link from 'next/link'

type MenuItem = Required<MenuProps>['items'][number];

export default function Sidebar() {
  const isSideBarCollapsed = useAppSelector((state) => state.global.isSideBarCollapsed)
  const dispatch = useAppDispatch()
  const [openKey, setOpenKey] = useState<string[]>([]);

  const onOpenChange = (keys: string[]) => {
    if (keys.length === 0) {
      setOpenKey([]);
    } else {
      setOpenKey([keys[keys.length - 1]]);
    }
  };

  const getIconColor = (menuKey: string) => {
    return openKey.includes(menuKey) ? '#229799' : '#000';
  };

  const items: MenuItem[] = [
    {
      key: 'sub1',
      label: <h2 className='text-2xl  text-black'>Kaynaklar</h2>,
      icon: <AppstoreOutlined style={{ fontSize: '2rem', color: getIconColor('sub1'),marginLeft:'-10px' }} />,
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
      onCollapse={() => dispatch(setIsSideBarCollapsed())}
      breakpoint="lg"
      collapsedWidth="80"
      trigger={null}
      className='fixed bg-white h-full flex flex-col text-main'
    >
      {/* Toggle Butonu */}
      <div className="flex items-center justify-center p-4 cursor-pointer">
        {isSideBarCollapsed ? (
          <MenuUnfoldOutlined style={{ color: '#229799', fontSize: '40px' }} onClick={() => dispatch(setIsSideBarCollapsed())} />
        ) : (
          <MenuFoldOutlined style={{ color: '#1E201E', fontSize: '30px' }} onClick={() => dispatch(setIsSideBarCollapsed())} />
        )}
      </div>

      {/* Sidebar Başlık */}
      {!isSideBarCollapsed && (
        <div className='flex items-center justify-center text-secondary font-extrabold text-3xl mb-4'>
          Daily Feed
        </div>
      )}

      {/* Kategoriler */}
      {!isSideBarCollapsed && (
        <div className='flex flex-col items-center'>
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
      )}

      {/* Menü */}
      <div className='flex-grow flex items-center justify-center'>
        <Menu
          mode='inline'
          items={items}
          className='text-xl'
          openKeys={openKey}
          onOpenChange={onOpenChange}
        />
      </div>
      
      {/* Private routes */}
      <div className='w-full flex flex-col justify-center text-lg'>
        <div className='hover:text-xl flex items-center justify-start px-4 py-2 cursor-pointer'>
          <RocketOutlined className='hover:text-appcolor' style={{ fontSize: '2rem', marginRight: '8px' }} />
          <Link className={`${isSideBarCollapsed? 'hidden my-20':'block'}`} href=''>
            Akışım
          </Link>
        </div>
        <div className='hover:text-xl flex items-center justify-start px-4 py-2 cursor-pointer '>
          <InboxOutlined className='hover:text-appcolor' style={{ fontSize: '2rem', marginRight: '8px' }} />
          <Link className={`${isSideBarCollapsed? 'hidden':'block'}`} href=''>
            Kaydedilenler
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className='absolute bottom-0 w-full'>
        {isSideBarCollapsed ? <div className='text-center'>Logo</div> : <Footer />}
      </div>
    </Sider>
  );
}
