import { lucia } from "src/auth";

import type { APIContext } from "astro";
import getLogger from "src/utils/logger";

const child = getLogger().child({
    filename: "/api/auth/logout.ts",
    function: "POST",
});

export async function POST(context: APIContext) {
    if (!context.locals.session) {
        child.info("No session is provided, return 401 response");
        const reason = JSON.stringify({ reason: "No session is provided "});
        return new Response(reason, {
            status: 401,
        });
    }

    await lucia.invalidateSession(context.locals.session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );
    
    // child.info("Validated session. Setting auth_session cookie to blank");

    return context.redirect("/guestbook");
}
