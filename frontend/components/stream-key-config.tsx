'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

export function StreamKeyConfig() {
    const { isConnected, address } = useAccount();
    const [apiKey, setApiKey] = useState('');
    const [showApiKey, setShowApiKey] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isConnected && address) {
            const storedKey = localStorage.getItem(`livepeer_key_${address}`);
            if (storedKey) setApiKey(storedKey);
        }
    }, [isConnected, address]);

    const handleSave = () => {
        if (!isConnected || !address) {
            toast.error('Please connect your wallet first');
            return;
        }

        try {
            setLoading(true);
            if (apiKey) {
                localStorage.setItem(`livepeer_key_${address}`, apiKey);
                toast.success('API Key saved successfully!');
            } else {
                localStorage.removeItem(`livepeer_key_${address}`);
                toast.info('API Key removed');
            }
        } catch (err) {
            toast.error('Failed to save API Key');
            console.error('Error saving key:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isConnected) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Livepeer Configuration</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Connect your wallet to configure streaming</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Livepeer Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="apiKey">Livepeer API Key</Label>
                    <div className="relative">
                        <Input
                            id="apiKey"
                            type={showApiKey ? "text" : "password"}
                            placeholder="Enter your Livepeer API Key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            disabled={loading}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Required for streaming. Stored locally in your browser.
                    </p>
                </div>

                <Button
                    className="w-full mt-4"
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Configuration'}
                </Button>
            </CardContent>
        </Card>
    )
}
