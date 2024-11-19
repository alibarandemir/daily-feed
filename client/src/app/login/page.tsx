import React from 'react'
import '../globals.css'
import AuthForm from '@/components/AuthForm/AuthForm'
import { AuthLayout } from '@/components/Layouts/AuthLayout'

type Props = {}

export default function LoginPage({}: Props) {
  return (
    <AuthLayout>
      <AuthForm isRegister={false}/>
    </AuthLayout>
  )
}