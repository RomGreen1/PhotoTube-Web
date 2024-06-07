import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { RiVideoAddLine, RiImageAddLine } from "react-icons/ri";
import { VideosContext } from '../../context/VideosContext';
import './AddVideo.css';

function AddVideo() {
    const { user } = useContext(UserContext);
    const { addVideo } = useContext(VideosContext); // Access the addVideo function from the VideosContext
    const navigate = useNavigate();
    const [videoTitle, setVideoTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const newVideo = {
            id: 22, // Example ID, replace with your ID generation logic
            title: videoTitle,
            author: authorName,
            views: 0,
            time: new Date().toLocaleString(),
            img: thumbnailImage ? URL.createObjectURL(thumbnailImage) : '',
            videoUrl: videoFile ? URL.createObjectURL(videoFile) : '',
        };
        
        addVideo(newVideo);
        navigate('/');
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
                    <label>Author:</label>
                    <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Video:</label>
                    <span>
                        <input type="file" id="videoFile" accept="video/*" hidden onChange={(e) => setVideoFile(e.target.files[0])} />
                        <label htmlFor="videoFile"><RiVideoAddLine size={40} /></label>
                        <span>{videoFile ? videoFile.name : 'No file chosen'}</span>
                    </span>
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <span>
                        <input type="file" id="thumbnailImage" accept="image/*" hidden onChange={(e) => setThumbnailImage(e.target.files[0])} />
                        <label htmlFor="thumbnailImage"><RiImageAddLine size={40} /></label>
                        <span>{thumbnailImage ? thumbnailImage.name : 'No file chosen'}</span>
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
