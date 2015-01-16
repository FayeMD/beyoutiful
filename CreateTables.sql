CREATE TABLE users (
id SERIAL PRIMARY KEY,
username TEXT,
birthdate DATE,
firstname TEXT,
lastname TEXT,
email TEXT,
password TEXT,
create_date DATE DEFAULT now()
);

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
public BOOLEAN DEFAULT false,
user_id INT REFERENCES users(id),
comment TEXT,
post TEXT,
type TEXT,
post_date DATE DEFAULT now()
);

CREATE TABLE user_post_appreciates (
user_id INT REFERENCES users(id),
post_id INT REFERENCES posts(id)
);

CREATE TABLE user_post_pin (
user_id INT REFERENCES users(id),
post_id INT REFERENCES posts(id)
);

CREATE TABLE user_post_share (
user_id INT REFERENCES users(id),
post_id INT REFERENCES posts(id)
);