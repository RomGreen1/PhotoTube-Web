import React, { useContext } from 'react';

import './Sidebar.css'; // Assuming you have some CSS for styling
import { FaHome, FaUser } from 'react-icons/fa';
import { MdExplore, MdSubscriptions, MdAssignmentInd, MdOutlineDarkMode, MdDarkMode, MdAdd } from 'react-icons/md';
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { DarkModeContext } from '../context/DarkModeContext';
import { SearchContext } from '../context/SearchContext';

function Sidebar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(SearchContext);
  const { user, logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
  };
  const resetSearchAndNavigateHome = () => {
    setSearchQuery(''); // Reset the search query
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={resetSearchAndNavigateHome}>
          <a>
            <FaHome className='icon' />
          </a>
          <span>Home</span>
        </li>
        <li onClick={toggleDarkMode}>
          <a>   {darkMode ? <MdOutlineDarkMode className='icon' /> : <MdDarkMode className='icon' />}</a><span>{darkMode ? 'Dark' : 'Light'}</span>
        </li>
        <li>
          <a>
            <MdExplore className='icon' />
          </a>
          <span>Explore</span>
        </li>
        <li>
          <a>
            <MdSubscriptions className='icon' />
          </a>
          <span style={{ paddingleft: '12px' }}>Subscriptions</span>
        </li>




        <li onClick={() => user ? handleLogout() : navigate('/signin')}>

          <a> {user ? <FiLogOut className='icon' /> : <FiLogIn className='icon' />}</a>
          <span>{user ? 'Logout' : 'Login'}</span>

        </li>
        {!user && (
          <li onClick={() => navigate('/register')}>

            <a><MdAssignmentInd className='icon' /></a>
            <span>Register</span>

          </li>
        )}
        {user && (
          <>
            <li onClick={() => navigate('/addvideo')}>
              <a><MdAdd className='icon' /> </a>
              <span>add Video</span>
            </li>
            <li>
              <div className="icon-container-user-info" onClick={() => navigate('/userInfo')}>
                <img src={`http://localhost:${user.profileImg}`}  className="user-avatar" />
                <span>{user.displayname}</span>
              </div>
            </li>

          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
