import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import KnowMorePage from './components/KnowMorePage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/know-more" element={<KnowMorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
