import { github, lucia } from "src/auth";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db } from "src/sqlite";

import type { APIContext } from "astro";
import getLogger from "src/utils/logger";

type GitHubUser = {
    id: string;
    login: string;
};

// Lucia Template
export async function GET(context: APIContext) {
    const code = context.url.searchParams.get("code");
    const state = context.url.searchParams.get("state");
    const storedState =
        context.cookies.get("github_oauth_state")?.value ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }
    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const githubUser: GitHubUser = await githubUserResponse.json();
        const exisitingAccount = db
            .prepare(
                `SELECT * FROM oauth_account 
            WHERE provider_id = ? 
            AND provider_user_id = ?`,
            )
            .get("github", githubUser.id) as { user_id: string };

        if (exisitingAccount) {
            getLogger().info(
                `/api/auth/oauth/callback/github (GET) - create Session for existing user ${exisitingAccount.user_id}`,
            );
            const session = await lucia.createSession(
                exisitingAccount.user_id,
                {},
            );
            const sessionCookie = lucia.createSessionCookie(session.id);
            context.cookies.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );
            return context.redirect("/guestbook");
        }
        const userId = generateId(15);
        db.prepare(
            `INSERT INTO user 
                   (id,  username) 
                   VALUES (?, ?)`,
        ).run(userId, githubUser.login);
        db.prepare(
            `INSERT INTO oauth_account 
                   (provider_id, provider_user_id, user_id) 
                   VALUES (?, ?, ?)`,
        ).run("github", githubUser.id, userId);
        const session = await lucia.createSession(userId, {});
        getLogger().info(
            `/api/auth/oauth/callback/github (GET) - create Session for new user ${githubUser.id}:${githubUser.login}`,
        );
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
        return context.redirect("/guestbook");
    } catch (e) {
        // the specific error message depends on the provider
        getLogger().error(e);
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}
