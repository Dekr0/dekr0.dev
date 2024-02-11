import type { APIContext, APIRoute } from "astro";
import { sign } from "src/utils/jwt";
import getLogger from "src/utils/logger";

type GoogleTokenAPIResponse = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_tokoen: string;
};

type GoogleUserInfo = {
    id: string;
    name: string;
};

export const GET: APIRoute = async (context: APIContext) => {
    let url = new URL(context.request.url);
    let params = new URLSearchParams(url.search);
    const code = params.get("code");

    if (!code) {
        // Log error
        return new Response("Authorization Failed", {
            status: 500,
            headers: {
                Location: "/guestbook",
            },
        });
    }

    params = new URLSearchParams();
    params.append("client_id", import.meta.env.GOOGLE_CLIENT_ID);
    params.append("client_secret", import.meta.env.GOOGLE_CLIENT_SECRET);
    params.append("code", code);
    params.append("redirect_uri", import.meta.env.GOOGLE_OAUTH_REDIRECT_URL);
    params.append("grant_type", "authorization_code");

    url = new URL("https://oauth2.googleapis.com/token");
    url.search = params.toString();

    try {
        let res = await fetch(url.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data: GoogleTokenAPIResponse = await res.json();

        res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${data.access_token}`,
            },
        });

        const user: GoogleUserInfo = await res.json();
        const jwkCookie = await sign({ id: user.id, username: user.name });

        return new Response("Authenticated Successful", {
            status: 302,
            headers: {
                "Set-Cookie": jwkCookie,
                "Location": "/guestbook"
            }
        });
    } catch (err) {
        getLogger().error(err);
        return new Response("Authorization Failed", {
            status: 500,
            headers: {
                Location: "/guestbook",
            },
        });
    }
};
