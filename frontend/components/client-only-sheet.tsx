'use client';

'use client';

import React, { useState } from 'react';
import { Menu, Wallet, Settings, Tv, Home, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { WalletDropdown } from '@/components/wallet-dropdown';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Browse', href: '/browse', icon: Tv },
  { name: 'Creators', href: '/creators', icon: Users },
  { name: 'Test Contracts', href: '/test-contracts', icon: Tv },
];

export function ClientOnlySheet() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected } = useAccount();
  const pathname = usePathname();
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Menu"
        disabled
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-4 mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 py-2 transition-colors ${
                  isActive 
                    ? 'text-foreground bg-primary/10 rounded-lg px-3' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
                {item.name === 'Creators' && isConnected && (
                  <Badge variant="secondary" className="ml-auto text-xs bg-purple-500/20 text-purple-700 dark:text-purple-300">
                    Web3
                  </Badge>
                )}
              </Link>
            )
          })}

          <div className="pt-4 mt-4 border-t">
            <div className="relative">
              <WalletDropdown />
            </div>
            
            <div className="mt-4 flex flex-col gap-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard">
                  <Wallet className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                asChild
              >
                <Link href="/test-contracts">
                  <Tv className="h-4 w-4 mr-2" />
                  Test Contracts
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                asChild
              >
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}