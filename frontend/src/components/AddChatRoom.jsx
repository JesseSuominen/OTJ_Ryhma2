import React, { useState, useContext } from 'react';
import { Button, Typography, TextField, Box, Modal } from '@mui/material';
import { SetChatroomsContext } from '../contexts/SetChatroomsContext';

const AddChatRoomModal = ({ open, handleClose }) => {
  const [name, setName] = useState(''); // Add a useState hook for the name input
  const [description, setDescription] = useState(''); // Add a useState hook for the description input
  const setChatrooms = useContext(SetChatroomsContext);
  const handleSubmit = (event) => {
    event.preventDefault();

        // Make a POST request to the /api/chat route with the form contents
        const storedData = JSON.parse(localStorage.getItem('token'));
        fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedData.token}`
            },
            body: JSON.stringify({ name, description }), // Send the name and description as the request body
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                fetch('http://localhost:5000/api/chat/rooms', {
                    headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedData.token}`
            },
                })
                    .then((response) => response.json())
                    .then((data) => setChatrooms(data)) // Update the chatrooms state with the fetched data
                    .catch((error) => console.error('Error:', error));
                handleClose(); // Close the modal after the request is successful
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a new chat room
        </Typography>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2, }}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

const AddChatRoom = () => {

  const [open, setOpen] = useState(false);


  const handleAddChatRoom = () => {
    setOpen(true); // Open the modal when the button is clicked
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  return (
    <Box display="flex" justifyContent="space-between" marginTop={4} marginBottom={4} alignItems="center" width="100%">
      <Box display="flex" justifyContent="center" flexGrow={1}>
        <Typography variant="h3" component="h1">Chatrooms</Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleAddChatRoom} sx={{marginRight: 2}}>
        Add Chatroom
      </Button>
      <AddChatRoomModal open={open} handleClose={handleClose} />
    </Box>


  );
};

export default AddChatRoom;