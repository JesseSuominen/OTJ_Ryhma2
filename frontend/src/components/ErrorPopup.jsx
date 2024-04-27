import React from 'react';
import { Modal, Box, Alert } from '@mui/material';

const ErrorPopup = ({ open, handleClose }) => (
    <Modal open={open} onClose={handleClose}>
        <Box sx={{ padding: 2 }}>
            <Alert severity="error" onClose={handleClose}>
                Authentication failed. Please check your username and password.
            </Alert>
        </Box>
    </Modal>
);

export default ErrorPopup;