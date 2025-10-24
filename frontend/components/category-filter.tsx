"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Gamepad2, Music, Code, Palette, MessageSquare, Sparkles } from "lucide-react"

const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "music", label: "Music", icon: Music },
  { id: "tech", label: "Tech", icon: Code },
  { id: "art", label: "Art", icon: Palette },
  { id: "talk", label: "Talk Shows", icon: MessageSquare },
]

export function CategoryFilter() {
  const [selected, setSelected] = useState("all")

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Button
            key={category.id}
            variant={selected === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelected(category.id)}
            className="gap-2"
          >
            <Icon className="h-4 w-4" />
            {category.label}
          </Button>
        )
      })}
    </div>
  )
}
