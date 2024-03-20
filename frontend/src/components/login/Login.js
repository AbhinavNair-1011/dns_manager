import React, { useState } from 'react';
import axios from 'axios';

import "../login/login.css"
import { Link ,Navigate} from 'react-router-dom';

const Login = () => {
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn,setLoggedIn]= useState(false)
  

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post('https://dns-manager-1.onrender.com/api/login', { email, password });
      console.log('Login successful:', response.data);
      setError("")
      localStorage.setItem("token",response.data.token);
      setLoggedIn(true)
     
    } catch (error) {
        if(error.response.data.status=="failed-user"){
            setError("User Not Found");
        }
        if(error.response.data.status=="failed-password"){

            setError('Invalid password');
        }
       
    }
  };

  return (
    <div className="login-container">
           {loggedIn && <Navigate to="/dashboard"/>}

      <Link to="/" className="register">Register</Link>
          <p className="login-description">Have multiple Domains and are struggling to manage them, Login now and end your worries.</p>

      <form onSubmit={handleSubmit} className='login-form'>
      <h2 className='form-title'>Login</h2>
        <div className='form-group'>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className='invalid' >{error}</p>}
        <button  className="login-button"type="submit">Login</button>
      </form>
    </div>

  );
};

export default Login;
