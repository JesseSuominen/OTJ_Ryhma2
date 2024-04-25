import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatInput = ({ chatroomId, message, setMessage, sendMessage }) => {
  const handleSendMessage = (e) => {
    // Handle the logic for sending a message here
    e.preventDefault()
    console.log(`Send message: ${message} to chatroom: ${chatroomId}`);
    sendMessage()
    setMessage(''); // Clear the message input field after sending
  };

  const handleInputChange = (event) => {

    setMessage(event.target.value); // Update the message state when the input field changes
  };

  return (
    <Box
      component="form"
      onSubmit={e => handleSendMessage(e)}
      mt="auto"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: '100%', // You might also need to set the width to 100%
      }}
    >
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}
        sx={{ margin: 1 }}
        size="small"
      />
      <Button
        sx={{ height: 0.7 }}
        variant="contained"
        color="primary"
        type="submit"
        size="small"
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;