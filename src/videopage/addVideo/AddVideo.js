import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { RiVideoAddLine } from "react-icons/ri";
import './AddVideo.css';

function AddVideo() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [videoTitle, setVideoTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate inputs
        const errors = {};
        if (!videoTitle.trim()) {
            errors.videoTitle = 'Video title is required.';
        }
        if (!videoFile) {
            errors.videoFile = 'Video file is required.';
        }else if (!videoFile.type.startsWith('video/')) {
            errors.videoFile = 'Please upload a valid video file.';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const newVideo = {
            title: videoTitle,
            views: 0,
        };

        try {
            if (videoFile) {
                newVideo.videoUrl = await readFileAsDataURL(videoFile);
            } else {
                newVideo.videoUrl = '';
            }

            const userId = localStorage.getItem('C');
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:1324/api/users/${userId}/videos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newVideo),
            });
            const data = await response.json();

            if (response.ok) {
                alert('Add successful!');
                navigate('/');
            } else {
                console.error('Adding error:', data);
                alert('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="add-video-container">
            <form onSubmit={handleSubmit} className="add-video-form">
                <h3>Add New Video</h3>
                <div className="form-group">
                    <label>Video Title:</label>
                    <input
                        type="text"
                        value={videoTitle}
                        onChange={(e) => {
                            setVideoTitle(e.target.value);
                            if (e.target.value.trim()) {
                                setErrors({ ...errors, videoTitle: '' });
                            }
                        }}
                    />
                    {errors.videoTitle && <div className="error-message">{errors.videoTitle}</div>}
                </div>
                <div className="form-group">
                    <label>Video:</label>
                    <span>
                        <input
                            type="file"
                            id="videoFile"
                            accept="video/*"
                            hidden
                            onChange={(e) => {
                                setVideoFile(e.target.files[0]);
                                if (e.target.files[0]) {
                                    setErrors({ ...errors, videoFile: '' });
                                }
                            }}
                        />
                        <label htmlFor="videoFile"><RiVideoAddLine size={40} /></label>
                        <span>{videoFile ? videoFile.name : 'No file chosen'}</span>
                    </span>
                    {errors.videoFile && <div className="error-message">{errors.videoFile}</div>}
                </div>
                <div className="button-group">
                    <button type="submit" className="btn-confirm">Confirm Add <RiVideoAddLine /></button>
                </div>
            </form>
        </div>
    );
}

export default AddVideo;
