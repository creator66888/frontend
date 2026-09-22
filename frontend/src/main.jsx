import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './style.css';
import ScrollManager from './components/ScrollManager.jsx';
import Home from './pages/Home.jsx';
import Dentists from './pages/Dentists.jsx';
import Complaints from './pages/Complaints.jsx';
import Confirmation from './pages/Confirmation.jsx';
import Admin from './pages/Admin.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dentists" element={<Dentists />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/secret-admin-page-xyz" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);