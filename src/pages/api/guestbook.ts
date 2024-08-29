import type { APIContext, APIRoute } from "astro";
import { lucia } from "src/auth";
import getLogger from "src/logger";
import db from "src/db";

const logger = getLogger().child({ filename: "/pages/api/guestbook" });

export const POST: APIRoute = async (context: APIContext) => {
    const sessionId = context.cookies.get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
        logger.info("Incoming request has no session cookie");
        return new Response(null, { status: 400 });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session) {
        const formData = await context.request.formData();
        const content = formData.get("comment");
        if (!content || typeof content !== "string" || content.length < 2) {
            return new Response(null, { status: 400 });
        }

        try {
            const comment = await db.postComment(user.username, content);

            return new Response(JSON.stringify(comment), { status: 200 });
        } catch (err) {
            if (err instanceof Error) logger.error(err);

            return new Response("Interal Server Error", { status: 500 });
        }
    }

    logger.info("Incoming request with invalid session id");
    return new Response(null, { status: 401 });
};

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify(await db.getAllComments()));
}
