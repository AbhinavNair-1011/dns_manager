import React from 'react'
import "./content.css"
import {createBrowserRouter,RouterProvider,Outlet, Link} from "react-router-dom"
import Register from "./register/Register"
import Login from "./login/Login"
import Dashboard from './dashboard/Dashboard'





const Content = () => {
  
 
  const router= createBrowserRouter([
    
    {
      path:"/",
      element:<Register/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/dashboard",
      element:<Dashboard/>
    }
  ])


  
  return (
    <main className="main">   
 <RouterProvider router={router}/>
     </main>
  )
}

export default Content