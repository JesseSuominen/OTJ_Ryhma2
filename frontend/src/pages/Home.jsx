import React, { useState, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { setTokenContext } from '../contexts/setTokenContext';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function from useNavigate hook
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const { token, setToken } = useContext(setTokenContext);

  const handleLogout = () => {
    setToken(''); // Clear the token from the state
    localStorage.removeItem('token'); // Remove the token from localStorage
  };

  // Function to handle login button click and open login modal
  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  // Function to handle signup button click and open signup modal
  const handleSignupClick = () => {
    setSignupOpen(true);
  };

  const StyledButton = styled(Button)({
    width: 200,
    marginBottom: 10,
  });

  const handleClick = (route) => {
    // Handle button click event to navigate to specific route
    console.log(`Navigating to ${route}`);
    navigate(route); // Use the navigate function to navigate to the specified route
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Welcome to Desktop for Students!
      </Typography>
      <StyledButton variant="contained" color="primary" onClick={() => handleClick('/calendar')}>
        Calendar
      </StyledButton>
      <StyledButton variant="contained" color="primary" onClick={() => handleClick('/chat')}>
        Chat
      </StyledButton>
      {!token ? (
        <>
          {/* Button to trigger login modal */}
          <StyledButton variant="contained" color="primary" onClick={handleLoginClick}>
            Login
          </StyledButton>
          {/* Button to trigger signup modal */}
          <StyledButton variant="contained" color="primary" onClick={handleSignupClick}>
            Sign up
          </StyledButton>
        </>
      ) : (
        <StyledButton variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </StyledButton>
      )}

      <LoginModal open={loginOpen} handleClose={() => setLoginOpen(false)} setToken={setToken} />
      <SignupModal open={signupOpen} handleClose={() => setSignupOpen(false)} setToken={setToken} />
    </Box>
  );
};

export default Home;
