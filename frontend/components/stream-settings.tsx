'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface StreamSettings {
  wallet_address: string;
  title: string;
  description: string;
  category: string;
  tags: string;
}

export function StreamSettings() {
  const { isConnected, address } = useAccount();
  const [settings, setSettings] = useState<StreamSettings>({
    wallet_address: '',
    title: '',
    description: '',
    category: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load settings when wallet is connected
  useEffect(() => {
    if (isConnected && address) {
      loadSettings();
    }
  }, [isConnected, address]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/settings/streamer/${address}`);
      if (!response.ok) {
        console.warn('Settings API failed, using empty settings:', response.status, response.statusText);

        // Set empty settings instead of displaying error
        setSettings({
          wallet_address: address || '',
          title: '',
          description: '',
          category: '',
          tags: ''
        });
        return;
      }
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      console.error('Settings fetch error, setting empty values:', err);
      setSettings({
        wallet_address: address || '',
        title: '',
        description: '',
        category: '',
        tags: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSave = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/settings/streamer/${address}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: settings.title,
          description: settings.description,
          category: settings.category,
          tags: settings.tags
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      const savedSettings = await response.json();
      setSettings(savedSettings);
      toast.success('Stream info updated successfully!');
    } catch (err) {
      setError('Failed to save settings');
      toast.error('Failed to save settings');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stream Info</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Connect your wallet to manage stream info</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stream Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Error: {error}</p>
          <Button onClick={loadSettings} className="mt-4">Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stream Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Stream Title</Label>
          <Input
            id="title"
            placeholder="Enter stream title"
            value={settings.title}
            onChange={handleInputChange}
            disabled={loading}
            className="bg-background shadow-shadow placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter stream description"
            value={settings.description}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={settings.category} onValueChange={handleSelectChange} disabled={loading}>
            <SelectTrigger id="category" className="bg-background shadow-shadow">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            placeholder="Enter tags separated by commas"
            value={settings.tags}
            onChange={handleInputChange}
            disabled={loading}
            className="bg-background shadow-shadow placeholder:text-muted-foreground"
          />
        </div>

        <Button
          className="w-full mt-4"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Update Stream Info'}
        </Button>
      </CardContent>
    </Card>
  )
}