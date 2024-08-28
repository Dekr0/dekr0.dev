import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
    const encoder = new TextEncoder();
    const eventStream = new ReadableStream({
        async start(controller) {
            controller.enqueue(encoder.encode(`data: an event\n\n`))
            await new Promise((r) => setTimeout(r, 10000))
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
