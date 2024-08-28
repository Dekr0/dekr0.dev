import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { github, lucia } from "src/auth";
import { tursoDB } from "src/db";
import getLogger from "src/logger";

import type { APIContext } from "astro";

const child = getLogger().child({
    filename: "/api/auth/oauth/callback/github.ts",
    function: "GET",
});

type GitHubUser = {
    id: string; // GitHub User Id
    login: string; // GitHub User Name 
};

const api = "https://api.github.com/user";

export async function GET(context: APIContext) {
    const code = context.url.searchParams.get("code");
    const state = context.url.searchParams.get("state");
    const storedState = context.cookies.get("github_oauth_state")?.value ?? 
        null;

    if (!code || !state || !storedState || state !== storedState) {
        const reason = JSON.stringify({
            reason: "Encounter server side error during GitHub OAuth",
        });
        return new Response(reason, { status: 400 });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const headers = { Authorization: `Bearer ${tokens.accessToken}` };
        const response = await fetch(api, { headers: headers });
        const user: GitHubUser = await response.json();

        // const result = await tursoDB
        //     .execute({
        //         sql: `SELECT * FROM oauth_account 
        //                 WHERE provider_id = ? 
        //                 AND provider_user_id = ?`,
        //         args: ["github", user.id]
        //     });

        let account: undefined | { providerUserId: string };

        if (account) {
            const session = await lucia.createSession(account.providerUserId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            context.cookies.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );

            return context.redirect("/guestbook");
        }

        const userId = generateId(15);
        !import.meta.env.PROD && child.info(
            `New GitHub OAuth account with associated local user id: ${userId}`,
        );

        await tursoDB.batch(
            [ 
                { 
                    sql: `INSERT INTO user (id,  username) VALUES (?, ?)`,
                    args: [userId, user.login]
                },
                {
                    sql: `INSERT INTO oauth_account (provider_id, provider_user_id, user_id) VALUES (?, ?, ?)`,
                    args: ["github", user.id, userId]
                }
            ],
            "write"
        );

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return context.redirect("/guestbook");
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            child.info(e.message);
            child.info(e.description);
            const reason = JSON.stringify({
                reason: "Encounter server side error during GitHub OAuth",
            });
            return new Response(reason, { status: 400 });
        }

        child.info(e);
        const reason = JSON.stringify({
            reason: "Unkonw server side error during GitHub OAuth",
        });
        return new Response(reason, { status: 500 });
    }
}
