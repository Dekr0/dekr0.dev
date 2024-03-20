import { github, lucia } from "src/auth";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db } from "src/sqlite";

import type { APIContext } from "astro";
import getLogger from "src/utils/logger";

type User = {
    id: string;
    login: string;
};

const child = getLogger().child({
    filename: "/api/auth/oauth/callback/github.ts",
    function: "GET",
});

const api = "https://api.github.com/user";

// Lucia Template
export async function GET(context: APIContext) {
    const code = context.url.searchParams.get("code");
    const state = context.url.searchParams.get("state");
    const storedState = context.cookies.get("github_oauth_state")?.value;

    if (!code || !state || !storedState || state !== storedState) {
        child.info(`response code: ${code}`);
        child.info(`response state: ${state}`);
        child.info(`cookie state: ${storedState}`);
        const reason = JSON.stringify({
            reason: "Encounter server side error during GitHub OAuth",
        });
        return new Response(reason, { status: 400 });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const headers = { Authorization: `Bearer ${tokens.accessToken}` };
        const response = await fetch(api, { headers: headers });
        const user: User = await response.json();

        const account = db
            .prepare(
                `SELECT * FROM oauth_account 
                        WHERE provider_id = ? 
                        AND provider_user_id = ?`,
            )
            .get("github", user.id) as { user_id: string };

        if (account) {
            child.info(`Existing GitHub OAuth account: ${account.user_id}`);
            const session = await lucia.createSession(account.user_id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            context.cookies.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );

            return context.redirect("/guestbook");
        }

        const userId = generateId(15);
        // child.info(
        //     `New GitHub OAuth account with associated local user id: ${userId}`,
        // );
        let stmt = db.prepare(`INSERT INTO user (id,  username) VALUES (?, ?)`);
        stmt.run(userId, user.login);

        stmt = db.prepare(`INSERT INTO oauth_account 
                          (provider_id, provider_user_id, user_id) 
                          VALUES (?, ?, ?)`);
        stmt.run("github", user.id, userId);

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
