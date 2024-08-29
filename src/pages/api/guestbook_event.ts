import type { APIRoute } from "astro";

import getLogger from "src/logger";
import db from "src/db";

const logger = getLogger().child({ filename: "/pages/api/guestbook" });

export const GET: APIRoute = async ({ params, request }) => {
    const encoder = new TextEncoder();
    const eventStream = new ReadableStream({
        async start(controller) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(await db.getAllComments())}\n\n`))
            await new Promise((r) => setTimeout(r, 16000))
            controller.close()  
        }
    });
    return new Response(eventStream, {
        headers: {
            Connection: 'keep-alive',
           'Content-Encoding': 'none',
           'Cache-Control': 'no-cache, no-transform',
           'Content-Type': 'text/event-stream; charset=utf-8',
    }});
}
