import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import "../logout/logout.css"

const Logout = () => {
   const [loggedOff,setLoggedOff]=useState(false);
    const handler=()=>{

        setLoggedOff(true);
        localStorage.removeItem("token")
    }
  return (
   <button className='logout-button' onClick={handler}>
    {loggedOff ? < Navigate to="/login"/> : ""}
    Logout
   </button>
  )
}

export default Logout