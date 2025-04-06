import Image from "next/image";
import LoginImage from '@/assets/images/login.png'
import LoginForm from "@/components/LoginForm";
import PageLoader from "@/components/PageLoader";

export type LoginData = {
    email: string;
    password: string
}

export default async function Login() {

    return (
        <>
        <PageLoader />
            <div className="bg-secondary h-dvh w-dvw text-black relative z-0 basefont-medium flex justify-center items-center" >
                <Image src={LoginImage} alt="" priority className="p-2 rounded-3xl object-cover absolute -z-10 h-full w-full fade-mask-black" />
                <LoginForm />
            </div >
        </>
    )
}