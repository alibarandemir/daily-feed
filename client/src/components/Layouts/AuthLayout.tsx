import React, { Component } from 'react'
import Footer from '../Footer/Footer'



export function Footer({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
 

   
    return (
      <div>
        {children}
        <Footer/>
      </div>
    )
  
}