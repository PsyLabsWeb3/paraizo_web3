import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { address: string } }
) {
    const address = params.address;
    const apiKey = request.headers.get('x-livepeer-api-key');

    if (!apiKey) {
        // Fallback to mock if no key provided (or return 401 if strict)
        return NextResponse.json({
            streamKey: `livepeer-${address.substring(0, 6)}-mock-key`,
            playbackId: `playback-${address.substring(0, 6)}`,
            warning: "Using mock key. Provide Livepeer API Key in settings for real streaming."
        });
    }

    try {
        // Create/Get stream from Livepeer
        const response = await fetch('https://livepeer.studio/api/stream', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: `Stream-${address}` }),
        });

        if (!response.ok) {
            throw new Error(`Livepeer API error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json({
            streamKey: data.streamKey,
            playbackId: data.playbackId,
        });

    } catch (error) {
        console.error("Livepeer Error:", error);
        return NextResponse.json({ error: "Failed to create stream" }, { status: 500 });
    }
}
