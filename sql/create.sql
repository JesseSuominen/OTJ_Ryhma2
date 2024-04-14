-- Tables created:          user
--                          event
--                          workhour
--                          chatroom
--                          message
--
-- Creating tables:

CREATE TABLE user
(
    id              INTEGER     PRIMARY KEY     NOT NULL    UNIQUE
    , username      VARCHAR(80)                 NOT NULL    UNIQUE
    , password      VARCHAR(80)                 NOT NULL
);

CREATE TABLE event
(
    id              INTEGER     PRIMARY KEY     NOT NULL    UNIQUE
    , user_id       INTEGER                     NOT NULL
    , name          VARCHAR(80)
    , description   VARCHAR(2000)
    , start_date    TIMESTAMP                   NOT NULL
    , end_date      TIMESTAMP
    , FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE workhour
(
    id              INTEGER     PRIMARY KEY     NOT NULL    UNIQUE
    , user_id       INTEGER                     NOT NULL
    , amount        DECIMAL                     NOT NULL
    , name          VARCHAR(80)
    , date          TIMESTAMP                   NOT NULL
    , FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE chatroom
(
    id              INTEGER     PRIMARY KEY     NOT NULL    UNIQUE
    , name          VARCHAR(80)                 NOT NULL    UNIQUE
    , description   VARCHAR(2000)
    , type          INTEGER
);

CREATE TABLE message
(
    id              INTEGER     PRIMARY KEY     NOT NULL    UNIQUE
    , user_id       INTEGER                     NOT NULL
    , chatroom_id   INTEGER                     NOT NULL
    , text          VARCHAR(5000)               NOT NULL
    , datetime      TIMESTAMP                   NOT NULL
    , FOREIGN KEY (user_id) REFERENCES user(id)
    , FOREIGN KEY (chatroom_id) REFERENCES chatroom(id)
);

-- End of file
