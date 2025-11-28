'use client'

import { Header } from '@/components/header'
import { StreamPlayer } from '@/components/stream-player'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { Heart, Share2, Users } from 'lucide-react'

interface ChannelPageProps {
    params: {
        username: string;
    }
}

interface ChannelData {
    address: string;
    username: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
    playbackId?: string;
    isLive: boolean;
    title?: string;
    category?: string;
    tags?: string;
}

export default function ChannelPage({ params }: ChannelPageProps) {
    const { username } = params;
    const [channel, setChannel] = useState<ChannelData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching channel data
        // In a real app, this would fetch from an API /api/channels/[username]
        // Here we try to find it in local storage or mock it

        const loadChannel = async () => {
            try {
                // 1. Try to find address from username map
                const address = localStorage.getItem(`username_map_${username}`);

                if (address) {
                    // 2. Get profile data
                    const profileStr = localStorage.getItem(`user_profile_${address}`);
                    const profile = profileStr ? JSON.parse(profileStr) : {};

                    // 3. Get stream key/playbackId (simulated fetch)
                    // We need the playbackId to show the stream. 
                    // Since we don't store playbackId in public profile yet, we'll try to fetch it or mock it.
                    // For the demo, we'll try to fetch the stream key if we have the API key in local storage (unlikely for a visitor)
                    // So we will use a placeholder or try to fetch public status if possible.

                    // Let's try to fetch status from our API
                    const statusRes = await fetch(`/api/streaming/status/${address}`);
                    const statusData = await statusRes.json();

                    // We need a playbackId. In a real app, this is public data associated with the user.
                    // For this demo, we'll construct a mock one or use a real one if available in status (it's not currently).
                    // Let's assume for the demo the user is viewing their own page or we use a demo ID.
                    // If we don't have a real playbackId, the player will show offline/loading.

                    // Mock playback ID for demo purposes if not found
                    const playbackId = `playback-${address.substring(0, 6)}`;

                    setChannel({
                        address,
                        username,
                        displayName: profile.displayName || username,
                        bio: profile.bio || 'Welcome to my channel!',
                        avatarUrl: profile.avatarUrl || '',
                        playbackId: playbackId, // In real app, fetch this from backend
                        isLive: statusData.isActive || false,
                        title: statusData.title || 'Live Stream',
                        category: statusData.game || 'Just Chatting',
                        tags: 'web3,gaming'
                    });
                } else {
                    // Mock data if user not found (for demo URL /c/demo)
                    if (username === 'demo') {
                        setChannel({
                            address: '0x123...mock',
                            username: 'demo',
                            displayName: 'Demo Channel',
                            bio: 'This is a demo channel to show the layout.',
                            avatarUrl: 'https://github.com/shadcn.png',
                            playbackId: 'mock-id',
                            isLive: true,
                            title: 'Building Web3 Apps Live',
                            category: 'Coding',
                            tags: 'react,nextjs,web3'
                        });
                    } else {
                        setChannel(null);
                    }
                }
            } catch (err) {
                console.error('Error loading channel:', err);
            } finally {
                setLoading(false);
            }
        };

        loadChannel();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-8 flex justify-center">
                    <p>Loading channel...</p>
                </main>
            </div>
        );
    }

    if (!channel) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Channel Not Found</h1>
                    <p className="text-muted-foreground">The channel @{username} does not exist.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content (Player + Info) */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Video Player */}
                        <div className="w-full">
                            <StreamPlayer playbackId={channel.playbackId || ''} title={channel.title} />
                        </div>

                        {/* Stream Info & Profile */}
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold line-clamp-2">{channel.title}</h1>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                            {channel.category}
                                        </Badge>
                                        {channel.tags?.split(',').map(tag => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                #{tag.trim()}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Share
                                    </Button>
                                    <Button variant="default" size="sm" className="gap-2">
                                        <Heart className="h-4 w-4" />
                                        Follow
                                    </Button>
                                </div>
                            </div>

                            {/* Channel Profile Card */}
                            <Card className="bg-card/50 border-border/50">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-16 w-16 border-2 border-primary">
                                            <AvatarImage src={channel.avatarUrl} alt={channel.displayName} />
                                            <AvatarFallback>{channel.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-xl font-bold">{channel.displayName}</h2>
                                                <span className="text-muted-foreground text-sm">@{channel.username}</span>
                                                {channel.isLive && (
                                                    <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground max-w-2xl">
                                                {channel.bio}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>0 followers</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar (Chat Placeholder) */}
                    <div className="hidden lg:block h-[calc(100vh-100px)] sticky top-24">
                        <Card className="h-full flex flex-col">
                            <div className="p-4 border-b font-bold">Stream Chat</div>
                            <CardContent className="flex-1 flex items-center justify-center p-4 text-center text-muted-foreground">
                                <p>Chat integration coming soon...</p>
                            </CardContent>
                            <div className="p-4 border-t">
                                <Button disabled className="w-full">Send Message</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
