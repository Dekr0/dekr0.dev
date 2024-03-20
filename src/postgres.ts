import type { Client } from "pg";
import pg from "pg";
import getLogger from "./utils/logger";

const child = getLogger().child({
    filename: "/postgres.ts",
    function: "getClient",
});

const C = pg.Client;

function client() {
    let client: Client | undefined;

    return async function () {
        if (!client) {
            try {
                client = new C({
                    connectionString: import.meta.env.POSTGRES_URL,
                    ssl: {
                        rejectUnauthorized: true,
                    },
                });
                await client.connect();
                child.info("DB Connection Establish");
            } catch (err) {
                if (err instanceof Error) {
                    child.error(err.message);
                }

                return undefined;
            }
        }

        return client;
    };
}

const getClient = client();

export default getClient;
