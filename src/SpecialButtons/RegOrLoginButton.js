import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';  // Ensure the path is correct based on your project structure

function SignOutButton() {
    const { setUser } = useUser();
    let navigate = useNavigate();

    const handleSignOut = () => {
        setUser(null);  // Clear the user context
        navigate('/signin');  // Redirect to sign-in page
    };

    return (
        <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
        </button>
    );
}

export default SignOutButton;
