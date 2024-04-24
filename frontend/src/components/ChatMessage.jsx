import React from 'react';
import { Box, Typography } from '@mui/material';

const ChatMessage = ({ message, isOwnMessage }) => {
  return (
    <Box
      sx={{
        maxWidth: '80%',
        backgroundColor: isOwnMessage ? 'primary.main' : 'grey.300',
        color: isOwnMessage ? 'white' : 'black',
        borderRadius: 2,
        p: 1,
        mb: 1,
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
      }}
    >
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default ChatMessage;