import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './components/login-form';
import Signup from './components/signup-form';
import Application from './components/application';
import AuthProvider from './hooks/authProvider';
import { ProtectedRoute } from './components/protected-route';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Signup/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/application" element={<ProtectedRoute><Application/></ProtectedRoute>} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
          
        </div>
      </Router>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} toastStyle={{
          whiteSpace: 'pre-wrap',
        }} />
    </div>
    
  );
}

export default App;

