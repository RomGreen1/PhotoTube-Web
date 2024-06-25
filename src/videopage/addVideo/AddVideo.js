import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { RiVideoAddLine, RiImageAddLine } from "react-icons/ri";
import './AddVideo.css';

function AddVideo() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [videoTitle, setVideoTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);

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
                    <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Video:</label>
                    <span>
                        <input type="file" id="videoFile" accept="video/*" hidden onChange={(e) => setVideoFile(e.target.files[0])} />
                        <label htmlFor="videoFile"><RiVideoAddLine size={40} /></label>
                        <span>{videoFile ? videoFile.name : 'No file chosen'}</span>
                    </span>
                </div>
                <div className="button-group">
                    <button type="submit" className="btn-confirm">Confirm Add <RiVideoAddLine /></button>
                </div>
            </form>
        </div>
    );
}

export default AddVideo;
