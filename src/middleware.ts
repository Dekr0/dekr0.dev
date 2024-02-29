import { lucia } from "./auth";
import { verifyRequestOrigin } from "lucia";
import { defineMiddleware } from "astro:middleware";
import getLogger from "./utils/logger";

// Lucia Template
export const onRequest = defineMiddleware(async (context, next) => {
    if (context.request.method !== "GET") {
        const originHeader = context.request.headers.get("Origin");
        const hostHeader = context.request.headers.get("Host");
        if (
            !originHeader ||
            !hostHeader ||
            !verifyRequestOrigin(originHeader, [hostHeader])
        ) {
            getLogger().info(`middleware - CSRF failed`);
            return new Response(null, {
                status: 403,
            });
        }
    }

    const sessionId =
        context.cookies.get(lucia.sessionCookieName)?.value ?? null;
    getLogger().info(`middleware - method ${context.request.method}`);
    getLogger().info(`middleware - sessionId: ${sessionId}`);
    if (!sessionId) {
        context.locals.user = null;
        context.locals.session = null;
        return next();
    }

    const { session, user } = await lucia.validateSession(sessionId);
    getLogger().info(`middleware - session: ${session?.id}; user: ${user?.id}`);
    if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        getLogger().info(`middleware - created session cookie`);
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
    }
    if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        getLogger().info(`middleware - created blank session cookie`);
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
    }
    context.locals.session = session;
    context.locals.user = user;
    getLogger().info(`middleware - session: {
        id :${context.locals.session?.id},
        fresh :${context.locals.session?.fresh},
        userId :${context.locals.session?.userId},
        expiresAt :${context.locals.session?.expiresAt},
    }`);
    return next();
});
