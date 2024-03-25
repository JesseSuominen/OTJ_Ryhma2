import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'
import Calendar from './pages/Calendar'
import Chat from './pages/Chat'
import Home from './pages/Home'
import RootLayout from './pages/RootLayout'

const router = createBrowserRouter([
  { path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home/>},
      { path: '/calendar', element: <Calendar />},
      { path: '/chat', element: <Chat />},
    ]  
  }
]);


function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
