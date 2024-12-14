import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from "react";
import './App.css';
import Home from './components/home/Home';
import Register from './components/registers/Register';
import Login from './components/login/Login';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!localStorage.getItem('token'));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/register' element={<Register />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
    </Routes>
  </Router>
  );
}

export default App;
