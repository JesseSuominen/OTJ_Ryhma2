import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react';

import './App.css'
import Calendar from './pages/Calendar'
import Chat from './pages/Chat'
import Home from './pages/Home'
import RootLayout from './pages/RootLayout'
import ChatRoom from './pages/ChatRoom'
import { setTokenContext } from './contexts/setTokenContext'

const router = createBrowserRouter([
  { path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home/>},
      { path: '/calendar', element: <Calendar />},
      { path: '/chat', element: <Chat />},
      { path: '/chat/room/:id', element: <ChatRoom />},
    ]  
  }
]);


function App() {
  const [token, setToken] = useState(''); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
    }
  }, []);

  return (
    <setTokenContext.Provider value={{token, setToken}}>
      <RouterProvider router={router}/>
    </setTokenContext.Provider>
  )
}

export default App
