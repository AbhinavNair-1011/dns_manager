import React, { useContext, useState } from 'react';
import "../dnsForm/addDns.css"
import axios from "axios"
import { AuthContext } from '../../store/authContext';

const AddDns = ({ onSubmit }) => {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('Select');
  const [value, setValue] = useState('');

  const {domainData,setDomainData}= useContext(AuthContext)

  const handleSubmit = async (e) => {

    e.preventDefault()
    const token=localStorage.getItem("token");
    
    if(recordType!="Select"){
      
      let response= await axios.post("https://dns-manager-1.onrender.com/api/add-dns" ,{domain,recordType,value},{
  headers:{
    authorization:token
  }
 });   
 const fetchData= async()=>{
  let response= await axios.get("https://dns-manager-1.onrender.com/api/get-dns", {
      headers:{
          Authorization:token
      }
  })
  setDomainData([...response.data.dnsRecords]);
  
  setDomain('');
  setRecordType('');
  setValue('');
}
fetchData();
 

    }else{

      alert("SELECT RECORD TYPE")
    }
    

   
  };

  return (
    <div className="dnsForm-container">
      <form onSubmit={handleSubmit} className="dns-form">
        <div className="form-group">
          <label htmlFor="domain">Domain Name:</label>
          <input
          placeholder='www.example.com'
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recordType">Record Type:</label>
          <select
            id="recordType"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            required
          >
            <option  disabled>Select</option>
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="value">Value:</label>
          <input
          placeholder='IPv4 or IPv6'
            type="text"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add DNS Record</button>
      </form>
    </div>
  );
};

export default AddDns;
