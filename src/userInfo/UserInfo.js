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

    const [formData, setFormData] = useState({
        username: '',
        displayname: '',
        password: '',
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
                        displayname: userDetailsJson.displayname,
                        password: userDetailsJson.password,
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
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setThumbnailImage(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, displayname, password, gender, profileImg } = formData;
        
        // Check if all fields are filled
        if (!displayname || !username || !gender || !password || (!profileImg && !thumbnailImage)) {
            alert('You have to fill all the fields.');
            return;
        }
    
        // Check if password has at least 8 characters and includes both letters and digits.
        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            alert('Password must be at least 8 characters and include both letters and digits.');
            return;
        }
    
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
    
        try {
            let updatedProfileImg = profileImg;
            if (thumbnailImage) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    updatedProfileImg = reader.result;
                    const newUser = {
                        displayname: displayname,
                        password: password,
                        gender: gender,
                        profileImg: updatedProfileImg
                    };
                    const response = await fetch(`http://localhost:1324/api/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser),
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
                };
                reader.readAsDataURL(thumbnailImage);
            } else {
                const newUser = {
                    displayname: displayname,
                    password: password,
                    gender: gender,
                    profileImg: updatedProfileImg
                };
                console.log(newUser);
                const response = await fetch(`http://localhost:1324/api/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser),
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
                    <label>Displayname:</label>
                    <input
                        type="text"
                        name="displayname"
                        value={formData.displayname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
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
