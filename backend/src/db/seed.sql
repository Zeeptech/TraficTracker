CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    email TEXT NOT NULL UNIQUE,
    deleted_at BOOLEAN
);

CREATE TABLE sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    last_used_at INTEGER NOT NULL DEFAULT (unixepoch())
);

INSERT INTO users (username, password, email, deleted_at) VALUES
(
    'dev',
    '$argon2id$v=19$m=65536,t=3,p=4$TOA4f7Rf6aswcauVOthbUQ$ImkChUHGB3C1CeM16MiPhBSOWo6tMUzGSTOXj40kgk8',
    'dev@dev.com',
    NULL
);
