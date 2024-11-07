import React from 'react'
import '../globals.css'
import AuthForm from '@/components/AuthForm/AuthForm'
import { AuthLayout } from '@/components/Layouts/AuthLayout'

type Props = {}

function RegisterPage({}: Props) {
  return (
    <AuthLayout>
      <AuthForm isRegister={true}/>
    </AuthLayout>
  )
}

export default RegisterPage