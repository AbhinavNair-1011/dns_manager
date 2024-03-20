import React, { useContext } from 'react'
import "./closeButton.css"
import axios from "axios"
import {AuthContext} from "../../../store/authContext"

const CloseButton = () => {
  const {domianData,setDomainData} =useContext(AuthContext)
  
const handler = async(e)=>{
const hostId=e.target.parentElement.id;

const token=localStorage.getItem("token")

await axios.delete(`https://dns-manager-1.onrender.com/api/delete-dns/${hostId}`,{
  headers:{
    authorization:token
  }
})
const fetchData= async()=>{
  let response= await axios.get("https://dns-manager-1.onrender.com/api/get-dns", {
      headers:{
          Authorization:token
      }
  })
  setDomainData([...response.data.dnsRecords]);
}
fetchData();
}

  return (
    <button className='dns-delete-button' onClick={handler}>Delete</button>
  )
}

export default CloseButton