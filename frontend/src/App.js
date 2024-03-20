import { useContext, useEffect } from 'react';
import './App.css';
import axios from "axios"
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthContext } from './components/store/authContext'


function App() { 
 
  const {domainData,setDomainData}= useContext(AuthContext)
  const token= localStorage.getItem("token")

  
useEffect( ()=>{
  const fetchData= async()=>{
      let response= await axios.get("https://dns-manager-1.onrender.com/api/get-dns", {
          headers:{
              Authorization:token
          }
      })
      setDomainData([...response.data.dnsRecords]);
  }
  fetchData();
 

},[])

  return (
    <>

<Header/>
<Content/>
<Footer/>

</>
  )
}

export default App;
