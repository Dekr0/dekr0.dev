import type { APIContext, APIRoute } from "astro";
import DOMPurify from "isomorphic-dompurify";
import { lucia } from "src/auth";
import getLogger from "src/logger";
import db from "src/db";

const logger = getLogger().child({ filename: "/pages/api/guestbook" });

export const DELETE: APIRoute = async (context: APIContext) => {
    const sessionId = context.cookies.get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
        logger.info("Incoming request has no session cookie");
        return new Response(null, { status: 400 });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session) {
        const formData = await context.request.formData();
        const id = formData.get("comment_author_uid");
        const commentId = formData.get("comment_id");

        if (!id || typeof id !== "string") {
            return new Response(null, { status: 400 });
        }

        if (id !== user.id) {
            logger.info(`User with id ${id} attempt to delete another 
                        user's comment with comment_id ${commentId}`);
            return new Response(null, { status: 401 });
        }

        if (!commentId || typeof commentId !== "string") {
            return new Response(null, { status: 400 });
        }

        try {
            db.deleteComment(commentId);

            const latestComment = db.getAllComments();

            return new Response(JSON.stringify(latestComment), { status: 200 });
        } catch (err) {
            if (err instanceof Error) logger.error(err);

            return new Response("Interal Server Error", { status: 500 });
        }
    }

    logger.info("Incoming request with invalid session id");
    return new Response(null, { status: 401 });
}

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify(db.getAllComments()));
}

export const POST: APIRoute = async (context: APIContext) => {
    const sessionId = context.cookies.get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
        logger.info("Incoming request has no session cookie");
        return new Response(null, { status: 400 });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session) {
        const formData = await context.request.formData();
        const comment = formData.get("comment");
        if (!comment || typeof comment !== "string" || comment.length < 2) {
            return new Response(null, { status: 400 });
        }

        try {
            db.postComment(
                user.id,
                DOMPurify.sanitize(user.username), 
                DOMPurify.sanitize(comment)
            );

            const latestComment = db.getAllComments();

            return new Response(JSON.stringify(latestComment), { status: 200 });
        } catch (err) {
            if (err instanceof Error) logger.error(err);

            return new Response("Interal Server Error", { status: 500 });
        }
    }

    logger.info("Incoming request with invalid session id");
    return new Response(null, { status: 401 });
};
