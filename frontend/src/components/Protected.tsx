"use client"

import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Protected = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter()
    const [pageLoad, setPageLoad] = useState<boolean>(false);


    useEffect(() => {
        const checkAuth = async () => {
            const verifyRes = await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + 'verify', {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" }
            });
            if (verifyRes.ok) {
                setPageLoad(true)
                return
            }
            const verifyData = await verifyRes.json();
            if (verifyData?.error === 'no_token' || verifyData?.error === 'expired_token') {
                const refreshRes = await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + 'refresh', {
                    method: "POST",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" }
                });
                if (refreshRes.ok) {
                    setPageLoad(true)
                    return
                }
                await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + 'logout', {
                    method: "POST",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" }
                });
            }
            else {
                await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + 'logout', {
                    method: "POST",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" }
                });
            }
            router.push("/login");
        }
        checkAuth()
    }, [router])

    return pageLoad ? (
        children
    ) : (
        <div className="absolute top-0 left-0 z-10 bg-white h-full w-full flex justify-center items-center">
            <Loader2 className="animate-spin text-black" size={30} />
        </div>
    )
}

export default Protected
