// app/buy-tokens/page.tsx
'use client';

import TokenPurchase from '@/components/token-purchase';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function BuyTokensPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Compra de Paraízo Tokens</h1>
        <p className="text-center text-gray-600 mb-8">Adquiere tokens PARAIZO para usar en la plataforma</p>
        
        <div className="flex justify-center mb-6">
          <ConnectButton />
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <TokenPurchase />
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">¿Cómo funciona?</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Conecta tu wallet a la red Base Sepolia</li>
            <li>Ingresa la cantidad de ETH que deseas gastar</li>
            <li>Confirma la transacción en tu wallet</li>
            <li>Recibe tus tokens PARAIZO en tu wallet</li>
          </ol>
        </div>
      </div>
    </div>
  );
}