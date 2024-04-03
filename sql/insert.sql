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
    , '2024-03-22 13:13:13')
;

-- ChatGPT test inserts:

-- user:

INSERT INTO user
    ( id, username, password )
VALUES
    ( 2, 'john_doe', "securepassword" ),
    ( 3, 'jane_smith', "strongpassword" ),
    ( 4, 'bob_roberts', "password123" ),
    ( 5, 'alice_green', "abc123" ),
    ( 6, 'sam_williams', "letmein" ),
    ( 7, 'emily_jones', "qwerty" ),
    ( 8, 'david_brown', "iloveyou" ),
    ( 9, 'susan_clark', "123456" ),
    ( 10, 'mike_taylor', "mypassword" )
;

-- event:

INSERT INTO event
    ( id, user_id, name, description
    , start_date, end_date )
VALUES
    ( 2, 2, 'Birthday Party', 'John Does birthday celebration'
    , '2024-04-10', '2024-04-10'),
    ( 3, 3, 'Conference', 'Tech conference for professionals'
    , '2024-05-15', '2024-05-17'),
    ( 4, 4, 'Training Workshop', 'Workshop on project management'
    , '2024-06-20', '2024-06-21'),
    ( 5, 5, 'Charity Event', 'Fundraising event for local charity'
    , '2024-07-05', '2024-07-05'),
    ( 6, 6, 'Music Festival', 'Annual music festival in the city'
    , '2024-08-15', '2024-08-17'),
    ( 7, 7, 'Product Launch', 'Launch event for new product line'
    , '2024-09-25', '2024-09-25'),
    ( 8, 8, 'Family Reunion', 'Gathering of Brown family members'
    , '2024-10-10', '2024-10-10'),
    ( 9, 9, 'Sports Tournament', 'Local soccer tournament'
    , '2024-11-15', '2024-11-17'),
    ( 10, 10, 'Art Exhibition', 'Showcasing works of local artists'
    , '2024-12-20', '2024-12-22')
;

-- workhour:

INSERT INTO workhour
    ( id, user_id, amount, name, date )
VALUES
    ( 2, 2, 8, 'Birthday planning', '2024-04-09' ),
    ( 3, 3, 10, 'Conference presentations', '2024-05-16' ),
    ( 4, 4, 7, 'Workshop facilitation', '2024-06-20' ),
    ( 5, 5, 5, 'Event setup', '2024-07-05' ),
    ( 6, 6, 12, 'Festival performances', '2024-08-15' ),
    ( 7, 7, 9, 'Product demonstrations', '2024-09-25' ),
    ( 8, 8, 6, 'Family gathering', '2024-10-10' ),
    ( 9, 9, 11, 'Tournament matches', '2024-11-16' ),
    ( 10, 10, 8, 'Exhibition setup', '2024-12-19' )
;

-- chatroom:

INSERT INTO chatroom
    ( id, name, description, type )
VALUES
    ( 2, 'Tech Talk', 'Discussion about latest technologies', 1 ),
    ( 3, 'Book Club', 'Group for book enthusiasts', 1 ),
    ( 4, 'Fitness Motivation', 'Support group for fitness goals', 1 ),
    ( 5, 'Movie Buffs', 'Film lovers unite!', 1 ),
    ( 6, 'Travel Adventures', 'Sharing travel experiences and tips', 1 ),
    ( 7, 'Foodies Corner', 'Exploring culinary delights', 1 ),
    ( 8, 'Gaming Zone', 'Gamers hangout for all platforms', 1 ),
    ( 9, 'Pet Lovers', 'For those who adore their pets', 1 ),
    ( 10, 'DIY Crafts', 'Crafting ideas and projects', 1 )
;

-- message:

INSERT INTO message
    ( id, user_id, chatroom_id
    , text
    , datetime )
VALUES
    ( 2, 2, 2
    , 'What are your thoughts on the latest iPhone release?'
    , '2024-04-01 10:30:00'),
    ( 3, 3, 3
    , 'Has anyone read the latest bestseller?'
    , '2024-04-02 15:45:00'),
    ( 4, 4, 4
    , 'Looking for workout buddies, anyone interested?'
    , '2024-04-03 09:00:00'),
    ( 5, 5, 5
    , 'Recommendations for must-watch movies?'
    , '2024-04-04 12:00:00'),
    ( 6, 6, 6
    , 'Share your favorite travel destination!'
    , '2024-04-05 14:00:00'),
    ( 7, 7, 7
    , 'Best restaurants in town?'
    , '2024-04-06 18:30:00'),
    ( 8, 8, 8
    , 'Which game are you currently playing?'
    , '2024-04-07 21:15:00'),
    ( 9, 9, 9
    , 'Show off your adorable pets here!'
    , '2024-04-08 11:00:00'),
    ( 10, 10, 10
    , 'Share your latest DIY project photos!'
    , '2024-04-09 16:20:00')
;




-- End of file
