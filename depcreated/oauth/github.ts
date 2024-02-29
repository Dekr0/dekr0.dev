import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ redirect }) => {
    return redirect(import.meta.env.GITHUB_OAUTH_URL);
};
