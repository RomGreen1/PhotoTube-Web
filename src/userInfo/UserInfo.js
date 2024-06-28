import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiImageAddLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { UserContext } from '../context/UserContext';
import ConfirmationModal from '../confirmModal/ConfirmationModal';
import './UserInfo.css';

function UserInfo() {
    const { user, logout, setUser, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [profileImgPreview, setProfileImgPreview] = useState(''); // Start with empty string
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        username: '',
        displayname: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        profileImg: '',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user) {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                try {
                    const userDetailsResponse = await fetch(`http://localhost:1324/api/users/info/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!userDetailsResponse.ok) {
                        throw new Error('Failed to fetch user details');
                    }

                    const userDetailsJson = await userDetailsResponse.json();
                    setFormData({
                        username: userDetailsJson.username,
                        displayname: userDetailsJson.displayname || '',
                        email: userDetailsJson.email || '',
                        password: userDetailsJson.password,
                        confirmPassword: '',
                        gender: userDetailsJson.gender,
                        profileImg: userDetailsJson.profileImg || '',
                    });

                    setProfileImgPreview(userDetailsJson.profileImg || ''); // Ensure profileImg is not null
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            } else {
                navigate('/');
            }
        };

        if (!loading) {
            fetchUserDetails();
        }
    }, [user, navigate, loading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith('image/')) {
            setErrors({ ...errors, profileImg: 'Please upload a valid image file.' });
            return;
        }
        setThumbnailImage(file);
        setErrors({ ...errors, profileImg: '' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, displayname, email, password, confirmPassword, gender, profileImg } = formData;

        // Validate inputs
        const errors = {};
        if (!displayname) errors.displayname = 'Display name is required.';
        if (!email) errors.email = 'Email is required.';
        if (!username) errors.username = 'Username is required.';
        if (!gender) errors.gender = 'Gender is required.';
        if (!password) errors.password = 'Password is required.';
        else if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) errors.password = 'Password must be at least 8 characters and include both letters and digits.';
        if (!confirmPassword) errors.confirmPassword = 'Confirm password is required.';
        else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
        if (!profileImg && !thumbnailImage) errors.profileImg = 'Profile image is required.';

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        // Create a FormData object to send the data
        const formDataToSend = new FormData();
        formDataToSend.append('username', username);
        formDataToSend.append('password', password);
        formDataToSend.append('displayname', displayname);
        formDataToSend.append('email', email);
        formDataToSend.append('gender', gender);
        if (thumbnailImage) {
            formDataToSend.append('profileImg', thumbnailImage);
        }

        try {
            const response = await fetch(`http://localhost:1324/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend,
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser.user);
                alert('User updated successfully!');
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        if (thumbnailImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImgPreview(reader.result);
            };
            reader.readAsDataURL(thumbnailImage);
        } else {
            setProfileImgPreview(formData.profileImg || ''); // Use formData.profileImg
        }
    }, [thumbnailImage, formData.profileImg]);

    const handleDelete = () => {
        setShowModal(true);
    };

    const confirmDelete = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:1324/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('User deleted successfully');
                logout(); // Log out the user and navigate to sign-in page
            } else {
                console.error('Failed to delete user');
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred. Please try again.');
        }
        logout();
        setShowModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching user details
    }

    return (
        <div className="user-info-container">
            <form onSubmit={handleSubmit} className="user-info-form">
                <h3>User Info</h3>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={formData.username} readOnly />
                </div>
                <div className="form-group">
                    <label>Display Name:</label>
                    <input
                        type="text"
                        name="displayname"
                        value={formData.displayname}
                        onChange={handleChange}
                    />
                    {errors.displayname && <div className="error-message">{errors.displayname}</div>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
                <div className="form-group">
                    <label>Gender:</label>
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
                    {errors.gender && <div className="error-message">{errors.gender}</div>}
                </div>
                <div className="form-group">
                    <label>ProfileImg:</label>
                    <div>
                        <img src={profileImgPreview} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    </div>
                    <span>
                        <label htmlFor="thumbnailImage"><RiImageAddLine size={40} /></label>
                        <input type="file" id="thumbnailImage" accept="image/*" hidden onChange={handleImageChange} />
                        <span>{thumbnailImage ? thumbnailImage.name : 'No file chosen'}</span>
                    </span>
                    {errors.profileImg && <div className="error-message">{errors.profileImg}</div>}
                </div>
                <div className="button-group">
                    <button type="submit" className="btn-confirm">Update</button>
                    <span onClick={handleDelete}><MdDeleteOutline size={40} /></span>
                </div>
            </form>
            <ConfirmationModal show={showModal} onClose={cancelDelete} onConfirm={confirmDelete} name="user" />
        </div>
    );
}

export default UserInfo;
