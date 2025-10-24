"use client"

import { Card } from "@/components/ui/card"
import { Eye, Users, Coins, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Current Viewers",
    value: "1,234",
    change: "+12%",
    icon: Eye,
    color: "text-primary",
  },
  {
    label: "Total Followers",
    value: "12.5K",
    change: "+8%",
    icon: Users,
    color: "text-accent",
  },
  {
    label: "Tips Today",
    value: "0.85 ETH",
    change: "+24%",
    icon: Coins,
    color: "text-chart-4",
  },
  {
    label: "Total Earnings",
    value: "15.3 ETH",
    change: "+18%",
    icon: TrendingUp,
    color: "text-chart-2",
  },
]

export function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-chart-4 font-medium">{stat.change} from last week</p>
              </div>
              <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
