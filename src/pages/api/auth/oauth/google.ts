import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ redirect }) => {
    const params = new URLSearchParams();

    params.append("client_id", import.meta.env.GOOGLE_CLIENT_ID);
    params.append("redirect_uri", import.meta.env.GOOGLE_OAUTH_REDIRECT_URL);
    params.append("response_type", "code");
    params.append("scope", import.meta.env.GOOGLE_OAUTH_SCOPE);
    params.append("prompt", "consent");
    params.append("access_type", "offline");

    const url = `${import.meta.env.GOOGLE_OAUTH_URL}?${params.toString()}`;

    return redirect(url);
};
