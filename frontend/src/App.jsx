import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import Calendar from './pages/Calendar'
import Chat from './pages/Chat'
import Home from './pages/Home'
import RootLayout from './pages/RootLayout'
import ChatRoom from './pages/ChatRoom'
import { setTokenContext } from './contexts/setTokenContext'
import { subDays } from 'date-fns'

const router = createBrowserRouter([
  { path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home/>},
      { path: '/calendar', element: <Calendar events={[
        {date: subDays(new Date(),6), title: "Meeting"},
        {date: subDays(new Date(),1), title: "Coding"},
        {date: subDays(new Date(),3), title: "Ready?"},
      ]}/>},
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
