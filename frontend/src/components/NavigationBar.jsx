import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const NavigationBar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/calendar'>Calendar</Link></li>
          <li><Link to='/chat'>Chat</Link></li>
          <li><Button onClick={() => setLoginOpen(true)}>Login</Button></li>
          <li><Button onClick={() => setSignupOpen(true)}>Sign Up</Button></li>
        </ul>
      </nav>
      <LoginModal open={loginOpen} handleClose={() => setLoginOpen(false)} />
      <SignupModal open={signupOpen} handleClose={() => setSignupOpen(false)} />
    </>
  );
};

export default NavigationBar;