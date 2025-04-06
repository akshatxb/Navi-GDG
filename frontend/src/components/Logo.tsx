import Image from "next/image";
import { forwardRef } from "react";

export type LogoProps = {
    src: string;
}

const Logo = forwardRef<HTMLImageElement, LogoProps>(
    ({ src, ...props }, ref) => {
        return (
            <Image {...props} ref={ref} src={src} className="h-10 w-10" alt="" />
        )
    }
)

Logo.displayName = 'Logo'

export default Logo