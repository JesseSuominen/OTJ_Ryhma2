import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import JoinChatRoom from '../components/JoinChatRoom';
import AddChatRoom from '../components/AddChatRoom';
import { SetChatroomsContext } from '../contexts/SetChatroomsContext';

const Chat = () => {
  const [chatrooms, setChatrooms] = useState([]); // Add a useState hook for the chatrooms

  useEffect(() => {
    // Fetch the chatrooms from the /api/chat/rooms route
    fetch('http://localhost:5000/api/chat/rooms')
      .then((response) => response.json())
      .then((data) => setChatrooms(data)) // Update the chatrooms state with the fetched data
      .catch((error) => console.error('Error:', error));
  }, []); // Add an empty dependency array so the effect only runs once
  return (
    <SetChatroomsContext.Provider value={setChatrooms}> {/* Provide the setChatrooms function */}
      <div>
        <AddChatRoom />
        {chatrooms.map((chatroom) => (
          <JoinChatRoom key={chatroom.id} chatroom={chatroom} />
        ))}
      </div>
    </SetChatroomsContext.Provider>
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