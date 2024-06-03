import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useUser } from '../UserContext';
import Logo from '../Icons/Logo'
import MailIcon from '../Icons/MailIcon'
import PasswordIcon from '../Icons/PasswordIcon'
import LeftMenu from '../LeftMenu/LeftMenu';
import Sidebar from '../LeftMenu/Sidebar';
function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
    const handleSignIn = (e) => {
        e.preventDefault();
        const users = JSON.parse(sessionStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            console.log('Login successful');
            setUser(user);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            navigate('/'); // Redirect to home or dashboard page
        } else {
            console.log('Login failed');
            alert('Invalid credentials');
        }
    };



    return (
        <div className="screen-1">
                         <div> 
 <button className="menu-toggle" onClick={toggleMenu}>
 ☰
</button>
<div className={`left-menu-in ${menuOpen ? 'close' : 'open'}`}>
<Sidebar/>
</div>
<div className={`left-menu ${menuOpen ? 'open' : 'close'}`}>
 <LeftMenu />
</div>
</div>
            <form onSubmit={handleSignIn}>
                <Logo />
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
                            type={showPassword ? "text" : "password"}
                            placeholder="············"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    
                    </div>
                </div>
                <button type="submit" className="login">Login</button>
                <div className="footer">
                    <span onClick={() => navigate('/registr')}>Sign up</span>
                    <span >Forgot Password?</span>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
