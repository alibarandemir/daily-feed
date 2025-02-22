'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import { resetPassword } from '@/stores/Auth/actions'
import { showToast } from '@/utils/showToast'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function ResetPassword({}: Props) {
    const router=useRouter()
    const {success,message,loading,error}=useAppSelector((state)=>state.auth)
    const dispatch=useAppDispatch()
    const [newPassword,setNewPassword]=useState<string>('')
    const searchParams = useSearchParams();
    const token = searchParams.get("token"); // URL'den token'ı al
    useEffect(()=>{
        if(success){
            showToast('success',message)
            router.push('/login')
            
        }
        else{
            showToast('error',message)
        }
    },[message])

    useEffect(()=>{
        showToast('error',message)
    },[error])

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        try{
            dispatch(resetPassword({token,newPassword}))
            setNewPassword('')
        }
        catch(e){

        }
    }
  return (
    <div className='flex items-center justify-center min-h-screen '>
        <div className='bg-white rounded shadow-md p-6 w-96'>
            <h1 className='text-xl text-main font-bold mb-4'>Şifre Belirleyin</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <label htmlFor="newPassword" className='block text-sm font-medium text-gray-700'>Yeni Şifre</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className='mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm focus:border-appcolor'
                    placeholder='Yeni şifrenizi girin'
                    minLength={8}

                />
                <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>Şifreyi Sıfırla</button>
            </form>
        </div>
    </div>
  )
}