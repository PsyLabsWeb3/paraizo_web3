"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chrome, Wallet } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth
    console.log("Google login initiated")
  }

  const handleWalletConnect = () => {
    setIsConnectingWallet(true)
    // Placeholder for wallet connection
    setTimeout(() => {
      setIsConnectingWallet(false)
      console.log("Wallet connected")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-2xl font-bold">StreamChain</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to start streaming or watching live shows</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>Choose your preferred sign-in method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGoogleLogin} variant="outline" className="w-full h-12 text-base bg-transparent">
              <Chrome className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button onClick={handleWalletConnect} disabled={isConnectingWallet} className="w-full h-12 text-base">
              <Wallet className="mr-2 h-5 w-5" />
              {isConnectingWallet ? "Connecting..." : "Connect Wallet"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          New to StreamChain?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
