import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './routers/homePage/homePage.jsx'
import RootLayout from './layouts/rootLayout/rootLayout.jsx'
import DashboardLayout from './layouts/dashboardLayout/dashboardLayout.jsx'
import DashboardPage from './routers/dashboardPage/dashboardPage.jsx'
import ChatPage from './routers/chatPage/chatPage.jsx'
import SignInPage from './routers/signInPage/signInPage.jsx'
import SignUpPage from './routers/signUpPage/signUpPage.jsx'

const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/sign-in/*",
        element: <SignInPage/>
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage/>
      },
      {
        element: <DashboardLayout/>,
        children:[
          {
            path: "/dashboard",
            element: <DashboardPage/>
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage/>
          }
        ]
      }
    ]
  }
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
