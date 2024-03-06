import type { _Comment } from "@T/Comment";
import type { APIContext, APIRoute } from "astro";

import DOMPurify from "isomorphic-dompurify";

import { lucia } from "src/auth";
import getLogger from "src/utils/logger";

const child = getLogger().child({ filename: "/pages/api/guestbook" });

export const GET: APIRoute = async (_: APIContext) => {
    try {
        const res = await fetch("http://localhost:8000/comments/get-all");
        return new Response(await res.blob(), { status: 200 });
    } catch (err) {
        if (err instanceof Error) {
            child.error(err.message);
            return new Response(null, { status: 500 });
        }
        return new Response(null, { status: 500 });
    }
};

export const POST: APIRoute = async (context: APIContext) => {
    const sessionId = context.cookies.get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
        child.info("Incoming request has no session cookie");
        return new Response(null, { status: 400 });
    }

    // Should session validation be done by middleware.ts?
    const { session, user } = await lucia.validateSession(sessionId);
    if (session) {
        const formData = await context.request.formData();
        const comment = formData.get("comment");
        if (!comment || typeof comment !== "string" || comment.length < 2) {
            return new Response(null, { status: 400 });
        }

        const params = new URLSearchParams();
        params.set("author", user.username);
        params.set("comment", DOMPurify.sanitize(comment));

        const headers: HeadersInit = {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const init: RequestInit = {
            body: params,
            method: "POST",
            headers: headers,
        };

        try {
            const res = await fetch(
                "http://localhost:8000/comments/post",
                init,
            );

            if (res.status === 200) {
                return new Response(null, { status: 200 });
            }

            throw new Error(`Server return status code ${res.status}`);
        } catch (err) {
            if (err instanceof Error) {
                child.error(err);
            }

            return new Response(null, { status: 500 });
        }
    }

    child.info("Incoming request with invalid session id");
    return new Response(null, { status: 401 });
};

export async function getAllComment() {
    const res = await fetch("http://localhost:8000/comments/get-all");
    const comment: _Comment[] = await res.json();
    return comment;
}
