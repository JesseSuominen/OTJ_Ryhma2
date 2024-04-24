import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

import { setTokenContext } from '../contexts/setTokenContext';

import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

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