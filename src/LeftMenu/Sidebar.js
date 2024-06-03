import React,{useContext} from 'react';

import './Sidebar.css'; // Assuming you have some CSS for styling
import { FaHome, FaUser } from 'react-icons/fa';
import { MdExplore, MdSubscriptions, MdAssignmentInd ,MdOutlineDarkMode,MdDarkMode} from 'react-icons/md';
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { DarkModeContext } from '../DarkModeContext';

function Sidebar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => navigate('/')}>
          <a>
            <FaHome size={20} />
          </a>
          <span>Home</span>
        </li>
        <li onClick={toggleDarkMode}>
                 <a>   {darkMode ? <MdOutlineDarkMode size={20} /> : <MdDarkMode size={20} />}</a><span>{darkMode ? 'Dark' : 'Light'}</span>
                </li>
        <li>
          <a>
            <MdExplore size={20} />
          </a>
          <span>Explore</span>
        </li>
        <li>
          <a>
            <MdSubscriptions size={20} />
          </a>
          <span>Subscriptions</span>
        </li>
      
      
      
      
    <li onClick={() => user ? handleLogout() : navigate('/signin')}>  
    
       <a> {user ? <FiLogOut size={20} /> : <FiLogIn size={20} />}</a>
       <span>{user ? 'Logout' : 'Login'}</span>
    
</li>
{!user && (
    <li onClick={() => navigate('/register')}>
       
        <a><MdAssignmentInd size={20} /></a>
        <span>Register</span>
      
    </li>
)}
{user && (
    <li>
        <div className="icon-container-user-info">
            <img src={user.picture} alt="User" className="user-avatar" />
            <span>{user.username}</span>
        </div>
    </li>
)}
      </ul>
    </div>
  );
}

export default Sidebar;
