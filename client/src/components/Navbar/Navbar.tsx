import React, { useCallback, useEffect, useRef } from 'react'
import { DisplayWeather } from './DisplayWeather'
import { MoonFilled, SearchOutlined, SunFilled, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import GradientButton from '../ui/GradientButton'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import { changeDarkMode } from '@/stores/Global/GlobalSlice'
import SearchInput from '../SearchInput/SearchInput'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import DropdownMenu from '../ui/Dropdown'
import { useMediaQuery } from 'react-responsive'
import ThemeSwitcher from './ThemeSwitcher'

export default function Navbar() {
  const dispatch = useAppDispatch()
  
  const router= useRouter()
  const {isAuthenticated}= useAuth()
 
  const isMobile=useMediaQuery({query:'(max-width:527px)'})
  
  console.log(isAuthenticated)
  return (
    <div className='flex items-center justify-between border-b-2 bg-gray-200 dark:bg-back border-appcolor w-full py-2 px-4 min-h-24 '>
      {/* LEFT SIDE */}
      <div className={`flex ${isMobile ? 'w-full justify-center' : 'max-w-[60%]'} items-center gap-5`}>
  <div
    className={`flex items-center text-main border-2 border-gray-500 dark:border-none bg-gray-200 rounded-lg p-2 w-full max-w-[500px] ${
      isMobile ? 'justify-center' : ''
    }`}
  >
    <SearchInput />
  </div>

  {!isMobile && <DisplayWeather />}
</div>

      {/* RIGHT SIDE */}
      <div className={`flex justify-between ${isMobile?'hidden':''} items-center gap-5`}>
        {/* Dark Mode Toggle */}
          <ThemeSwitcher/>        

        {/* Register Link */}
        <div  className='text-lg font-medium'>
          {
            isAuthenticated? <DropdownMenu text={localStorage.getItem('userName')||''}></DropdownMenu>: <GradientButton icon={<UserAddOutlined/>} text='Kayıt Ol' action={()=>{router.push('/register')}} />
          }
          
        </div>
      </div>
    </div>
  )
}
