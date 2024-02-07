import type { APIRoute } from "astro";
import * as cookie from "cookie";

export const POST: APIRoute = async () => {
    const c = cookie.serialize("jwt_token", "", {
        path: "/guestbook",
        maxAge: 0,
    });

    return new Response("Logout Success", {
        status: 302,
        headers: {
            "Set-Cookie": c,
            Location: "/guestbook",
        },
    });
};
