import React from 'react'
import AddDns from './dnsForm/AddDns'
import DnsList from './dnsList/DnsList'
import Logout from "../logout/Logout"

const Dashboard = () => {
  
  return (
    <div className='dashboard-container'>
       <Logout/>
        <  AddDns/>
        <DnsList/>
    </div>
  )
}

export default Dashboard