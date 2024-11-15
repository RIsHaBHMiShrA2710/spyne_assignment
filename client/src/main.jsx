import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './components/context/AuthContext';
import './index.css';
import App from './App.jsx';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
