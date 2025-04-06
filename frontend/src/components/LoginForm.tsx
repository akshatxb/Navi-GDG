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
import { ChevronLeft, Loader2 } from "lucide-react"

export type LoginData = {
  email: string
  password: string
}

const LoginForm = () => {
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
      const response = await fetch(process.env.NEXT_PUBLIC_AUTH_API_URL + "login", {
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
      console.error("Error logging in:", error)
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
    <div className="flex justify-center items-center min-h-screen">
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
      <Card className="w-96 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Log In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder=""
                {...register("password", { required: "Password is required" })}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
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
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm