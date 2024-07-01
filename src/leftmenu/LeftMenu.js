import React, { useContext } from 'react';
import './LeftMenu.css';
import { FaHome} from 'react-icons/fa';
import { MdOutlineDarkMode, MdDarkMode, MdAssignmentInd, MdAdd } from 'react-icons/md';
import { ImProfile } from "react-icons/im";
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
    };

    const handleUserClick = () => {
        const userId = localStorage.getItem('userId');
        navigate(`/userPage/${userId}`);
    
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
                {user && (
                <li onClick={() =>  navigate('/userInfo')}>
                    <div className="icon-container">
                        <ImProfile className='icon' /><span>Profile</span>
                    </div>
                </li>
                )}
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
                            <div className="icon-container-user-info" onClick={handleUserClick}>
                                <img style={{ marginLeft: '0.5em' }} src={`http://localhost:${user.profileImg}`}  className="user-avatar" />
                                <span style={{ paddingLeft: '12px' }}>{user.displayname}</span>
                            </div>
                        </li>

                    </>
                )}
            </ul>
        </div>
    );
}

export default LeftMenu;
