import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
function AddVideo() { 
    const navigate = useNavigate();
    const [videoDetails, setVideoDetails] = useState({
        title: '',
        author: '',
        views: 0,
        time: new Date().toLocaleString(),
        img: null,
        videoFile: null
    });
 

    const handleInputChange = (event) => {
        setVideoDetails({ ...videoDetails, [event.target.name]: event.target.value });
    };

    const handleFileChange = (event) => {
        if (event.target.name === 'videoFile') {
            setVideoDetails({ ...videoDetails, videoFile: event.target.files[0], videoUrl: URL.createObjectURL(event.target.files[0]) });
        } else if (event.target.name === 'img') {
            setVideoDetails({ ...videoDetails, img: URL.createObjectURL(event.target.files[0]) });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newVideo = {
            id: Date.now(),
            title: videoDetails.title,
            author: videoDetails.author,
            views: 0,
            time: new Date().toLocaleString(),
            img: videoDetails.img,
            videoUrl: videoDetails.videoUrl
        };

        const existingVideos = JSON.parse(sessionStorage.getItem('new_videos')) || [];
        existingVideos.push(newVideo);
        sessionStorage.setItem('new_videos', JSON.stringify(existingVideos));

        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add New Video</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="videoTitle" className="form-label">Video Title:</label>
                    <input type="text" className="form-control" id="videoTitle" name="title" placeholder="Enter title" onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="authorName" className="form-label">Author:</label>
                    <input type="text" className="form-control" id="authorName" name="author" placeholder="Author name" onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="videoFile" className="form-label">Video File:</label>
                    <input type="file" className="form-control" id="videoFile" name="videoFile" accept="video/*" onChange={handleFileChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="thumbnailImage" className="form-label">Thumbnail Image:</label>
                    <input type="file" className="form-control" id="thumbnailImage" name="img" accept="image/*" onChange={handleFileChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Confirm Add</button>
            </form>
        </div>
    );
}

export default AddVideo;
