import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    // TODO: Configura tu API key de fal.ai, Replicate o similar
    // Ejemplo con fal.ai (reemplaza con tu key)
    /*
    const response = await fetch('https://fal.run/fal-ai/flux-pro', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: `NSFW, adult content, ${prompt}` }),
    });
    const data = await response.json();
    */

    // Placeholder para testing
    const fakeImage = `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1024/1024`;

    return NextResponse.json({ image: fakeImage });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating image' }, { status: 500 });
  }
}