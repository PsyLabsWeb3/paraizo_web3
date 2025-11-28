'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
}

export function ProfileSettings() {
  const { isConnected, address } = useAccount();
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    displayName: '',
    bio: '',
    avatarUrl: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      const storedProfile = localStorage.getItem(`user_profile_${address}`);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    }
  }, [isConnected, address]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!profile.username) {
      toast.error('Username is required');
      return;
    }

    try {
      setLoading(true);
      // Save to local storage for persistence
      localStorage.setItem(`user_profile_${address}`, JSON.stringify(profile));

      // Also map username to address for the public route to find it (mocking a DB index)
      // In a real app, this would be a backend call.
      // We'll use a simple convention: if I visit /c/username, I check if it matches the local user.
      localStorage.setItem(`username_map_${profile.username}`, address);

      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error saving profile:', err);
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Channel Profile</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Connect your wallet to manage your channel profile</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <Label className="mb-2 block">Preview</Label>
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
              <AvatarFallback className="text-2xl">{profile.displayName?.slice(0, 2).toUpperCase() || '??'}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-grow space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username (Handle)</Label>
              <div className="flex items-center">
                <span className="bg-muted px-3 py-2 rounded-l-base border-2 border-r-0 border-border text-muted-foreground text-sm">
                  paraizo.app/c/
                </span>
                <Input
                  id="username"
                  placeholder="username"
                  value={profile.username}
                  onChange={handleInputChange}
                  className="rounded-l-none bg-background shadow-shadow placeholder:text-muted-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground">This will be your public channel URL.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                placeholder="Your Channel Name"
                value={profile.displayName}
                onChange={handleInputChange}
                className="bg-background shadow-shadow placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="avatarUrl">Avatar URL</Label>
          <Input
            id="avatarUrl"
            placeholder="https://..."
            value={profile.avatarUrl}
            onChange={handleInputChange}
            className="bg-background shadow-shadow placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell your viewers about your channel..."
            value={profile.bio}
            onChange={handleInputChange}
            className="min-h-[100px]"
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </CardContent>
    </Card>
  )
}