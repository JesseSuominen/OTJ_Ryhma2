import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Alert } from '@mui/material';

import { setTokenContext } from '../contexts/setTokenContext';
import ErrorPopup from './ErrorPopup';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const LoginModal = ({ open, handleClose, setToken }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorOpen, setErrorOpen] = useState(false);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleSubmit = (event) => {
		event.preventDefault();

		// Make a POST request to the /api/login route with the form contents
		fetch('http://localhost:5000/api/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',

			},
			body: JSON.stringify({ username, password }), // Send the username and password as the request body
		})
			.then((response) => response.json())
			.then((data) => {
				if (!data.token) {
					setErrorOpen(true);
					return; // Exit the function if there is no token
				}
				setToken(data);
				localStorage.setItem('token', JSON.stringify(data)); // Save the token to localStorage
				handleClose(); // Close the modal after the request is successful
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<>
			<Modal open={open} onClose={handleClose}  fullScreen={fullScreen}>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: fullScreen ? '75%' : 400, // Adjust the width based on the screen size
        		height: fullScreen ? '50%' : 'auto', // Adjust the height based on the screen size
						bgcolor: 'background.paper',
						border: '2px solid #000',
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography variant="h6">Login</Typography>
					<TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{ mt: 2 }} />
					<TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mt: 2 }} />
					<Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Login</Button>
				</Box>
			</Modal>
			<ErrorPopup open={errorOpen} handleClose={() => setErrorOpen(false)} />
		</>
	);
};

export default LoginModal;
