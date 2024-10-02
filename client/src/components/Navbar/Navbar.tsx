import React, { useCallback, useEffect, useRef } from 'react'
import { DisplayWeather } from './DisplayWeather'
import { MoonFilled, SearchOutlined, SunFilled } from '@ant-design/icons'
import GradientButton from '../ui/GradientButton'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import { changeDarkMode } from '@/stores/Global/GlobalSlice'

export default function Navbar() {
  const dispatch = useAppDispatch()
  const isDarkMode: boolean = useAppSelector((state) => state.global.isDarkMode)

  const toggleDarkMode = () => {
    dispatch(changeDarkMode())
  }
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className='flex items-center justify-between border-b-2 border-appcolor w-full px-4 h-24 '>
      {/* LEFT SIDE */}
      <div className='flex justify-between items-center gap-5  max-w-[60%]'>
        {/* Search Bar */}
        <div className='flex items-center text-main bg-gray-200 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300 w-full'>
          <SearchOutlined className='text-2xl text-gray-500' />
          <input
            ref={searchInputRef}
            className='bg-transparent outline-none text-main px-2 w-full placeholder-gray-500 transition-all duration-300 focus:placeholder-gray-300 focus:ring-0'
            type='text'
            placeholder='Haber, Konu veya Kaynak Ara...'
          />
          <div className='text-sm text-main px-2'>Ctrl K</div>
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
        <div className='text-lg font-medium'>
          <GradientButton text='Kayıt Ol' />
        </div>
      </div>
    </div>
  )
}
