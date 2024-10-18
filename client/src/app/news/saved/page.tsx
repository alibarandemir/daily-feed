'use client'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

type Props = {}

 function SavedPage({}: Props) {
  return (
    <ProtectedRoute>
        <div>Saved</div>
    </ProtectedRoute>
  )
}


export default SavedPage