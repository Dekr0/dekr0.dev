import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import { db } from "./sqlite";
import { GitHub, Google } from "arctic";
import { prod } from "./const";

type DatabaseUserAttributes = {
    id: string;
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
            secure: import.meta.env.PROD,
        },
    },
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            username: attributes.username,
        };
    },
});

export const github = new GitHub(
    prod
        ? import.meta.env.GITHUB_CLIENT_ID
        : import.meta.env.TEST_GITHUB_CLIENT_ID,
    prod
        ? import.meta.env.GITHUB_CLIENT_SECRET
        : import.meta.env.TEST_GITHUB_CLIENT_SECRET,
);

export const google = new Google(
    prod
        ? import.meta.env.GOOGLE_CLIENT_ID
        : import.meta.env.TEST_GOOGLE_CLIENT_ID,
    prod
        ? import.meta.env.GOOGLE_CLIENT_SECRET
        : import.meta.env.TEST_GOOGLE_CLIENT_SECRET,
    prod
        ? import.meta.env.GOOGLE_OAUTH_REDIRECT_URL
        : import.meta.env.TEST_GOOGLE_OAUTH_REDIRECT_URL,
);
