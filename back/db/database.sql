CREATE DATABASE worky;

CREATE TABLE applicant (
    id SERIAL ,
    applicant_id VARCHAR PRIMARY KEY,
    name TEXT ,
    email TEXT ,
    phone INTEGER ,
    language TEXT ,
    workplace TEXT ,
    attempts VARCHAR ,
    location TEXT,
    timestamp TIMESTAMPTZ
);

CREATE TABLE status (
    id SERIAL ,
    status_id INTEGER PRIMARY KEY,
    type varchar
);

CREATE TABLE details (
    id SERIAL,
    applicant_id VARCHAR,
    details_id INTEGER PRIMARY KEY,
    comment TEXT,
    referral_amount NUMERIC(500, 2),
    status INTEGER ,
    FOREIGN KEY(status) REFERENCES status(status_id) ON DELETE CASCADE,
    FOREIGN KEY(applicant_id) REFERENCES  applicant(applicant_id) ON DELETE CASCADE
);

SET timezone = 'America/Guatemala';