import type { APIContext, APIRoute } from "astro";
import { verify } from "src/utils/jwt";
import getLogger from "src/utils/logger";

export const POST: APIRoute = async (context: APIContext) => {
    let authorization: string | undefined;
    if (!authorization) {
        return new Response(
            JSON.stringify({
                message: "Attempt to post comment without authorized pass",
            }),
            {
                status: 401,
            },
        );
    }
    
    const splits = authorization.split(" ");
    if (splits.length < 2 || splits.length !== 2) {
        return new Response(
            JSON.stringify({
                message: "Attempt to post comment with invalid authorized pass",
            }),
            {
                status: 401,
            },
        );
    }

    const jwt = splits[1];
    const user = await verify(jwt);
    if (!user) {
        return new Response(
            JSON.stringify({ message: "Invalid authorized pass" }),
            { status: 401 },
        );
    }
    
    getLogger().info(user);
    const payload = await context.request.json();
    getLogger().info(payload);

    return new Response(JSON.stringify({ message: "success" }), {
        status: 200,
    });
};
