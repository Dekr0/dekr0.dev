import type { APIContext } from "astro";
import { generateState, generateCodeVerifier } from "arctic";
import { X } from "src/auth";

export async function GET(context: APIContext): Promise<Response> {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await X.createAuthorizationURL(state, codeVerifier);

    context.cookies.set("twitter_oauth_state", {
        httpOnly: true,
        secure: import.meta.env.PROD, // set `Secure` flag in HTTPS
        maxAge: 60 * 10, // 10 minutes
        path: "/"
    });
    context.cookies.set("code_verifier", {
        httpOnly: true,
        secure: import.meta.env.PROD,
        maxAge: 60 * 10,
        path: "/"
    });

    return context.redirect(url.toString());
}
