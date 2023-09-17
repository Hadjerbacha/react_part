import React, { useState } from 'react'; 
import axios from 'axios'; 
 
function Connect() { 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState( );  
  const [token, setToken] = useState( ); 
 
  const handleLogin = async () => { 
    try { 
      const response = await axios.post('http://localhost:5000/login', { username, password }); 
      setToken(response.data.token); 
    } catch (error) { 
      console.error('Login error:', error); 
    } 
  }; 
 
  const handleLogout = () => { 
    setToken(''); 
  }; 
 
  return ( 
    <div> 
      <h1>Login Page</h1> 
      {!token ? ( 
        <div> 
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /> 
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /> 
          <button onClick={handleLogin}>Login</button> 
        </div> 
      ) : ( 
        <div> 
          <h2>Welcome, {username}!</h2> 
          <button onClick={handleLogout}>Logout</button> 
        </div> 
      )}  
    </div> 
  ); 
} 
 
export default Connect;