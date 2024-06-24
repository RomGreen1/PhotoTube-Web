// RegistrPage.js
import { useNavigate } from 'react-router-dom';
import { UserContext  } from '../context/UserContext';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import './RegisterPage.css';
import React, { useState, useEffect, useContext } from 'react';

function RegisterPage() {
    
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        gender: '',
        password: '',
        confirmPassword: '',
        picture: null,
    });
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    useEffect(() => {
        if (user) {
            navigate('/signin');
        }

    }, []);

   
    async function isExist (username) {
        try{
            
            const response = await fetch(`http://localhost:1324/api/users/isExist?username=${username}`);
            const isExistValue = await response.json();

            if (!response.ok) throw new Error(isExistValue.message || 'Error checking username');
            console.log(isExistValue)
            return isExistValue.exists;
        }
        catch(error){
            console.error('Error:', error)
            return true; // Return true to block registration if there's an error
        }
    }

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "picture" && files.length > 0) {
            const file = files[0];
            setFormData(prev => ({
                ...prev,
                [name]: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, username, email, gender, password, confirmPassword ,picture} = formData;

            // Check if all fields are filled
            if (!firstName || !lastName || !username || !email || !gender || !password || !confirmPassword || !picture ) {
                alert('You have to fill all the fields.');
                return;
            }
            // check password == confirm password
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            // Validation for username length
            if (username.length < 4) {
                alert('Username must be at least 4 characters long.');
                return;
            }
    
            // Validation for password complexity
            if (!password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
                alert('Password must contain at least 1 number and 1 letter.');
                return;
            }
            // check if password has at least 8 characters and include both letters and digits.
            if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
                alert('Password must be at least 8 characters and include both letters and digits.');
                return;
            }
            if (await isExist(username)) {
                alert('Username exists or there was an error, registration is blocked');
                return;
            }
            else
            {
                 // Proceed to create new user
                const newUser = {
                    username,
                    password,
                    displayname: `${firstName} ${lastName}`,
                    gender,
                    profileImg: imagePreviewUrl
                };
                try{
                    const response = await fetch('http://localhost:1324/api/users', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newUser),
                      });
                      const data = await response.json();

                      if (response.ok) {
                        alert('Registration successful!');
                        navigate('/signin');
                        
                      } else {
                        console.error('Registration error:', data);
                        alert('An error occurred. Please try again.');
                      }
                }
                catch(error)
                {
                    console.error('There was an error!', error);
                    alert('An error occurred. Please try again.');
                }
            }
        
    };

    return (
        <div className="wrapper">
            <div className="inner">
                <form className='register-form' onSubmit={handleSubmit}>
                    <h3>Registration Form</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="form-input"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="form-input"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-wrapper">
                        <input
                            type="text"
                            placeholder="Username"
                            className="form-input"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <i className="zmdi zmdi-account"></i>
                    </div>
                    <div className="form-wrapper">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="form-input"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <i className="zmdi zmdi-email"></i>
                    </div>
                    <div className="form-wrapper">
                        <select
                            name="gender"
                            className="form-input"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-wrapper">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-input"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <i className="zmdi zmdi-lock"></i>
                    </div>
                    <div className="form-wrapper">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-input"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <i className="zmdi zmdi-lock"></i>
                    </div>
                    <div className="form-wrapper">
                        <input
                            type="file"
                            name="picture"
                            onChange={handleChange}
                        />
                        {imagePreviewUrl && (
                            <img
                                src={imagePreviewUrl}
                                alt="Preview"
                                style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px' }}
                            />
                        )}
                    </div>
                    <button className='register-button' type="submit">
                        Register
                        <i className="zmdi zmdi-arrow-right"></i>
                    </button>
                    <div className="footer">
                        <span onClick={() => navigate('/signin')}>Sign In</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
