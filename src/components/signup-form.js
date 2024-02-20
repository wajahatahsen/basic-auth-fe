import React, { useState } from 'react';
import '../styles/auth.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/authProvider';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidPassword) {
        const data = await signup(name, username, email, password);
        if (data && !data.error) {
            setToken(data.access_token);
            navigate('/application');
        }
    } else {
        toast.error('Password must have the following:\n- At least 8 characters\n- At least one letter\n- At least one number\n- At least one special character');
    }
    
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const containsLetter = /[a-zA-Z]/.test(newPassword);
    const containsNumber = /[0-9]/.test(newPassword);
    const containsSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      newPassword
    );

    const isValid =
      newPassword.length >= 8 &&
      containsLetter &&
      containsNumber &&
      containsSpecialChar;

      setIsValidPassword(isValid);
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className = "app-button" type="submit">Sign Up</button>
        <div className="nav-instruction">Already have an account? Please login.</div>
        <button className="app-button" type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Signup;
