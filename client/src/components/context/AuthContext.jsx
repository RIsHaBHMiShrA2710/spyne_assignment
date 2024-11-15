import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  loginWithGoogle: () => {},
});

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

const initialUser = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.token && isTokenValid(parsedUser.token) ? parsedUser : null;
    } catch {
      return null;
    }
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);

  const login = (jwtToken, userData) => {
    try {
      const userToStore = { token: jwtToken, ...userData };
      setUser(userToStore);
      localStorage.setItem('user', JSON.stringify(userToStore));
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const loginWithGoogle = async (googleToken) => {
    try {
      const response = await apiClient.post('/api/auth/google', { token: googleToken });
      if (response.status === 200) {
        login(response.data.jwtToken, response.data.user);
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
      alert('Failed to log in with Google');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
