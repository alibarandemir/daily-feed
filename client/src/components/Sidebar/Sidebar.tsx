import React, { useEffect, useMemo, useState } from 'react'
import Footer from './Footer'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { AppstoreOutlined, InboxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RocketOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import Sider from 'antd/es/layout/Sider'
import { setIsSideBarCollapsed } from '@/stores/Global/GlobalSlice'
import Link from 'next/link'
import { getResourcesforSideBar } from '@/stores/Global/actions'
import Image from 'next/image'
import { useRouter,usePathname } from 'next/navigation'
import '../../app/globals.css'
import { slugify } from '@/utils/slugify'
import Loading from '../Loading/Loading'

type MenuItem = Required<MenuProps>['items'][number];

export default function Sidebar() {
  const router= useRouter()
  const pathname=usePathname()
  const {isSideBarCollapsed,sideBarSources} = useAppSelector((state) => state.global)
  const dispatch = useAppDispatch()
  const [openKey, setOpenKey] = useState<string[]>([]);
  

  const onOpenChange = (keys: string[]) => {
    if (keys.length === 0) {
      setOpenKey([]);
    } else {
      setOpenKey([keys[keys.length - 1]]);
    }
  };
  useEffect(()=>{

    dispatch(getResourcesforSideBar())
  },[])
  const getIconColor = (menuKey: string) => {
    return openKey.includes(menuKey) ? '#229799' : '#000';
  };
  // const dynamicMenuItems: MenuItem[] = sideBarSources.map((source, index) => ({
  //   key: `source-${index}`,
  //   label: (
  //     <div>
  //       <Link href={`/news/source/${slugify(source.name)}`} className="flex items-center gap-x-2">
  //         <Image unoptimized quality={100} src={source.sourceImg} alt={source.name} width={30} height={30} style={{}}/>
  //         <span>{source.name}</span>
  //       </Link>
  //     </div>
  //   ),
  // }));
  // dynamicMenuItems.push({
  //   key: 'see-all',
  //   label: (
  //     <div className="flex items-center justify-center text-appcolor font-bold">
  //       <span>Tümünü Gör</span>
  //     </div>
  //   ),
  //   onClick: () => {
  //     setIsLoading(true)
  //     router.prefetch('/resources')
  //     router.push('/resources')
  //     setIsLoading(false)
  //   },
  // });
  // const items: MenuItem[] = [
  //   {
  //     key: 'sub1',
  //     label: <h2 style={{padding:0}} className='text-2xl  text-black'>Kaynaklar</h2>,
  //     icon: <AppstoreOutlined style={{ fontSize: '2rem', color: getIconColor('sub1'),marginLeft:'-10px' }} />,
  //     children:dynamicMenuItems
  //   }
  // ];
  //useMemo kullanarak gereksiz renderı önle
  const dynamicMenuItems = useMemo(() => {
    const items: MenuItem[] = sideBarSources.map((source, index) => ({
      key: `source-${index}`,
      label: (
        <div>
          <Link href={`/news/source/${slugify(source.name)}`} className="flex items-center gap-x-2">
            <Image unoptimized quality={100} src={source.sourceImg} alt={source.name} width={30} height={30} style={{}}/>
            <span>{source.name}</span>
          </Link>
        </div>
      ),
    }));

    items.push({
      key: 'see-all',
      label: (
        <div className="flex items-center justify-center text-appcolor font-bold">
          <span>Tümünü Gör</span>
        </div>
      ),
      onClick: () => {
        
        router.prefetch('/resources')
        router.push('/resources')
      },
    });

    return items;
  }, [sideBarSources, router]);

  const items: MenuItem[] = useMemo(() => [
    {
      key: 'sub1',
      label: <h2 style={{padding:0}} className='text-2xl  text-black'>Kaynaklar</h2>,
      icon: <AppstoreOutlined style={{ fontSize: '2rem', color: getIconColor('sub1'), marginLeft:'-10px' }} />,
      children: dynamicMenuItems
    }
  ], [dynamicMenuItems, getIconColor]);
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
        <Link href={`/news`} className='flex items-center justify-center text-secondary font-extrabold text-3xl mb-4'>
          SumFlood
        </Link>
      )}

      {/* Kategoriler */}
      {!isSideBarCollapsed && (
        <div className='flex flex-col items-center'>
          <Link href={'/news/category/gundem'} className='w-full text-center text-3xl py-2'>
            <span className={categoryClasname}>Gündem</span>
          </Link>
          <Link href={'/news/category/bilim'} className='w-full text-center text-3xl py-2'>
            <span className={categoryClasname}>Bilim</span>
          </Link>
          <Link href={'/news/category/ekonomi'} className='w-full text-center text-3xl py-2'>
            <span className={categoryClasname}>Ekonomi</span>
          </Link>
          <Link href={'/news/category/ekonomi'} className='w-full text-center text-3xl py-2'>
            <span className={categoryClasname}>Yazılım</span>
          </Link>
        </div>
      )}

      {/* Menü */}
      <div className=' flex items-center justify-center '>
        <Menu
          mode='inline'
          items={items}
          className='text-xl'
          openKeys={openKey}
          onOpenChange={onOpenChange}

        />
      </div>

      {/* Private routes */}
      <div className=' flex-grow w-full flex flex-col justify-start text-lg '>
        <div className={`hover:text-xl flex items-center ${isSideBarCollapsed? 'justify-center':''} justify-start px-4 py-2 cursor-pointer`}>
          <RocketOutlined className={`hover:text-appcolor`} style={{ fontSize: '2rem', marginRight: '8px' }} />
          <Link className={`${isSideBarCollapsed? 'hidden my-20':'block'}`} href='/news/myfeed'>
            Akışım
          </Link>
        </div>
        <div className={`hover:text-xl flex items-center  ${isSideBarCollapsed? 'justify-center':''}   px-4 py-2 cursor-pointer `}>
          <InboxOutlined className='hover:text-appcolor' style={{ fontSize: '2rem', marginRight: '8px' }} />
          <Link className={`${isSideBarCollapsed? 'hidden':'block'}`} href='/news/saved'>
            Kaydedilenler
          </Link>
        </div>
      </div>

      {/* Footer */}

        {isSideBarCollapsed ? <div className='text-center flex justify-center absolute bottom-4 h-16 w-full'><Link href='/news'><Image objectFit='contain' width={60} height={40} quality={100} src='/assets/images/logo.png' alt='sumflood'/></Link></div> : <Footer />}
    </Sider>
  );
}

