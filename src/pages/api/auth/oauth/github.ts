import { generateState } from "arctic";
import { github } from "src/auth";

import type { APIContext } from "astro";

const MAXAGE = 60 * 10;

export async function POST(context: APIContext): Promise<Response> {
    const state = generateState();
    const url = await github.createAuthorizationURL(state);

    context.cookies.set("github_oauth_state", state, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: MAXAGE,
        sameSite: "strict",
    });

    return context.redirect(url.toString());
}
