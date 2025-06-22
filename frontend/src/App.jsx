import { useState } from 'react'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './auth/signup'
import Login from './auth/sign'
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Manager/><Footer/></>
    },
    {
      path:"/login",
      element:<><Navbar/><Login/></>
    },
    {
      path:"/signup",
      element:<><Navbar/><Signup/></>
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
