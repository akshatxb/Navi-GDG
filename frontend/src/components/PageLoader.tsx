"use client"

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap'
import { useRef } from 'react'

const PageLoader = () => {

    const pageRef = useRef(null);

    useGSAP(() => {
        gsap.to(pageRef.current, 1, { opacity: 0, display: 'none', ease: 'expo.inOut' })
    }, { scope: pageRef })

    return (
        <div ref={pageRef} className="bg-white h-full w-full absolute top-0 left-0 z-50">

        </div>
    )
}

export default PageLoader
