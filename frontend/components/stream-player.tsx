'use client'

import { Card } from '@/components/ui/card'

interface StreamPlayerProps {
    playbackId: string;
    title?: string;
}

export function StreamPlayer({ playbackId, title }: StreamPlayerProps) {
    if (!playbackId) {
        return (
            <Card className="aspect-video w-full flex items-center justify-center bg-black/90">
                <p className="text-muted-foreground">Stream is offline or loading...</p>
            </Card>
        );
    }

    return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-black shadow-shadow">
            <iframe
                src={`https://lvpr.tv?v=${playbackId}`}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture"
                className="absolute top-0 left-0 w-full h-full"
                title={title || "Live Stream"}
            />
        </div>
    )
}
