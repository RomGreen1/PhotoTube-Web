import React, { useContext } from 'react';
import './LeftMenu.css';
import { FaHome, FaUser } from 'react-icons/fa';
import { MdOutlineDarkMode, MdDarkMode, MdExplore, MdSubscriptions, MdAssignmentInd, MdAdd } from 'react-icons/md';
import { DarkModeContext } from '../context/DarkModeContext';
import { SearchContext } from '../context/SearchContext';
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function LeftMenu({ isOpen }) {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const { setSearchQuery } = useContext(SearchContext);
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const resetSearchAndNavigateHome = () => {
        setSearchQuery(''); // Reset the search query
        navigate('/'); // Navigate to the home page
      };

    return (
        <div className={`left-menu ${isOpen ? 'open' : ''}`}>
            <ul>
                <li>
                    <div className="icon-container" onClick={resetSearchAndNavigateHome}>
                        <FaHome className='icon' /><span>Home</span>
                    </div>
                </li>
                <li>
                    <div className="icon-container" onClick={toggleDarkMode}>
                        {darkMode ? <MdOutlineDarkMode className='icon' /> : <MdDarkMode className='icon' />}<span>{darkMode ? 'Dark' : 'Light'}</span>
                    </div>
                </li>
                <li>
                    <div className="icon-container">
                        <MdExplore className='icon' /><span>Explore</span>
                    </div>
                </li>
                <li>
                    <div className="icon-container">
                        <MdSubscriptions className='icon' /><span>Subscriptions</span>
                    </div>
                </li>

                <li>
                    <div className="icon-container" onClick={() => user ? handleLogout() : navigate('/signin')}>
                        {user ? <FiLogOut className='icon' /> : <FiLogIn className='icon' />}<span>{user ? 'Logout' : 'Login'}</span>
                    </div>
                </li>

                {!user && (
                    <li>
                        <div className="icon-container" onClick={() => navigate('/register')}>
                            <MdAssignmentInd className='icon' /><span>Register</span>
                        </div>
                    </li>
                )}
                {user && (
                    <>
                        <li>
                            <div className="icon-container" onClick={() => navigate('/addvideo')}>
                                <MdAdd className='icon' /><span>add Video</span>
                            </div>
                        </li>
                        <li>
                            <div className="icon-container-user-info">
                                <img src={user.picture}  className="user-avatar" />
                                <span>{user.username}</span>
                            </div>
                        </li>

                    </>
                )}
            </ul>
        </div>
    );
}

export default LeftMenu;
