import React from 'react';
import { Box, Typography, Card } from '@mui/material';
{/* <Box key={message.id} display="flex" flexDirection="row" alignItems="center" width="100%" sx={{
            justifyContent:  message.isOwnMessage ? 'end' : 'flex-start'
          }}>
             {message.isOwnMessage && <ChatMessage message={message.text} isOwnMessage={message.isOwnMessage} style={{ flexGrow: 1 }}/>}
            <Box
              sx={{
                maxWidth: '100%',
                backgroundColor: message.isOwnMessage ? 'primary.main' : 'grey.300',
                color: message.isOwnMessage ? 'white' : 'black',
                borderRadius: 2,
                p: 1,
                mb: 1,
                margin: 1
              }}
            >
              <Typography variant="body1">{message.username}</Typography>
            </Box>

            {!message.isOwnMessage && <ChatMessage message={message.text} isOwnMessage={message.isOwnMessage} style={{ flexGrow: 1 }}/>}
          </Box> */}
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
            // backgroundColor: message.isOwnMessage ? 'primary.main' : 'grey.300',
            // color: message.isOwnMessage ? 'white' : 'black',
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