import type { APIContext, APIRoute } from "astro";
import { sign } from "src/utils/jwt";
import getLogger from "src/utils/logger";

export const POST: APIRoute = async ({ redirect }) => {
    return redirect(import.meta.env.GITHUB_OAUTH_URL);
};

export const GET: APIRoute = async (context: APIContext) => {
    const id: string = import.meta.env.GITHUB_CLIENT_ID;
    const secret: string = import.meta.env.GITHUB_CLIENT_SECRET;
    const code: string = new URL(context.request.url).search.slice(6).trim();
    const base_url = "https://github.com/login/oauth/access_token";
    const url = `${base_url}?client_id=${id}&client_secret=${secret}&code=${code}`;

    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        });
        const { access_token } = await res.json();
        res = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        
        const { id, login } = await res.json();
        const jwkCookie = await sign({id: id, username: login });

        return new Response("Authenticated Successful", {
            status: 302,
            headers: {
                "Set-Cookie": jwkCookie,
                "Location": "/guestbook"
            }
        });
    } catch (error) {
        getLogger().error(error);
        return new Response(JSON.stringify({ message: "Error" }), {
            status: 404,
        });
    }
};
