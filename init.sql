CREATE TABLE pages (
    ID SERIAL PRIMARY KEY,
    page_title VARCHAR(255) UNIQUE,
    page_latest INTEGER CONSTRAINT fk_page_latest REFERENCES revisions(id)
);


CREATE TABLE revisions (
    ID SERIAL PRIMARY KEY,
    rev_page_id INTEGER CONSTRAINT fk_rev_page_id REFERENCES pages(id) ON DELETE CASCADE,
    rev_text_id INTEGER CONSTRAINT fk_rev_text_id REFERENCES text(id)
);

CREATE TABLE text (
    ID SERIAL PRIMARY KEY,
    text TEXT
);