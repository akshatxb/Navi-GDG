"use client";

import ReactLenis from "lenis/react"

export type ScrollProps = {
    children: React.ReactNode
}

const Scroll = ({ children }: ScrollProps) => {
    // const lenis = useLenis(({ scroll }) => {
    //     // called in every scroll
    // })

    return (
        <ReactLenis root options={{ easing: (t) => 1 - Math.pow(1 - t, 3) }}>
            {children}
        </ReactLenis>
    )
}

export default Scroll