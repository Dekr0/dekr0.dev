import sqlite from "better-sqlite3";
import { type Database as BetterSQLite3Database } from "better-sqlite3";

export type Comment = {
    comment_id: string,
    comment_author: string,
    comment: string,
    comment_time: number
};

type OAuthAccount = {
    provider: string,
    provider_uid: string,
    local_uid: string
};

interface DBAdapter {
    createNewUser: (uid: string, usrname: string) => Promise<void>;
    createNewOAuthAccount: (provider: string, providerUId: string, uid: string)
        => Promise<void>;
    getAllComments: () => Promise<Comment[]>;
    getOAuthAccountByOne: (provider: string, providerUId: string) => 
        Promise<OAuthAccount | undefined>;
    postComment: (author: string, comment: string) => Promise<void>;
};

class SQLiteAdapter implements DBAdapter {
    private db: BetterSQLite3Database;

    constructor(filename?: string, opts?: sqlite.Options) {
        this.db = sqlite(filename, opts);
    }

    async createNewUser(uid: string, usrname: string) {
        const s = this.db.prepare(`INSERT INTO user (id,  username) VALUES (?, ?)`);
        s.run(uid, usrname);
    }

    async createNewOAuthAccount(provider: string, providerUId: string, 
                                 uid: string) {
        const s = this.db.prepare(`INSERT INTO oauth_accounts 
                          (provider, provider_uid, local_uid) 
                          VALUES (?, ?, ?)`);
        s.run(provider, providerUId, uid);
    }
   
    async getAllComments() {
        return this.db.prepare("SELECT * FROM comments ORDER BY comment_time desc").all() as Comment[];
    }

    async getOAuthAccountByOne(provider: string, providerUId: string): 
        Promise<OAuthAccount | undefined> {
        const a = this.db.prepare(
                `SELECT * FROM oauth_accounts
                        WHERE provider = ? 
                        AND provider_uid = ?`,
            )
            .get(provider, providerUId) as OAuthAccount | undefined;

        return a;
    }

    async postComment(author: string, comment: string) {
        const s = this.db.prepare(`INSERT INTO comments (
            comment_id, comment_author, comment) VALUES (?, ?, ?)`);
        s.run(crypto.randomUUID(), author, comment);
    }

    expose() {
        return this.db;
    }
}

class Database {
    private adapter: DBAdapter;

    constructor(db: DBAdapter) {
        this.adapter = db;
    }

    async createNewUser(uid: string, usrname: string) {
        await this.adapter.createNewUser(uid, usrname);
    }

    async createNewOAuthAccount(provider: string, providerUId: string, 
                                 uid: string) {
        await this.adapter.createNewOAuthAccount(provider, providerUId, uid);
    }

    async getOAuthAccountByOne(provider: string, providerUId: string): 
        Promise<OAuthAccount | undefined> {
        return await this.adapter.getOAuthAccountByOne(provider, providerUId);
    }

    async getAllComments() {
        return await this.adapter.getAllComments();
    }

    async postComment(author: string, comment: string) {
        return await this.adapter.postComment(author, comment);
    }
}

const sqliteAdapter = new SQLiteAdapter("dekr0.com.db");
const db = new Database(sqliteAdapter);

export const luciaDB = sqliteAdapter.expose();

luciaDB.exec(`CREATE TABLE IF NOT EXISTS user (
	"id" TEXT NOT NULL UNIQUE,
	"username" TEXT NOT NULL,
	PRIMARY KEY("id")
)`);

luciaDB.exec(`CREATE TABLE IF NOT EXISTS oauth_accounts (
	"provider" TEXT NOT NULL,
	"provider_uid" TEXT NOT NULL,
	"local_uid"	TEXT NOT NULL UNIQUE,
	FOREIGN KEY("local_uid") REFERENCES "user"("id"),
	PRIMARY KEY("provider","provider_uid")
)`);

luciaDB.exec(`CREATE TABLE IF NOT EXISTS session (
	"id" TEXT NOT NULL,
	"expires_at" INTEGER NOT NULL,
	"user_id" TEXT NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "user"("id"),
	PRIMARY KEY("id")
)`);

luciaDB.exec(`CREATE TABLE IF NOT EXISTS comments (
	"comment_id" TEXT NOT NULL UNIQUE,
	"comment_author" TEXT NOT NULL,
	"comment" TEXT NOT NULL,
	"comment_time" INTEGER DEFAULT (unixepoch('now')) NOT NULL,
	PRIMARY KEY("comment_id")
)`);

export default db;
