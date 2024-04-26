import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JoinChatRoom = ({ chatroom }) => {
  const navigate = useNavigate();

  const joinChatRoom = (id) => {
    navigate(`/chat/room/${id}`);
  }

  return (
    <Card key={chatroom.id} sx={{ width: 'fit-content', backgroundColor: '#f5f5f5', color: '#333', margin: 1 }}>
      <CardContent>
        <Typography variant="h5" component="h2">{chatroom.name}</Typography>
        <Typography variant="body2" component="p">{chatroom.description}</Typography>
        <Button sx={{marginTop: 2}} variant="contained" color="primary" onClick={e => joinChatRoom(chatroom.id)}>Join</Button>
      </CardContent>
    </Card>
  );
};

export default JoinChatRoom;