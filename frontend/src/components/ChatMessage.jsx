import React from 'react';
import { Box, Typography, Card } from '@mui/material';
const ChatMessage = ({ message, isOwnMessage }) => {
  return (
    <Card sx={{ backgroundColor: '#f5f5f5', margin: 2 }}>
      <Box key={message.id} display="flex" flexDirection="row" alignItems="center" width="100%" sx={{
        justifyContent: message.isOwnMessage ? 'end' : 'flex-start'
      }}>
        {message.isOwnMessage && (
          <Box
            sx={{
              maxWidth: '80%',
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              p: 1,
              mb: 1,
              margin: 1
            }}
          >
            <Typography variant="body1">{message.text}</Typography>
          </Box>
        )}
        <Box
          sx={{
            maxWidth: '100%',
            borderRadius: 2,
            p: 1,
            mb: 1,
            margin: message.isOwnMessage ? [1, 1, 1, 0] : [1, 0, 1, 1]
          }}
        >
          <Typography variant="body1">{message.username}</Typography>
        </Box>
        {!message.isOwnMessage && (
          <Box
            sx={{
              maxWidth: '80%',
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              p: 1,
              mb: 1,
              margin: 1
            }}
          >
            <Typography variant="body1">{message.text}</Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ChatMessage;