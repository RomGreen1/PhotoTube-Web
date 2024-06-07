// RegistrPage.js
import { useNavigate } from 'react-router-dom';
import { UsersContext  } from '../context/UsersContext';
import { UserContext  } from '../context/UserContext';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import './RegisterPage.css';
import React, { useState, useEffect, useContext } from 'react';

function RegisterPage() {
    const { addUser,getUser } = useContext(UsersContext);
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
    useEffect(() => {
        if (user) {
            navigate('/');
        }

    }, []);

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, username, email, gender, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            alert('Password must be at least 8 characters and include both letters and digits.');
            return;
        }
        const existingUser = getUser(username);
        if (existingUser) {
            alert('Username already exists');
            return;
        }
        const newUser = { username, password, name: `${firstName} ${lastName}`, picture: imagePreviewUrl };
        addUser(newUser);
        navigate('/signin');
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
