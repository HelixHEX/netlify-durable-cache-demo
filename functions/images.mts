import { type Context } from '@netlify/functions';
import { json } from 'stream/consumers';

const API_ROOT = 'https://api.unsplash.com';

export default async () => {
    try {
        const accessKey = process.env.ACCESS_KEY;
        const doggoEndpoint = `${API_ROOT}/photos?client_id=${accessKey}&count=10&collections='e3HsXpoyMIc'`;
        const response = await fetch(doggoEndpoint);
        const images = await response.json();
        return new Response(JSON.stringify(images), {
            headers: {
                'Netlify-CDN-Cache-Control': 'public, max-age=86400, durable'
            }
        })
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Failed fetching images' }, { status: 500 });
    }
};