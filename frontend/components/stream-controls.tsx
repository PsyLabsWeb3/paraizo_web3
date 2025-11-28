'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Square, Copy, Settings } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface StreamStatus {
  isActive: boolean;
  viewers: number;
  game?: string;
  title?: string;
  uptime?: string;
}

export function StreamControls() {
  const { isConnected, address } = useAccount();
  const [streamStatus, setStreamStatus] = useState<StreamStatus | null>(null);
  const [streamKey, setStreamKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [keyLoading, setKeyLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      loadStreamData();
    }
  }, [isConnected, address]);

  const loadStreamData = async () => {
    try {
      setLoading(true);

      const apiKey = localStorage.getItem(`livepeer_key_${address}`);
      const headers: HeadersInit = apiKey ? { 'x-livepeer-api-key': apiKey } : {};

      // Get stream status
      const statusResponse = await fetch(`/api/streaming/status/${address}`, { headers });
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        setStreamStatus(statusData);
      } else {
        console.warn('Stream status API failed, setting default status:', statusResponse.status, statusResponse.statusText);
        setStreamStatus({
          isActive: false,
          viewers: 0
        });
      }

      // Get stream key
      const keyResponse = await fetch(`/api/streaming/stream-key/${address}`, { headers });
      if (keyResponse.ok) {
        const keyData = await keyResponse.json();
        setStreamKey(keyData.streamKey);
      } else {
        console.warn('Stream key API failed, setting empty key:', keyResponse.status, keyResponse.statusText);
        setStreamKey('');
      }
    } catch (error) {
      console.error('Stream data fetch error, setting default values:', error);
      setStreamStatus({
        isActive: false,
        viewers: 0
      });
      setStreamKey('');
    } finally {
      setLoading(false);
    }
  };

  const handleStartStream = async () => {
    toast.success('Stream started successfully!');
    // In a real implementation, this would call an API to start the stream
    setStreamStatus({
      ...streamStatus,
      isActive: true,
      viewers: 1
    });
  };

  const handleEndStream = async () => {
    toast.success('Stream ended successfully!');
    // In a real implementation, this would call an API to end the stream
    setStreamStatus({
      ...streamStatus,
      isActive: false,
      viewers: 0
    });
  };

  const copyStreamKey = () => {
    navigator.clipboard.writeText(streamKey);
    toast.success('Stream key copied to clipboard!');
  };

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Connect Wallet to Stream</h3>
          <p className="text-sm text-muted-foreground mb-4">Connect your wallet to start streaming and access stream controls</p>
          <Button variant="outline" disabled>
            Connect Wallet First
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Loading stream data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Current Stream</h3>
            {streamStatus?.isActive ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-500 font-medium">LIVE</span>
                <span className="text-sm text-muted-foreground ml-2">{streamStatus.viewers} viewers</span>
                {streamStatus.uptime && <span className="text-sm text-muted-foreground">• {streamStatus.uptime}</span>}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not currently streaming</p>
            )}
            {streamStatus?.title && (
              <p className="text-sm text-muted-foreground mt-1 truncate">{streamStatus.title}</p>
            )}
            {streamStatus?.game && (
              <p className="text-xs text-muted-foreground">Playing: {streamStatus.game}</p>
            )}
          </div>
          <div className="flex gap-2">
            {streamStatus?.isActive ? (
              <Button variant="neutral" onClick={handleEndStream} className="bg-red-500 hover:bg-red-600 text-white border-red-700">
                <Square className="h-4 w-4 mr-2" />
                End Stream
              </Button>
            ) : (
              <Button variant="outline" onClick={handleStartStream}>
                <Play className="h-4 w-4 mr-2" />
                Start Stream
              </Button>
            )}
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Stream Key</h3>
          <div className="flex">
            <input
              type="text"
              value={keyLoading ? 'Loading...' : streamKey || 'Connect to generate key'}
              readOnly
              className="flex-1 bg-muted rounded-l px-3 py-2 text-sm truncate"
            />
            <Button
              variant="outline"
              className="rounded-l-none rounded-r"
              onClick={copyStreamKey}
              disabled={!streamKey}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Use this stream key in your broadcasting software (OBS, Streamlabs, etc.)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}