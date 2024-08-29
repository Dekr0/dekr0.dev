import { verifyRequestOrigin } from "lucia";
import { defineMiddleware } from "astro:middleware";
import { lucia } from "./auth";
import getLogger from "./logger";

const logger = getLogger().child({
    filename: "middleware.ts",
    function: "onRequest",
});

export const onRequest = defineMiddleware(async (context, next) => {
    logger.info(`request method: ${context.request.method}`);
    if (context.request.method !== "GET") {
        const originHeader = context.request.headers.get("Origin");
        const hostHeader = context.request.headers.get("Host");
        if (
            !originHeader ||
            !hostHeader ||
            !verifyRequestOrigin(originHeader, [hostHeader])
        ) {
            const reason = JSON.stringify({
                reason: "Request Origin verification failed",
            });
            return new Response(reason, { status: 403 });
        }
    }

    const sessionId = context.cookies.get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
        context.locals.user = null;
        context.locals.session = null;
        return next();
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
        logger.info(`session fresh: creating new session cookie`);
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
    }
    if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
    }
    context.locals.session = session;
    context.locals.user = user;
    return next();
});
