import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />

      </Routes>
    </Router>
  )
}

export default App
