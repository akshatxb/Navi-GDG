"use client";

import Button from "@/components/Button";
import NavMenu from "./NavMenu";
import Logo from "./Logo";
import LogoIcon from '@/assets/images/vercel.svg'
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import clsx from "clsx";

export type NavBarProps = {
    variant?: 'light' | 'dark';
}

export default function NavBar({
    variant = 'light'
}: NavBarProps) {

    gsap.registerPlugin(ScrollTrigger)

    const menuVariants = {
        light: "text-white bg-[#9e9e9e1a]",
        dark: "text-black bg-[#9e9e9e1a]"
    }

    const menuContents = ['Home', 'About', 'Contact']
    const menuLinks = ['/', '/about', '/contact']

    const pathname = usePathname();
    const renderPaths = ['/', '/about', '/contact']

    const navRef = useRef(null);
    const menuRef = useRef(null);

    const logoRef = useRef(null);
    const butRef = useRef(null);

    const navElRefs = [logoRef, butRef]

    useGSAP(() => {

        const navEls = navElRefs.map(el => el.current)

        gsap.fromTo(navRef.current, {
            y: -500,
            ease: 'expo.inOut',
            delay: 0.5,
        }, {
            y: 0,
            ease: 'expo.inOut',
            delay: 1
        })

        gsap.to(navEls, {
            y: '-300',
            ease: 'expo.inOut',
            duration: 0.4,
            scrollTrigger: {
                trigger: document.body,
                start: '5% 10%',
                end: 'bottom',
                toggleActions: 'play reverse play reverse',
            }
        })

        gsap.to(menuRef.current, {
            color: 'black',
            backgroundColor: 'rgba(221, 221, 221, 0.6)',
            ease: 'expo.inOut',
            duration: 0.1,
            scrollTrigger: {
                trigger: document.body,
                start: '5% 10%',
                end: 'bottom',
                toggleActions: 'play reverse play reverse'
            }
        })

    }, { scope: navRef })

    if (!renderPaths.includes(pathname)) {
        return null
    }

    return (
        <div ref={navRef} className="fixed z-10 flex justify-between items-center w-full px-14 py-7">
            <Logo ref={logoRef} src={LogoIcon} />
            <NavMenu ref={menuRef} links={menuLinks as [string, ...string[]]} contents={menuContents as [string, ...string[]]} classnames={clsx("ml-40", menuVariants[variant])} />
            <div ref={butRef}>
                {/* <Button content="Contact Us" link="/contact" variant={variant === 'light' ? "transparentLight" : "transparentDark"} size="md" /> */}
                <Button content="Sign In" link="/login" variant={variant === 'light' ? "light" : "dark"} size="md" />
            </div>
        </div>
    )
}