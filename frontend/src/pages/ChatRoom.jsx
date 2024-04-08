import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

// Temporary data
const messages = [
  { id: 1, text: 'Hello!', isOwnMessage: true },
  { id: 2, text: 'Hi!', isOwnMessage: false },
  // Add more messages as needed
];

const ChatRoom = () => {
  const { id } = useParams(); // Get the chatroom ID from the URL parameters
  const [message, setMessage] = useState(''); // Add a useState hook for the message

  return (
      <Box>
          <Typography variant="h4" component="h1">Chatroom {id}</Typography>
          <Box>
              {messages.map((message) => (
                  <ChatMessage key={message.id} message={message.text} isOwnMessage={message.isOwnMessage} />
              ))}
          </Box>
          <ChatInput chatroomId={id} message={message} setMessage={setMessage} /> {/* Pass the chatroom ID, message, and setMessage to the ChatInput component */}
      </Box>
  );
};

export default ChatRoom;