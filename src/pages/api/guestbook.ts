import type { APIContext, APIRoute } from "astro";
import type { QueryConfig } from "pg";

import DOMPurify from "isomorphic-dompurify";

import getClient from "src/postgres";
import getLogger from "src/utils/logger";
import { lucia } from "src/auth";

export type CommentQueryResult = {
    commentsid: number;
    commentsauthor: string;
    commentscontent: string;
    commentstime: Date | number;
}

const baseLog = getLogger().child({ filename: "/pages/api/guestbook" });

export const GET: APIRoute = async (_: APIContext) => {
    const l = baseLog.child({ function: "GET" });
    try {
        const comments = await getAllComment();

        return new Response(JSON.stringify(comments), { status: 200 });
    } catch (err) {
        if (err instanceof Error) {
            l.error(err.message);
        }
        return new Response("Internal Server Error", { status: 500 });
    }
};

export const POST: APIRoute = async (context: APIContext) => {
    const sessionId = context.cookies.get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
        baseLog.info("Incoming request has no session cookie");
        return new Response(null, { status: 400 });
    }

    // Should session validation be done by middleware.ts?
    const { session, user } = await lucia.validateSession(sessionId);
    if (session) {
        const formData = await context.request.formData();
        const content = formData.get("content");
        if (!content || typeof content !== "string" || content.length < 2) {
            return new Response(null, { status: 400 });
        }

        /*const params = new URLSearchParams();
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
        };*/

        try {
            const comment = await postComment(user.username, content);

            return new Response(JSON.stringify(comment), { status: 200 });
        } catch (err) {
            if (err instanceof Error) {
                baseLog.error(err);
            }

            return new Response("Interal Server Error", { status: 500 });
        }
    }

    baseLog.info("Incoming request with invalid session id");
    return new Response(null, { status: 401 });
};

export async function getAllComment() {
    const client = await getClient();
    if (!client) {
        throw new Error(
            "Failed to get all comments. Reason: DB Connection is not established",
        );
    }

    const query: QueryConfig = {
        text: "SELECT * FROM comments ORDER BY commentstime desc",
    };
    const res = await client.query<CommentQueryResult>(query);
    for (const row of res.rows) {
        row.commentstime = (row.commentstime as Date).getTime();
    }

    return res.rows;
}

export async function postComment(author: string, content: string) {
    const client = await getClient();

    if (!client) {
        throw new Error(
            "Failed to post comment. Reason: DB Connection is not established",
        );
    }

    let query: QueryConfig = {
        text: `INSERT INTO comments (
            commentsid,
            commentsauthor,
            commentscontent,
            commentstime
        ) VALUES (DEFAULT, $1, $2, now()) RETURNING *`,
        values: [DOMPurify.sanitize(author), DOMPurify.sanitize(content)],
    };

    let res = await client.query<CommentQueryResult>(query);
    if (res.rows.length === 0) {
        throw new Error(
            "Failed to post comment. Reason: DB insertion did not return the inserted row",
        );
    }
}
