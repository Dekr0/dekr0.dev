import sqlite from "better-sqlite3";

export const db = sqlite(":memory:");

db.exec(`CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL,
    provider_id TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL,
    PRIMARY KEY("id")
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY (user_id) REFERENCES user(id)
)`);
