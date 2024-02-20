import React, { useState } from 'react';
import '../styles/auth.css';
import {login} from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/authProvider';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
      const data = await login(username, password);
      if (data && !data.error) {
        setToken(data.access_token);
        navigate('/application');
      }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className = "app-button" type="submit">Login</button>
        <div className="nav-instruction">New here? Please signup.</div>
        <button className="app-button" type="button" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
}

export default Login;
