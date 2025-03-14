import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import { changeDarkMode } from '@/stores/Global/GlobalSlice'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import { useTheme } from 'next-themes'
import React from 'react'

type Props = {}

export default function ThemeSwitcher({}: Props) {
    const isDarkMode: boolean = useAppSelector((state) => state.global.isDarkMode)
    const dispatch=useAppDispatch()
    const {theme,setTheme}=useTheme()
    
    const toggleDarkMode = () => {
        //dispatch(changeDarkMode())
        theme == "dark"? setTheme('light'): setTheme("dark")
       
      }
  return (
    <button onClick={toggleDarkMode}>
          {theme==='dark' ? (
            <SunFilled className='cursor-pointer text-yellow-400 text-3xl' />
          ) : (
            <MoonFilled className='cursor-pointer text-gray-700 dark:text-white text-3xl' />
          )}
        </button>
  )
}