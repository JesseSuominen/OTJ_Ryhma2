import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid } from '@mui/material';
import { setTokenContext } from '../contexts/setTokenContext';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const NavigationBar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const { token, setToken } = useContext(setTokenContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(''); // Clear the token from the state
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/')
  };

  return (
    <Box p={2} bgcolor="#f0f0f0">
      <Grid container justifyContent="space-between" alignItems="center">
        {/* Left-aligned items (Home, Calendar, Chat) */}
        <Grid item>
          <Typography variant="h6" component={Link} to='/' style={{ marginRight: '20px' }}>
            Home
          </Typography>
          <Typography variant="h6" component={Link} to='/calendar' style={{ marginRight: '20px' }}>
            Calendar
          </Typography>
          <Typography variant="h6" component={Link} to='/chat'>
            Chat
          </Typography>
        </Grid>

        {/* Right-aligned items (Login/Sign Up or Logout) */}
        <Grid item>
          {!token ? (
            <>
              <Button variant="contained" onClick={() => setLoginOpen(true)} style={{ marginRight: '10px' }}>
                Login
              </Button>
              <Button variant="contained" onClick={() => setSignupOpen(true)}>
                Sign Up
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Modals for Login and Sign Up */}
      <LoginModal open={loginOpen} handleClose={() => setLoginOpen(false)} setToken={setToken} />
      <SignupModal open={signupOpen} handleClose={() => setSignupOpen(false)} setToken={setToken} />
    </Box>
  );
};

export default NavigationBar;
