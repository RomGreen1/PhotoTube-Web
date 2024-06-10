import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { UserContext } from '../context/UserContext';
import {UsersContext, users} from '../context/UsersContext'
import Logo from '../icons/Logo'
import MailIcon from '../icons/MailIcon'
import PasswordIcon from '../icons/PasswordIcon'
function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const{getUser} = useContext(UsersContext);
    const handleSignIn = (e) => {
        e.preventDefault();
         // Check if username or password are empty
         if (!username || !password) {
            alert('fields cannot be empty.');
            return;
        }
        const existingUser = getUser(username);
        
        if (existingUser && existingUser.password === password ) {
            login(existingUser); 
          
            navigate('/'); // Redirect to home or dashboard page
        } else {
           
            alert('Invalid credentials');
        }
    };



    return (
        <div className="screen-1">
            <form onSubmit={handleSignIn}>
            <div className="logo-container">
                <Logo />
                </div>
                <div className="email">
                    <label>Email Address</label>
                    <div className="sec-2">
                        <MailIcon />
                        <input
                            type="text"
                            placeholder="Username@gmail.com"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="password">
                    <label>Password</label>
                    <div className="sec-2">
                        <PasswordIcon />
                        <input
                            type="password"
                            placeholder="············"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    
                    </div>
                </div>
                <button type="submit" className="login">Login</button>
                <div className="footer">
                    <span onClick={() => navigate('/registr')} >Sign up</span>
                    <span >Forgot Password?</span>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
