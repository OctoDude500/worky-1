CREATE TABLE users (
    id  SERIAL,
    user_id VARCHAR PRIMARY KEY ,
    user_code INTEGER,
    email VARCHAR(50) UNIQUE ,
    password VARCHAR
);