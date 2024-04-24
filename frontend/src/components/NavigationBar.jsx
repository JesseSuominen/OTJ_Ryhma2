import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

import { setTokenContext } from '../contexts/setTokenContext';

const LoginModal = ({ open, handleClose, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                setToken(data);
                localStorage.setItem('token',  JSON.stringify(data)); // Save the token to localStorage
                handleClose(); // Close the modal after the request is successful
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Modal open={open} onClose={handleClose}>
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
                <Typography variant="h6">Login</Typography>
                <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{ mt: 2 }} />
                <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mt: 2 }} />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Login</Button>
            </Box>
        </Modal>
    );
};




const SignupModal = ({ open, handleClose, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Make a POST request to the /api/signup route with the form contents
        fetch('http://localhost:5000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Send the username and password as the request body
        })
            .then((response) => response.json())
            .then((data) => {
                setToken(data);
                localStorage.setItem('token',  JSON.stringify(data)); // Save the token to localStorage
                handleClose(); // Close the modal after the request is successful
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Modal open={open} onClose={handleClose}>
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
                <Typography variant="h6">Sign Up</Typography>
                <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{ mt: 2 }} />
                <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mt: 2 }} />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Sign Up</Button>
            </Box>
        </Modal>
    );
};


const NavigationBar = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);

    const { token, setToken } = useContext(setTokenContext);

    const handleLogout = () => {
        setToken(''); // Clear the token from the state
        localStorage.removeItem('token'); // Remove the token from localStorage
    };
    return (
        <>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/calendar'>Calendar</Link></li>
                    <li><Link to='/chat'>Chat</Link></li>
                    {!token ? (
                        <>
                            <li><Button onClick={() => setLoginOpen(true)}>Login</Button></li>
                            <li><Button onClick={() => setSignupOpen(true)}>Sign Up</Button></li>
                        </>
                    ) : (
                        <li><Button onClick={handleLogout}>Logout</Button></li>
                    )}
                </ul>
            </nav>
            <LoginModal open={loginOpen} handleClose={() => setLoginOpen(false)} setToken={setToken} />
            <SignupModal open={signupOpen} handleClose={() => setSignupOpen(false)} setToken={setToken}/>
        </>
    );
};

export default NavigationBar;