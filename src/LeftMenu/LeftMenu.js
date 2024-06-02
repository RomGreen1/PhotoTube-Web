import React from 'react';
import './LeftMenu.css';
import { FaHome, FaUser } from 'react-icons/fa';
import { MdExplore, MdSubscriptions, MdAssignmentInd } from 'react-icons/md';
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function LeftMenu({ isOpen }) {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={`left-menu ${isOpen ? 'open' : ''}`}>
            <ul>
                <li>
                    <div className="icon-container" onClick={() => navigate('/')}>
                        <FaHome size={20} /><span>Home</span>
                    </div>
                </li>
                <li>
                    <div className="icon-container">
                        <MdExplore size={20} /><span>Explore</span>
                    </div>
                </li>
                <li>
                    <div className="icon-container">
                        <MdSubscriptions size={20} /><span>Subscriptions</span>
                    </div>
                </li>
                <li>
                    <div className="icon-container" onClick={() => user ? handleLogout() : navigate('/signin')}>
                        {user ? <FiLogOut size={20} /> : <FiLogIn size={20} />}<span>{user ? 'Logout' : 'Login'}</span>
                    </div>
                </li>
                {!user && (
                    <li>
                        <div className="icon-container" onClick={() => navigate('/register')}>
                            <MdAssignmentInd size={20} /><span>Register</span>
                        </div>
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

export default LeftMenu;
