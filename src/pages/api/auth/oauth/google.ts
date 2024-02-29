import { generateCodeVerifier, generateState } from "arctic";
import { google } from "src/auth";

import type { APIContext } from "astro";

const MAXAGE = 60 * 10;

export async function POST(context: APIContext): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier);

    context.cookies.set("state", state, {
        httpOnly: true,
        maxAge: MAXAGE,
        path: "/",
        sameSite: "strict",
        secure: import.meta.env.PROD,
    });

    context.cookies.set("code_verifier", state, {
        httpOnly: true,
        maxAge: MAXAGE,
        path: "/",
        sameSite: "strict",
        secure: import.meta.env.PROD,
    });

    return context.redirect(url.toString());
}
