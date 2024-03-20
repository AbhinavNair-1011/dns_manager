import React, { useState } from 'react';
import axios from "axios"
import "../register/register.css"
import { Link } from 'react-router-dom';

function Register() {
const [validatePassword,setValidatePassword]=useState(true)
const [userExist,setUserExist]=useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(password===confirmPassword ){

      const userDetails={
        name,
        email,
        dob,
        password      
      };
      setValidatePassword(true)
      try{
       let response= await axios.post("https://dns-manager-1.onrender.com/api/addUser",userDetails);

        
      }catch(err){
        if(err.response.status==409){
          setUserExist(true);
        
        }
      }

    }else{
      setValidatePassword(false)
    }
    
   
    
  };

  return (
    <div className="register-container">
            <Link to="/login" className="login">Login</Link>

  <p className="register-description">Have multiple Domains and are struggling to manage them, Register now and end your worries.</p>
  
  <form onSubmit={handleSubmit} className="register-form">
    <h1 className="form-title"> Register now</h1>
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input id="name" required type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input id="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
    </div>
   
    <div className="form-group">
      <label htmlFor="dob">Date of Birth:</label>
      <input id="dob" type="date" required value={dob} onChange={(e) => setDob(e.target.value)} className="form-control" />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
    </div>
    <div className="form-group">
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" />
    </div>
    {!validatePassword ? <p className="invalid">Passwords do not match</p> : ""}
    <button type="submit" className="register-button">Register</button>
  </form>
</div>

  );
}

export default Register;
