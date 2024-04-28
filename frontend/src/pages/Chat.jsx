import React, { useEffect, useState, useContext } from 'react';
import { Box } from '@mui/material';
import JoinChatRoom from '../components/JoinChatRoom';
import AddChatRoom from '../components/AddChatRoom';
import { SetChatroomsContext } from '../contexts/SetChatroomsContext';
import { setTokenContext } from '../contexts/setTokenContext';


const Chat = () => {
    const [chatrooms, setChatrooms] = useState([]); // Add a useState hook for the chatrooms
    const { token, setToken } = useContext(setTokenContext); // Get the token from the setTokenContext
    const storedData = JSON.parse(localStorage.getItem('token'));
    useEffect(() => {
        
        setToken(storedData);
    }, []);
    useEffect(() => {

        const storedData = JSON.parse(localStorage.getItem('token'));
        if (storedData) {
            console.log(storedData.token);
            // Fetch the chatrooms from the /api/chat/rooms route
            fetch('http://localhost:5000/api/chat/rooms', {
                headers: {
                    'Authorization': `Bearer ${storedData.token}`, // Add the token to the Authorization header as a Bearer token
                },
            })
                .then((response) => response.json())
                .then((data) => setChatrooms(data)) // Update the chatrooms state with the fetched data
                .catch((error) => console.error('Error:', error));
        } else setChatrooms([])

    }, [token]); // Add an empty dependency array so the effect only runs once
    return (
        <SetChatroomsContext.Provider value={setChatrooms}>
            <Box maxHeight="90vh" height="90vh">
                {storedData && storedData.token && <AddChatRoom />}
                <Box display="flex" flexWrap="wrap" overflow="auto" maxHeight="80vh" >
                    {chatrooms.length > 0 ? (
                        chatrooms.map((chatroom) => (
                            <JoinChatRoom key={chatroom.id} chatroom={chatroom} />
                        ))
                    ) : (
                        <p>No chatrooms available.</p>
                    )}
                </Box>
            </Box>
        </SetChatroomsContext.Provider>
    );
};

export default Chat;
