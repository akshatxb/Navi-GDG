import clsx from "clsx";
import Link from "next/link";
import { forwardRef } from "react";


export type NavMenuProps = {
    contents: [string, ...string[]];
    links: [string, ...string[]];
    classnames?: string;
}

const NavMenu = forwardRef<HTMLDivElement, NavMenuProps>(
    ({ contents, links, classnames, ...props }, ref) => {
        return (
            <div ref={ref} className={clsx("bg-[#9e9e9e1a] h-fit px-7 py-3 rounded-lg font-medium basefont-medium backdrop-blur-sm shadow-5xl", classnames)} {...props}>
                <ul className="flex justify-center items-center gap-10">
                    {contents.map((content, index) => (
                        <li key={index} className="hover:text-[#676767] transition duration-200 hover:scale-95">
                            <Link href={links[index] || '#'}>{content}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
)

NavMenu.displayName = 'NavMenu'


export default NavMenu