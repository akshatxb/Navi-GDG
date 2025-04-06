"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import GoogleIcon from '@/assets/icons/google.svg'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2, ChevronLeft } from "lucide-react"

export type LoginData = {
  email: string
  password: string
}

const RegisterForm = () => {
  const router = useRouter()
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<LoginData>()

  const [loading, setLoading] = useState<boolean>(false)
  const [pageLoad, setPageLoad] = useState<boolean>(false)

  const onSubmit = async (data: LoginData) => {
    const credentials = { email: data.email, password: data.password }

    setLoading(true)
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + "register", {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const data = await response.json()
      if (response.ok) {
        router.push('/dashboard')
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.error("Error registering:", error)
      toast.error("Something went wrong")
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const verifyResponse = await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + "verify", {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })
        const verifyData = await verifyResponse.json()

        if (verifyResponse.ok) {
          router.push("/dashboard")
        }
        else if (verifyData?.error === 'expired_token' || verifyData?.error === 'no_token') {
          const refreshResponse = await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + "refresh", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          })
          if (refreshResponse.ok) {
            router.push("/dashboard")
          }

          await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + "logout", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          })
        }
        else {
          await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + "logout", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          })
        }
      }
      catch (error) {
        console.error(error)
        toast.error("Something went wrong")
      }
      finally {
        setPageLoad(true)
      }
    }

    checkAuth()
  }, [router])

  if (!pageLoad) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin text-primary" size={30} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen relative w-full">
      <div className="absolute top-6 left-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/')}
          className="flex items-center text-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <div className="flex justify-center items-center flex-grow w-full">
        <Card className="w-96 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {(errors.root || errors.email || errors.password) && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {errors.root && <p>{errors.root.message}</p>}
                  {errors.email && <p>{errors.email.message}</p>}
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "Email is required" })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  {...register("password", { required: "Password is Mandatory" })}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>

            <div className="relative my-4">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-muted-foreground text-sm">
                  OR
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full" type="button">
              <Image src={GoogleIcon} alt="Google" className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RegisterForm