import sqlite from "better-sqlite3";

export const db = sqlite(":memory:");

db.exec(`CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL,
    username TEXT NOT NULL,
    PRIMARY KEY("id")
)`);

db.exec(`CREATE TABLE IF NOT EXISTS oauth_account (
    provider_id TEXT NOT NULL,
    provider_user_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    PRIMARY KEY (provider_id, provider_user_id),
    FOREIGN KEY (user_id) REFERENCES user(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY (user_id) REFERENCES user(id)
)`);
