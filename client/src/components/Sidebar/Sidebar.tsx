import React, { useEffect, useMemo, useState } from 'react'
import Footer from './Footer'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { AppstoreOutlined, InboxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MoonFilled, RocketOutlined, SunFilled } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import Sider from 'antd/es/layout/Sider'
import { changeDarkMode, setIsSideBarCollapsed } from '@/stores/Global/GlobalSlice'
import Link from 'next/link'
import { getResourcesforSideBar } from '@/stores/Global/actions'
import Image from 'next/image'
import { useRouter,usePathname } from 'next/navigation'
import '../../app/globals.css'
import { slugify } from '@/utils/slugify'
import Loading from '../Loading/Loading'
import { useMediaQuery as useMediaQueryHook } from 'react-responsive'

type MenuItem = Required<MenuProps>['items'][number];

export default function Sidebar() {
  const router= useRouter()
  const pathname=usePathname()
  const isMobile = useMediaQueryHook({ query: '(max-width: 768px)' }); // Kullanımda yeni isim
  const collapsedWidth = isMobile ? '0' : '80'; // Genişlik ayarı
  const {isSideBarCollapsed,sideBarSources} = useAppSelector((state) => state.global)
  const dispatch = useAppDispatch()
  const [openKey, setOpenKey] = useState<string[]>([]);
  const isDarkMode: boolean = useAppSelector((state) => state.global.isDarkMode)
  const toggleDarkMode = () => {
    dispatch(changeDarkMode())
  }
  

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
      collapsedWidth={collapsedWidth}
      trigger={null}
      className={`fixed bg-white h-screen flex flex-col text-main z-10`}
    >
      {/* Toggle Butonu */}
      <div className="flex items-center justify-center p-4 cursor-pointer">
        {isSideBarCollapsed ? (
          <MenuUnfoldOutlined style={{ color: '#229799', fontSize: isMobile ? '30px' : '40px' }} onClick={() => dispatch(setIsSideBarCollapsed())} />
        ) : (
          <MenuFoldOutlined style={{ color: '#1E201E', fontSize: isMobile ? '20px' : '30px' }} onClick={() => dispatch(setIsSideBarCollapsed())} />
        )}
      </div>

      {/* Sidebar Başlık */}
      {!isSideBarCollapsed && (
        <Link href={`/news`} className='flex items-center justify-center text-secondary font-extrabold text-3xl mb-4'>
          Sum<span className='text-appcolor'>Flood</span>
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
          <Link href={'/news/category/yazilim'} className='w-full text-center text-3xl py-2'>
            <span className={categoryClasname}>Yazılım</span>
          </Link>
        </div>
      )}

      {/* Menü */}
      <div className={`${isMobile&&isSideBarCollapsed?'hidden':''} flex items-center justify-center `}>
        <Menu
          mode='inline'
          items={items}
          className='text-xl'
          openKeys={openKey}
          onOpenChange={onOpenChange}

        />
      </div>

      {/* Private routes */}
      <div className={`${isMobile&&isSideBarCollapsed?'hidden':''} flex-grow w-full flex flex-col justify-start text-lg `}>
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
      {isSideBarCollapsed && !isMobile ? (
        <div className='text-center flex justify-center absolute bottom-4 h-16 w-full'>
          <Link href='/news'>
            <Image objectFit='contain' width={60} height={40} quality={100} src='/assets/images/logo.png' alt='sumflood' className='object-cover'/>
          </Link>
        </div>
      ) : (isMobile && isSideBarCollapsed ? null : <Footer />)}

      {/* Register and theme for mobile */}
      {isMobile && !isSideBarCollapsed ? (
        <>
          <button className='w-full absolute bottom-96' onClick={toggleDarkMode}>
            {isDarkMode ? (
              <SunFilled className='cursor-pointer text-yellow-400 text-3xl' />
            ) : (
              <MoonFilled className='cursor-pointer text-gray-900 text-3xl' />
            )}
          </button>
        </>
      ) : null}
    </Sider>
  );
}

