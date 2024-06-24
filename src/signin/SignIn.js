import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { UserContext } from '../context/UserContext'
import Logo from '../icons/Logo'
import MailIcon from '../icons/MailIcon'
import PasswordIcon from '../icons/PasswordIcon'
function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const handleSignIn = async (e) => {
        e.preventDefault();
         // Check if username or password are empty
         if (!username || !password) {
            alert('fields cannot be empty.');
            return;
        }
        const user = {
            username,
            password
        };
        
        const loginResponse = await fetch('http://localhost:1324/api/users/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
    
        const loginData = await loginResponse.json();
       
        if (loginData.token && loginData.result === 'Success' ) {
                localStorage.setItem('userId', loginData.userId);
                localStorage.setItem('token', loginData.token);
                const userDetailsResponse = await fetch(`http://localhost:1324/api/users/${loginData.userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${loginData.token}`,
                    },
                });
                if (!userDetailsResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const userDetailsJson = await userDetailsResponse.json();
                login(userDetailsJson);
                alert('Successful Login');
                    navigate('/'); // Redirect to home or dashboard page
            } 
            else{
                alert('Invalid username or password');          
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
