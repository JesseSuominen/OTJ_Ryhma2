import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import io from 'socket.io-client';

const ChatRoom = () => {
  const { id } = useParams(); // Get the chatroom ID from the URL parameters
  const [message, setMessage] = useState(''); // Add a useState hook for the message
  const [messages, setMessages] = useState([]); // Add a useState hook for the messages
  const [socket, setSocket] = useState(null); // Add a useState hook for the socket

  useEffect(() => {
    const newSocket = io('http://localhost:5000', { transports: ['websocket'] }); // Connect to the Socket.IO server
    const storedData = JSON.parse(localStorage.getItem('token'));
    setSocket(newSocket);

    newSocket.emit('joinRoom', id);
    newSocket.on('message', (message) => {

      message.isOwnMessage = message.user_id == storedData.user_id;
      if (message.chatroom_id == id) {
        setMessages((messages) => [...messages, message]);
      }
    });

    // Fetch historical messages when the component mounts
    fetch(`http://localhost:5000/api/chat/messages?id=${id}`, {
      headers: {
          'Authorization': `Bearer ${storedData.token}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
        const storedData = JSON.parse(localStorage.getItem('token'));
        const fetchedMessages = data.map((message) => ({
            ...message,
            isOwnMessage: message.user_id == storedData.user_id,
        }));
        setMessages(fetchedMessages);
    })
    .catch((error) => {
        console.error('Error fetching messages:', error);
    });

    // Clean up the effect
    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    const storedData = JSON.parse(localStorage.getItem('token'));
    if (socket && storedData) {

      const msg = {
        user_id: storedData.user_id, // Send the user's ID with the message
        chatroom_id: id, // Send the chatroom ID with the message
        text: message, // Send the message text
        datetime: new Date().toISOString() // Send the current date and time
      }
      console.log(storedData)
      socket.emit('message', msg);
      setMessage(''); // Clear the message input
    }
  };



  return (
    <Box width="100%">
      <Typography variant="h4" component="h1">Chatroom {id}</Typography>
      <Box width="100%">
        {messages.map((message) => (
          <Box key={message.id} display="flex" flexDirection="row" alignItems="center" width="100%">
            <Typography variant="subtitle1">{message.username}</Typography>
            <ChatMessage message={message.text} isOwnMessage={message.isOwnMessage} style={{ flexGrow: 1 }}/>
          </Box>
        ))}
      </Box>
      <ChatInput chatroomId={id} message={message} setMessage={setMessage} sendMessage={sendMessage} /> {/* Pass the chatroom ID, message, and setMessage to the ChatInput component */}
    </Box>
  );
};

export default ChatRoom;