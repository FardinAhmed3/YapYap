import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import SupportPage from './pages/SupportPage';
import AboutPage from './pages/AboutPage';
import Chat from './pages/Chat';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/support' element={<SupportPage/>} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </Router>
  )
}

export default App
