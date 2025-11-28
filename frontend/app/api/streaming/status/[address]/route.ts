import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { address: string } }
) {
    const address = params.address;
    const apiKey = request.headers.get('x-livepeer-api-key');

    if (!apiKey) {
        // Mock response if no key
        const isActive = false;
        return NextResponse.json({
            isActive,
            viewers: isActive ? Math.floor(Math.random() * 100) : 0,
            uptime: isActive ? '1h 20m' : null,
            title: `Live Stream by ${address.substring(0, 6)}...`,
            game: 'Just Chatting',
            warning: "Using mock status. Provide Livepeer API Key in settings."
        });
    }

    try {
        // Ideally, we'd look up the specific stream ID associated with this address
        // For now, we'll list streams and find the one matching our naming convention `Stream-${address}`
        const response = await fetch(`https://livepeer.studio/api/stream?streamsonly=1`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Livepeer API error: ${response.statusText}`);
        }

        const streams = await response.json();
        // Find the stream for this user
        const userStream = streams.find((s: any) => s.name === `Stream-${address}`);

        if (userStream) {
            return NextResponse.json({
                isActive: userStream.isActive,
                viewers: 0, // Livepeer API might not give real-time viewer count in this endpoint easily without session data
                uptime: userStream.isActive ? 'Live' : null,
                title: userStream.name,
                game: 'Web3 Streaming'
            });
        }

        return NextResponse.json({
            isActive: false,
            viewers: 0
        });

    } catch (error) {
        console.error("Livepeer Error:", error);
        return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
    }
}
