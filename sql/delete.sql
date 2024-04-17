-- Tables deleted from:     user
--                          event
--                          workhour
--                          chatroom
--                          message
--
-- Deleting test data from tables:

DELETE FROM     user
WHERE           id BETWEEN 1 AND 10
;

DELETE FROM     event
WHERE           id BETWEEN 1 AND 10
;

DELETE FROM     workhour
WHERE           id BETWEEN 1 AND 10
;

DELETE FROM     chatroom
WHERE           id BETWEEN 1 AND 10
;

DELETE FROM     message
WHERE           id BETWEEN 1 AND 10
;

-- End of file
