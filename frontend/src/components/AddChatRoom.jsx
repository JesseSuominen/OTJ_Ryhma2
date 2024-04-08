import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const AddChatRoom = () => {
    const handleAddChatRoom = () => {
        // Handle the logic for adding a chatroom here
        console.log('Add chatroom button clicked');
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" component="h1">Chatrooms</Typography>
            <Button variant="contained" color="primary" onClick={handleAddChatRoom}>
                Add Chatroom
            </Button>
        </Box>

    );
};

export default AddChatRoom;