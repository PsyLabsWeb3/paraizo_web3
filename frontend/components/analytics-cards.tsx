import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Coins, Users, Eye } from 'lucide-react'

export function AnalyticsCards() {
  const analytics = [
    {
      title: "Total Tips Received",
      value: "$1,242.50",
      change: "+12.5%",
      icon: Coins,
      color: "text-green-500"
    },
    {
      title: "Total Viewers",
      value: "12,420",
      change: "+8.2%",
      icon: Eye,
      color: "text-blue-500"
    },
    {
      title: "Active Subscribers",
      value: "842",
      change: "+5.3%",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Avg. View Time",
      value: "24m 32s",
      change: "+3.1%",
      icon: TrendingUp,
      color: "text-orange-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {analytics.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}