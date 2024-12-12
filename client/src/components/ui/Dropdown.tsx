import { SettingOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import React from 'react'
import { Button, ConfigProvider, Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux';
import { logout } from '@/stores/Auth/actions';
import { showToast } from '@/utils/showToast';
import { useRouter } from 'next/navigation';

type Props = {}


const useStyle = createStyles(({ token }) => ({
  dropdownButton: {
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(6,6,40,1) 19%, rgba(17,68,97,1) 45%, rgba(23,134,157,1) 74%, rgba(0,212,255,1) 97%)',
    color: token.colorTextLightSolid,
    border: 'none',
    fontSize: '16px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      opacity: 0.8,
      
    },
  },
  dropdownMenu: {
    
    '.ant-dropdown-menu-item': {
      color: token.colorTextLightSolid,
      fontSize: '16px',
      '&:hover': {
        opacity: 0.8,
        background: 'transparent',
      },
    },
  },
}));

export default function DropdownMenu({text}: {text: string}) {

  const { styles } = useStyle();
  const dispatch=useAppDispatch()
  const {success,message}=useAppSelector((state)=>state.auth)
  const router=useRouter()
  const handleLogout=async ()=>{
    try{
      await dispatch(logout())
      if(success) {
      showToast('success','Başarıyla Çıkış Yapıldı')
      router.push('/')
    }
  }
  catch(e){

  }
}
const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Benim Dünyam',
    disabled: true,
  
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: 'Akış Oluştur',
    onClick:()=>router.push('/myfeed/createFeed')
  },
  {
    key: '3',
    label: 'Kaydedilenler',
    onClick:()=>router.push('/')
  },
  {
    key: '4',
    label: 'Çıkış Yap',
    icon: <SettingOutlined />,
    onClick: handleLogout,
  },
];
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: 'transparent',
          },
          Dropdown: {
            controlItemBgHover: 'transparent',
          },
        },
      }}
    >
      <Dropdown 
        menu={{items}} 
        overlayClassName={styles.dropdownMenu}
      >
        <Button className={styles.dropdownButton}>
          <UserOutlined style={{ marginRight: '8px' }} />
          {text}
          <DownOutlined style={{ marginLeft: '8px' }} />
        </Button>
      </Dropdown>
    </ConfigProvider>
  )
}

