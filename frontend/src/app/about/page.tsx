import PageLoader from "@/components/PageLoader";
import Image from "next/image";
import DownArrowIcon from '@/assets/icons/down-arrow.svg'
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function About() {
    return (
        <>
            <PageLoader />
            <NavBar variant="dark" />
            <main className="h-dvh flex flex-col justify-center items-center px-64">
                <p className="text-8xl text-center mb-8">Expanding AI Driven Agriculture Across the Globe</p>
                <div className="flex gap-3">
                    <p className="text-2xl">Scroll down</p>
                    <Image src={DownArrowIcon} alt="" />
                </div>
            </main>
            <section className="flex justify-between py-20 px-20 mb-10">
                <div className="text-lg"><p>Our Mission</p></div>
                <div className="text-3xl w-3/6">
                    <p>Our mission is to bring innovation to the heart of agriculture through AI and vision-based solutions. We strive to make farming smarter, more efficient, and more sustainable — one field, one harvest at a time.</p>
                    <p className="mt-10">We build tools that support growers with real-time insights and practical assistance, helping to manage agricultural resources with precision and care. Rooted in a passion for technology and a respect for the land, we aim to be part of a future where agriculture thrives through intelligent support and thoughtful innovation.</p>
                </div>
            </section>
            <Footer />
        </>
    )

}
