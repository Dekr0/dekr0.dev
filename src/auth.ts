import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import { db } from "./sqlite";
import { GitHub, Google } from "arctic";

type DatabaseUserAttributes = {
    provider_id: string;
    username: string;
};

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

const adapter = new BetterSqlite3Adapter(db, {
    user: "user",
    session: "session",
});

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: true,
            sameSite: "strict",
            path: "/guestbook"
        },
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            providerId: attributes.provider_id,
        };
    },
});

export const github = new GitHub(
    import.meta.env.GITHUB_CLIENT_ID,
    import.meta.env.GITHUB_CLIENT_SECRET,
);

export const google = new Google(
    import.meta.env.GOOGLE_CLIENT_ID,
    import.meta.env.GOOGLE_CLIENT_SECRET,
    import.meta.env.GOOGLE_OAUTH_REDIRECT_URL,
);
