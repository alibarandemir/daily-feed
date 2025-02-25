'use client'
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type Props = {
  children: React.ReactNode;
}

export default function CreateFeedLayout({ children }: Props) {
  return (
    <>
    <ProtectedRoute>
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
    </ProtectedRoute>
   
    </>
    
  )
}