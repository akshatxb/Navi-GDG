import PageLoader from "@/components/PageLoader";
import Image from "next/image";
import DownArrowIcon from '@/assets/icons/down-arrow.svg'
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Contact() {
    return (
        <>
            <PageLoader />
            <NavBar variant="dark" />
            <main className="h-dvh flex flex-col justify-center items-center px-64">
                <p className="text-8xl text-center mb-8">Connect With Our Agricultural Experts</p>
                <div className="flex gap-3">
                    <p className="text-2xl">Scroll down</p>
                    <Image src={DownArrowIcon} alt="" />
                </div>
            </main>
            <section className="flex justify-between py-20 px-20 mb-10">
                <div className="text-lg w-1/3">
                    <p className="text-3xl mb-8">Our Office</p>
                    <div className="space-y-6">
                        <p className="text-xl">123 AgriTech Avenue<br />Farmland Valley, CA 98765<br />United States</p>
                        <p className="text-xl">hello@agritech.com</p>
                        <p className="text-xl">+1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="w-2/5">
                    <form className="space-y-8">
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-4 border-b-2 border-black focus:outline-none text-xl"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-4 border-b-2 border-black focus:outline-none text-xl"
                                required
                            />
                            <textarea
                                placeholder="Message"
                                rows={4}
                                className="w-full p-4 border-b-2 border-black focus:outline-none text-xl resize-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-black text-white px-8 py-3 text-xl hover:bg-gray-800 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}