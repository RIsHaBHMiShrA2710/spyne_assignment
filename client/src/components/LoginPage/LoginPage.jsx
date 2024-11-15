import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';
import './LoginPage.css'; 
const LoginPage = () => {
  const { user, login, logout } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        const response = await axios.post('http://localhost:8000/api/auth/create_user', { name, username, password });
        login(response.data.jwtToken, response.data.user);
      } else {
        const response = await axios.post('http://localhost:8000/api/auth/login', { username, password });
        login(response.data.jwtToken, response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setUsername('');
    setPassword('');
    setName('');
    setError('');
  };

  return (
    <div className="login-container">
      <h1>{user ? 'Welcome!' : isRegistering ? 'Register' : 'Login'}</h1>

      {user ? (
        <div>
          <p>You are logged in as <strong>{user.username}</strong>.</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}

      {!user && (
        <button className="toggle-mode" onClick={toggleMode}>
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
      )}
    </div>
  );
};

export default LoginPage;
