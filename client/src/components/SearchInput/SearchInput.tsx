import { SearchOutlined } from '@ant-design/icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/hooks/Redux'
import { searchNews } from '@/stores/News/actions'

type Props = {}

export default function SearchInput({}: Props) {
    const [searchQuery,setSearchQuery]=useState('')
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch= useAppDispatch()
    const router= useRouter()
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
    const onSearch=(e:any)=>{
        e.preventDefault()
        const encodedSearchQuery= encodeURI(searchQuery)
        //dispatch(searchNews({q:searchQuery}))
        router.push(`/news/search?q=${encodedSearchQuery}`)
    }
  return (
    <form className='flex' onSubmit={onSearch}>
        <SearchOutlined className='text-2xl text-gray-500' />
        <input
        ref={searchInputRef}
        className='bg-transparent outline-none text-main px-2 w-full placeholder-gray-500 transition-all duration-300 focus:placeholder-gray-300 focus:ring-0'
        type='text'
        placeholder='Haber, Konu veya Kaynak Ara...'
        onChange={(e)=>setSearchQuery(e.target.value)}
    />
        <div className='text-sm text-main px-2'>Ctrl K</div>
    </form>
  )
}