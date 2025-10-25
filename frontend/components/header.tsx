'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Moon, Sun, Menu, Wallet, Users, Settings, Home, Tv } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTheme } from 'next-themes'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { ClientOnlyDropdown } from '@/components/client-only-dropdown'
import { ClientOnlySheet } from '@/components/client-only-sheet'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isConnected } = useAccount()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Browse', href: '/browse', icon: Tv },
    { name: 'Creators', href: '/creators', icon: Users },
    { name: 'Test Contracts', href: '/test-contracts', icon: Tv },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 w-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">P</span>
            </div>
            <span className="hidden sm:block">Paraizo</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1 transition-colors relative ${
                  isActive 
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
                {item.name === 'Creators' && isConnected && (
                  <Badge variant="secondary" className="ml-1 text-xs bg-purple-500/20 text-purple-700 dark:text-purple-300">
                    Web3
                  </Badge>
                )}
                {isActive && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <WalletDropdown />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 dark:hidden block" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </Button>

          <ClientOnlyDropdown />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 dark:hidden block" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </Button>

          <ClientOnlySheet />
        </div>
      </div>
    </header>
  )
}