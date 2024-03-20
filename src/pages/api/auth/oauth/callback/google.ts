import { google, lucia } from "src/auth";
import type { APIContext } from "astro";
import { db } from "src/sqlite";
import { generateId } from "lucia";
import { OAuth2RequestError } from "arctic";
import getLogger from "src/utils/logger";

type Profile = {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
};

const child = getLogger().child({
    filename: "/api/auth/oauth/callback/google.ts",
    function: "GET",
});

const api = "https://openidconnect.googleapis.com/v1/userinfo";

export async function GET(context: APIContext) {
    const code = context.url.searchParams.get("code");
    const state = context.url.searchParams.get("state");
    const storeState = context.cookies.get("state")?.value;
    const storeVerifier = context.cookies.get("code_verifier")?.value;

    if (
        !code ||
        !state ||
        !storeState ||
        !storeVerifier ||
        state !== storeState
    ) {
        child.info(`response code: ${code}`);
        child.info(`response state: ${state}`);
        child.info(`cookie state: ${storeState}`);
        child.info(`cookie code verifier: ${storeVerifier}`);
        const reason = JSON.stringify({
            reason: "Encounter server side error during GitHub OAuth",
        });
        return new Response(reason, { status: 400 });
    }

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            storeVerifier,
        );

        const headers = { Authorization: `Bearer ${tokens.accessToken}` };
        const response = await fetch(api, {
            headers: headers,
        });
        const profile: Profile = await response.json();

        const account = db
            .prepare(
                `SELECT user_id FROM oauth_account 
                     WHERE provider_id = ? 
                     AND provider_user_id = ?`,
            )
            .get("google", profile.sub) as { user_id: string };
        if (account) {
            // child.info(`Existing Google OAuth account: ${account.user_id}`);
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
        //    `New GitHub OAuth account with associated local user id: ${userId}`,
        //);
        db.prepare(
            `INSERT INTO user 
                   (id,  username) 
                   VALUES (?, ?)`,
        ).run(userId, profile.name);

        db.prepare(
            `INSERT INTO oauth_account 
                   (provider_id, provider_user_id, user_id) 
                   VALUES (?, ?, ?)`,
        ).run("google", profile.sub, userId);

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
