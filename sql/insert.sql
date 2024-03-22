-- Tables inserted into:    user
--                          event
--                          workhour
--                          chatroom
--                          message
--
-- Inserting test data into tables:

-- user:

INSERT INTO user
    ( id, username, password )
VALUES
    ( 1, 'user', "password" )
;

-- event:

INSERT INTO event
    ( id, user_id, name, description
    , start_date, end_date )
VALUES
    ( 1, 1, 'Test event', 'Description of test event'
    , '2024-03-22', '2024-03-22')
;

-- workhour:

INSERT INTO workhour
    ( id, user_id, amount, name, date )
VALUES
    ( 1, 1, 6, 'Test hours', '2024-03-22' )
;

-- chatroom:

INSERT INTO chatroom
    ( id, name, description, type )
VALUES
    ( 1, 'Test chatroom', 'For testing the chatroom', 0 )
;

-- message:

INSERT INTO message
    ( id, user_id, chatroom_id
    , text
    , datetime )
VALUES
    ( 1, 1, 1
    , 'This is a test message that can be potentially really long.'
    , '2024-03-22 13:13:13', )
;

-- End of file
