import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Calendar from './pages/Calendar'
import Chat from './pages/Chat'
import Home from './pages/Home'
import RootLayout from './pages/RootLayout'
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
    ]  
  }
]);


function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
    
}

export default App
