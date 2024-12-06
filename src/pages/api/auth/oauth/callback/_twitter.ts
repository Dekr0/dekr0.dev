import { OAuth2RequestError } from "arctic";
import type { APIContext } from "astro";
import { X } from "src/auth";
import getLogger from "src/logger";

const logger = getLogger().child({
    filename: "/api/auth/oauth/callback/github.ts",
    function: "GET",
});

type TwitterUser = {
    id: string,
    name: string,
    username: string
};

const api = "https://api.twitter.com/2/users?user.fields=id,name,username";

export async function GET(context: APIContext) {
    const code = context.url.searchParams.get("code");
    const state = context.url.searchParams.get("state");
    const storedState = context.cookies.get("twitter_oauth_state")?.value ?? 
        null;
    const codeVerifier = context.cookies.get("code_verifier")?.value ?? null;

    if (!state || !storedState || !code || storedState !== state || !codeVerifier) {
		return new Response(JSON.stringify({
            reason: "Encounter server side error during Twitter OAuth"
        }), {
			status: 400
		});
	}

    try {
        const tokens = await X.validateAuthorizationCode(code, 
                                                               codeVerifier);
        const headers = { Authorization: `Bearer ${tokens.accessToken}` };
        const response = await fetch(api, { headers: headers });
        const user: TwitterUser = await response.json();

        logger.info(user);

        return context.redirect("/guestbook");
    } catch(e) {
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
