'use client'
import { AuthLayout } from '@/components/Layouts/AuthLayout'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import { forgotPassword } from '@/stores/Auth/actions';
import { showToast} from '@/utils/showToast';
import React, { useEffect, useState } from 'react'

type Props = {}

export default function ForgotPassword({}: Props) {
    const [email,setEmail]=useState<string>('')
    const dispatch=useAppDispatch();

    const {success,message}=useAppSelector((state)=>state.auth)
    const handleForgotPassword=(e:any)=>{
        e.preventDefault();
        try{
            dispatch(forgotPassword(email))
        }
        catch(e){
            showToast('error','E-posta gönderilemedi')
        }
    }
    useEffect(()=>{
        if(success){
            showToast('success',message)
        }
        else{
            showToast('error',message)
        }
    },[handleForgotPassword])
    
  return (
    <AuthLayout>
    <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white rounded shadow-md p-6 w-1/2 flex flex-col justify-center items-center'>
            <h2 className='text-main font-bold text-xl'>Şifre sıfırlama</h2>
            <form className='space-y-4 w-1/2' onSubmit={handleForgotPassword}>
                <div>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>E-posta Adresi:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} 
                        required 
                        placeholder="E-posta adresinizi girin" 
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-appcolor p-2'
                    />
                </div>
                <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>Gönder</button>
            </form>
        </div>
    </div>
    </AuthLayout>
  )
}