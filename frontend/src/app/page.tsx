import Image from "next/image";
import HeroImage1 from '@/assets/images/hero.png'
import SectionImage1 from '@/assets/images/section1.png'
import SectionImage2 from '@/assets/images/section2.png'
import SectionImage3 from '@/assets/images/section3.png'
import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import NavBar from "@/components/NavBar";

export default function Home() {

  gsap.registerPlugin(useGSAP, ScrollTrigger)

  return (
    <>
      <PageLoader />
      <NavBar />
      <main className="flex relative h-[54rem]">
        <Image
          className="absolute -z-10 fade-mask object-cover"
          src={HeroImage1}
          alt=""
          priority
          fill
        />
        <div className="flex flex-col justify-end py-20 px-18">
          <div className="text-8xl basefont-bold w-4/6 mb-5 text-[#ffffff]">   
            AI driven agriculture for a sustainable tomorrow
          </div>
          <div className="flex gap-5">
            <Button content="Get Started" variant="light" link="/login" />
            <Button variant="outlineLight" content="Try Demo" link="#" />
          </div>
        </div>
      </main>
      <section className="py-20 px-20 bg-white">
        <div className="flex justify-between items-start">
          <p className="text-black text-5xl basefont-bold w-lg leading-15">Optimize Farm Management with AI</p>
          <div className="flex flex-col text-black text-xl w-xl gap-6">
            <p className="">Leverage the power of AI to track and manage your farm inventory efficiently. Our intelligent system helps you monitor stock levels, predict shortages, and streamline resource allocation for a more productive farming experience.
            </p>
            <p>Whether you run a small farm or a large agricultural operation, our AI tools adapt to your needs. Get real-time alerts on low stock, automate supply orders, and gain insights into seasonal trends—so you can focus on growing your business instead of worrying about inventory.</p>
          </div>
        </div>
        <div className="my-20 flex justify-between">
          <FeatureCard content="Manage Inventory" img={SectionImage1} />
          <FeatureCard content="Predict Resources" img={SectionImage2} />
          <FeatureCard content="Increase Profits" img={SectionImage3} />
        </div>
      </section>
      <Footer />
    </>
  )
}
