import sqlite from "better-sqlite3";
import { type Database as BetterSQLite3Database } from "better-sqlite3";

export type Comment = {
    comment_id: string,
    comment_author: string,
    comment: string,
    comment_time: number,
    comment_author_uid: string
};

type OAuthAccount = {
    provider: string,
    provider_uid: string,
    local_uid: string
};

interface DBAdapter {
    createNewUser: (id: string, username: string) => void;
    createNewOAuthAccount: (provider: string, providerUId: string, id: string)
        => void;
    deleteComment: (commentId: string) => void;
    getAllComments: () => Comment[];
    getOAuthAccountByOne: (provider: string, providerUId: string) => 
        OAuthAccount | undefined;
    postComment: (id: string, author: string, comment: string) => void;
};

class SQLiteAdapter implements DBAdapter {
    private db: BetterSQLite3Database;

    constructor(filename?: string, opts?: sqlite.Options) {
        this.db = sqlite(filename, opts);
    }

    createNewUser(id: string, username: string) {
        const s = this.db.prepare(`INSERT INTO user (id,  username) VALUES (?, ?)`);
        s.run(id, username);
    }

    createNewOAuthAccount(provider: string, providerUId: string, 
                                 uid: string) {
        const s = this.db.prepare(`INSERT INTO oauth_accounts 
                          (provider, provider_uid, local_uid) 
                          VALUES (?, ?, ?)`);
        s.run(provider, providerUId, uid);
    }

    deleteComment(commentId: string) {
        this.db.prepare("DELETE FROM comments WHERE comment_id = ?").run(commentId);
    }
   
    getAllComments() {
        return this.db.prepare("SELECT * FROM comments ORDER BY comment_time desc").all() as Comment[];
    }

    getOAuthAccountByOne(provider: string, providerUId: string): 
        OAuthAccount | undefined {
        const a = this.db.prepare(
                `SELECT * FROM oauth_accounts
                        WHERE provider = ? 
                        AND provider_uid = ?`,
            )
            .get(provider, providerUId) as OAuthAccount | undefined;

        return a;
    }

    postComment(id: string, author: string, comment: string) {
        const s = this.db.prepare(`INSERT INTO comments (
            comment_id, comment_author, comment, comment_author_uid) VALUES (?, ?, ?, ?)`);
        s.run(crypto.randomUUID(), author, comment, id);
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

    createNewUser(id: string, username: string) {
        this.adapter.createNewUser(id, username);
    }

    createNewOAuthAccount(provider: string, providerUId: string, 
                                 id: string) {
        this.adapter.createNewOAuthAccount(provider, providerUId, id);
    }

    deleteComment(commentId: string) {
        this.adapter.deleteComment(commentId);
    }

    getOAuthAccountByOne(provider: string, providerUId: string): 
        OAuthAccount | undefined {
        return this.adapter.getOAuthAccountByOne(provider, providerUId);
    }

    getAllComments() {
        return this.adapter.getAllComments();
    }

    postComment(id: string, author: string, comment: string) {
        this.adapter.postComment(id, author, comment);
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
    "comment_author_uid" TEXT NOT NULL,
	PRIMARY KEY("comment_id"),
    FOREIGN KEY("comment_author_uid") REFERENCES "user"("id")
)`);

export default db;
