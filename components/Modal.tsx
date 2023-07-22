"use client"

import {useState, useRef, useCallback, ReactNode} from 'react'
import { useRouter } from "next/navigation"
import Image from 'next/image'

function Modal({children}:{children:ReactNode[]}) {
    const overlay = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const router = useRouter()
    
    const onDismiss= useCallback(()=>{
        router.push("/")
    },[])
    
    const handleClick= useCallback((e:React.MouseEvent)=>{
        if((e.target === overlay.current) && onDismiss){
            onDismiss()
        } 
    },[onDismiss,overlay])

   

  return (
    <div ref={overlay} className='modal' onClick={handleClick}>
        <button type='button' className='absolute top-4 right-8' onClick={onDismiss}>
            <Image src="/close.svg" alt='close' width={17} height={17}/>
        </button>
        <div ref={wrapper} className='modal_wrapper'>{children}</div>
    </div>
  )
}

export default Modal