import { GitHub, Twitter } from "arctic";
import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { luciaDB } from "./db";

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

export const adapter = new BetterSqlite3Adapter(luciaDB, {
    user: "user",
    session: "session"
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			// secure: true 
			secure: false
		}
	},
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            username: attributes.username,
        };
    },
});

export const github = new GitHub(
    import.meta.env.PROD
        ? import.meta.env.PROD_GITHUB_CLIENT_ID
        : import.meta.env.DEV_GITHUB_CLIENT_ID,
    import.meta.env.PROD
        ? import.meta.env.PROD_GITHUB_CLIENT_SECRET
        : import.meta.env.DEV_GITHUB_CLIENT_SECRET,
);

export const twitter = new Twitter(
    import.meta.env.TWITTER_CLIENT_ID,
    import.meta.env.TWITTER_CLIENT_SECRET,
    "https://dekr0.com/api/auth/oauth/callback/twitter"
);
