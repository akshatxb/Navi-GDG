import Image, { StaticImageData } from "next/image";
import { forwardRef } from "react"

export type FeatureCardProps = {
    img: StaticImageData;
    content: string;
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
    ({ content, img, ...props }, ref) => {
        return (
            <div ref={ref} {...props} className="group flex-col flex justify-between px-6 py-5 relative z-0 size-[27.5rem] rounded-xl overflow-hidden shadow-2xl bg-black">
                <Image priority src={img} alt="" className="group-hover:scale-110 transition-transform duration-400 -z-10 object-cover size-[27.5rem] absolute top-0 left-0 fade-mask-black" />
                <div className="text-[1.35rem]">
                    <p>{content}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md py-3 px-4 rounded-xl text-[1.05rem]">
                    <p >Learn More</p>
                </div>
            </div>
        )
    }
)

FeatureCard.displayName = 'FeatureCard'

export default FeatureCard