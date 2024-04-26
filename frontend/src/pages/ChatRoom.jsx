import React, { useState, useEffect, useRef  } from 'react';
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
  const [roomData, setRoomData] = useState(null); // Add a useState hook for the room data
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!isUserInteracting) {
      scrollToBottom();
  }
  }, [messages]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('token'));

    // Fetch room data when the component mounts
    fetch(`http://localhost:5000/api/chat/room?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${storedData.token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setRoomData(data);
      })
      .catch((error) => {
        console.error('Error fetching room data:', error);
      });

    const newSocket = io('http://localhost:5000', { transports: ['websocket'] }); // Connect to the Socket.IO server

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
    <Box display="flex" flexDirection="column" maxWidth="100%" height="90vh" maxHeight="90vh" paddingLeft={16} paddingRight={16}>
      <Box display="flex" justifyContent="center" marginTop={4} marginBottom={4}>
        {roomData && <Typography variant="h4" component="h1">{roomData.name}</Typography>}
      </Box>
      <Box 
        width="100%"  
        overflow="auto" 
        onMouseEnter={() => setIsUserInteracting(true)}
        onMouseLeave={() => setIsUserInteracting(false)}
        onScroll={(e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            setIsUserInteracting(scrollTop + clientHeight < scrollHeight);
        }}
      >
        {messages.map((message) => (
          <ChatMessage message={message} style={{ flexGrow: 1 }}></ChatMessage>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput chatroomId={id} message={message} setMessage={setMessage} sendMessage={sendMessage} /> {/* Pass the chatroom ID, message, and setMessage to the ChatInput component */}
    </Box>
  );
};

export default ChatRoom;