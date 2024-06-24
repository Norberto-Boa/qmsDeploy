import React from 'react';
import image from '../../Assets/bg-1.webp';


export function AuthBg() {
  return (
    <div className='inset-0 w-full h-screen absolute -z-50'>
      <div className='bg-black/90 h-screen w-full absolute inset-0 -z-20' />
      <img src={"https://images.unsplash.com/photo-1550305550-ff3ab47ab63c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className='w-full h-screen top-0 left-0 absolute -z-30' alt="Background" />
    </div>
  )
}