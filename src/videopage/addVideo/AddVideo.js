import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { RiVideoAddLine, RiImageAddLine } from "react-icons/ri";
import './AddVideo.css';

function AddVideo() {
    const { user } = useContext(UserContext);
   
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const newVideo = {
          title: videoTitle,
          author: user.username,
          likes: 0,
          views: 0,
          date: new Date().toLocaleString(),
          imageUrl: thumbnailImage ? URL.createObjectURL(thumbnailImage) : '',
          videoUrl: videoFile ? URL.createObjectURL(videoFile) : '',
        };
    
        try {
          const userId = localStorage.getItem('userId');
          const response = await fetch(`http://localhost:1324/api/users/${userId}/videos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
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
