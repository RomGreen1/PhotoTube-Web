// AppContent.js
import React, { useEffect, useContext,useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './signIn/SignIn';
import RegisterPage from './Registration/RegistrPage';
import HomePage from './Home/Home';
import VideoPage from './VideoPage/VideoPage';
import { DarkModeContext } from './DarkModeContext';
import LeftMenu from './LeftMenu/LeftMenu';
import Sidebar from './LeftMenu/Sidebar'; // Assuming you have a Sidebar component
import './App.css';
import './AppContent.css';

function AppContent() {
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);
    const [menuOpen, setMenuOpen] = useState(false);
    
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.getElementById('Rou').className = menuOpen ? 'close' : 'open';
  };
    return (
        <div id="" className="app">
                <span className="menu-toggle" onClick={toggleMenu}>
        ☰
      </span>
      <div className={`left-menu-in ${menuOpen ? 'close' : 'open'}`}>
      <Sidebar/>
      </div>
      <div className={`left-menu ${menuOpen ? 'open' : 'close'}`}>
        <LeftMenu />
      </div>
      <div id="Rou">
            <Routes>
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
            </div>
        </div>
    );
}

export default AppContent;
