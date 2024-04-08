import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatInput = ({ chatroomId, message, setMessage }) => {
    const handleSendMessage = (e) => {
        // Handle the logic for sending a message here
        e.preventDefault()
        console.log(`Send message: ${message} to chatroom: ${chatroomId}`);
        setMessage(''); // Clear the message input field after sending
    };

    const handleInputChange = (event) => {
        
        setMessage(event.target.value); // Update the message state when the input field changes
    };

    return (
        <Box
            component="form"
            onSubmit={e => handleSendMessage(e)}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1,
            }}
        >
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Type a message"
                value={message}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Send
            </Button>
        </Box>
    );
};

export default ChatInput;