import { verifyRequestOrigin } from "lucia";
import { defineMiddleware } from "astro:middleware";

import { lucia } from "./auth";
import getLogger from "./utils/logger";

const child = getLogger().child({
    filename: "middleware.ts",
    function: "onRequest",
});

// Lucia Template
export const onRequest = defineMiddleware(async (context, next) => {
    // child.info(`request method: ${context.request.method}`);

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
    // child.info(
    //     `session.id: ${session?.id}; session.userId: ${session?.userId}`,
    // );
    // child.info(`user.id: ${user?.id}; user.username: ${user?.username}`);
    if (session && session.fresh) {
        // child.info(`session fresh: creating new session cookie`);
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
    }
    if (!session) {
        child.info(`no session: creating blank session cookie`);
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
