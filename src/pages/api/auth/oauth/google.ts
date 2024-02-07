import type { APIContext, APIRoute } from "astro";
import getLogger from "src/utils/logger";

export const POST: APIRoute = async ({ redirect }) => {
    const params = new URLSearchParams();

    params.append("client_id", import.meta.env.GOOGLE_CLIENT_ID);
    params.append("redirect_uri", import.meta.env.GOOGLE_OAUTH_REDIRECT_URL);
    params.append("response_type", "token");
    params.append("scope", import.meta.env.GOOGLE_OAUTH_SCOPE);

    const url = `${import.meta.env.GOOGLE_OAUTH_URL}?${params.toString()}`;

    getLogger().info(url);

    return redirect(url);
};

export const GET: APIRoute = async(context: APIContext) => {
    getLogger().info(context.url);

    return context.redirect("/guestbook");
}
