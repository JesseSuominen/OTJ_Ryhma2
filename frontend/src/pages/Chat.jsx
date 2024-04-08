import React from 'react';
import { Typography } from '@mui/material';
import JoinChatRoom from '../components/JoinChatRoom';
import AddChatRoom from '../components/AddChatRoom';

// Mock data
const chatrooms = [
    { id: 1, name: 'Chatroom 1', description: 'This is chatroom 1', type: 1 },
    { id: 2, name: 'Chatroom 2', description: 'This is chatroom 2', type: 2 },
    // Add more chatrooms as needed
];

const Chat = () => {
    return (
        <div>
            <AddChatRoom/>
            {chatrooms.map((chatroom) => (
                <JoinChatRoom key={chatroom.id} chatroom={chatroom} />
            ))}
        </div>
    );
};

export default Chat;

// CREATE TABLE chatroom
// (
//     id              INTEGER     PRIMARY KEY     NOT NULL    UNIQUE
//     , name          VARCHAR(80)                 NOT NULL
//     , description   VARCHAR(2000)
//     , type          INTEGER
// );

// CREATE TABLE message
// (
//     id              INTEGER     PRIMARY KEY     NOT NULL    UNIQUE
//     , user_id       INTEGER                     NOT NULL
//     , chatroom_id   INTEGER                     NOT NULL
//     , text          VARCHAR(5000)               NOT NULL
//     , datetime      TIMESTAMP                   NOT NULL
//     , FOREIGN KEY (user_id) REFERENCES user(id)
//     , FOREIGN KEY (chatroom_id) REFERENCES chatroom(id)
// );