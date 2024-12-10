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

export default function Navbar() {
  const dispatch = useAppDispatch()
  const isDarkMode: boolean = useAppSelector((state) => state.global.isDarkMode)
  const router= useRouter()
  const {isAuthenticated}= useAuth()
  const toggleDarkMode = () => {
    dispatch(changeDarkMode())
  }
  
  console.log(isAuthenticated)
  return (
    <div className='flex items-center justify-between border-b-2 border-appcolor w-full px-4 h-24 '>
      {/* LEFT SIDE */}
      <div className='flex justify-between items-center gap-5  max-w-[60%]'>
        {/* Search Bar */}
        <div className='flex items-center text-main bg-gray-200 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300 w-full'>
            <SearchInput/>
        </div>

        {/* Weather Display */}
        <DisplayWeather />
      </div>

      {/* RIGHT SIDE */}
      <div className='flex justify-between items-center gap-5'>
        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode}>
          {isDarkMode ? (
            <SunFilled className='cursor-pointer text-yellow-400 text-3xl' />
          ) : (
            <MoonFilled className='cursor-pointer text-white text-3xl' />
          )}
        </button>

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
