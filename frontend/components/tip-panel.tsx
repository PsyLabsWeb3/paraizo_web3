"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, Zap } from "lucide-react"
import { useState } from "react"

const quickAmounts = ["0.01", "0.05", "0.1", "0.5"]

export function TipPanel() {
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")

  const handleQuickTip = (value: string) => {
    setAmount(value)
  }

  const handleSendTip = () => {
    // In production, this would trigger a Web3 transaction
    console.log("Sending tip:", { amount, message })
    setAmount("")
    setMessage("")
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Coins className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Send a Tip</h3>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="tip-amount">Amount (ETH)</Label>
          <Input
            id="tip-amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((value) => (
            <Button key={value} variant="outline" size="sm" onClick={() => handleQuickTip(value)} className="text-xs">
              {value}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tip-message">Message (optional)</Label>
          <Input
            id="tip-message"
            placeholder="Say something nice..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={100}
          />
        </div>

        <Button className="w-full gap-2" onClick={handleSendTip} disabled={!amount || Number.parseFloat(amount) <= 0}>
          <Zap className="h-4 w-4" />
          Send Tip
        </Button>
      </div>

      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Tips are sent directly to the creator via smart contract. Transaction fees may apply.
        </p>
      </div>
    </Card>
  )
}
