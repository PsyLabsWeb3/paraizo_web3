"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export function WalletSettings() {
  const [walletAddress] = useState("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Connected Wallet</h3>
          </div>
          <Badge variant="secondary" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Connected
          </Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Wallet Address</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-secondary rounded text-sm font-mono">{walletAddress}</code>
            <Button variant="outline" size="icon" onClick={handleCopy}>
              {copied ? <CheckCircle2 className="h-4 w-4 text-chart-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={`https://etherscan.io/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button variant="destructive" className="w-full">
            Disconnect Wallet
          </Button>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Earnings</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-2xl font-bold">2.3 ETH</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Earned</p>
            <p className="text-2xl font-bold">15.3 ETH</p>
          </div>
        </div>

        <Button className="w-full">Withdraw Earnings</Button>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Payment Settings</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Minimum Tip Amount</p>
              <p className="text-sm text-muted-foreground">Set the minimum tip viewers can send</p>
            </div>
            <p className="font-mono">0.01 ETH</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-withdraw</p>
              <p className="text-sm text-muted-foreground">Automatically withdraw earnings weekly</p>
            </div>
            <Badge variant="secondary">Disabled</Badge>
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          Configure Payment Settings
        </Button>
      </Card>
    </div>
  )
}
