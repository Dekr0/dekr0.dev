import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { github, lucia } from "src/auth";
import db from "src/db";
import getLogger from "src/logger";

import type { APIContext } from "astro";

const logger = getLogger().child({
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

        const OAuthAccount = db.getOAuthAccountByOne("github", user.id);

        if (OAuthAccount) {
            const session = await lucia.createSession(OAuthAccount.local_uid, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            context.cookies.set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );

            return context.redirect("/guestbook");
        }

        const uid = generateId(15);
        logger.info(
            `New GitHub OAuth account with associated local user id: ${uid}`
        );

        db.createNewUser(uid, user.login);
        db.createNewOAuthAccount("github", user.id, uid);

        const session = await lucia.createSession(uid, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return context.redirect("/guestbook");
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            logger.info(e.message);
            logger.info(e.description);
            const reason = JSON.stringify({
                reason: "Encounter server side error during GitHub OAuth",
            });
            return new Response(reason, { status: 400 });
        }

        logger.info(e);
        const reason = JSON.stringify({
            reason: "Unkonw server side error during GitHub OAuth",
        });
        return new Response(reason, { status: 500 });
    }
}
