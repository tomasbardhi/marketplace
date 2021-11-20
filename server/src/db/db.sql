/* - - - - - - - - - - - - - - - - - - - - TABLES - - - - - - - - - - - - - - - - - - - -  */

CREATE TABLE creator (
    creator_id SERIAL NOT NULL,
    creator_name VARCHAR(255) UNIQUE NOT NULL,
    creator_address VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (creator_id)
);

CREATE TABLE collection (
    collection_id SERIAL NOT NULL,
    collection_creator_id INT NOT NULL,
    collection_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (collection_id),
    FOREIGN KEY (collection_creator_id) REFERENCES creator (creator_id)
);

CREATE TABLE single (
    single_id SERIAL NOT NULL,
    single_creator_id INT NOT NULL,
    single_collection_id INT,
    single_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (single_id),
    FOREIGN KEY (single_creator_id) REFERENCES creator (creator_id),
    FOREIGN KEY (single_collection_id) REFERENCES collection (collection_id)
);

/* - - - - - - - - - - - - - - - - - - - - QUERIES - - - - - - - - - - - - - - - - - - - -  */

INSERT INTO creator (creator_name, creator_address) VALUES ('Creator1', 'Address1');
INSERT INTO collection (collection_creator_id, collection_name) VALUES (1, 'Collection1');
INSERT INTO single (single_creator_id, single_collection_id, single_name) VALUES (1, 1, 'Single1');
INSERT INTO single (single_collection_id, single_name) VALUES (1, 'Single2');