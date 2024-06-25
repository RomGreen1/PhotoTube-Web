import React, { useState, useEffect } from 'react';
import { RiVideoAddLine } from "react-icons/ri";
import './UpdateVideoModal.css';

function UpdateVideoModal({ show, onClose, pid, id, video,onUpdate  }) {
  const [videoTitle, setVideoTitle] = useState(video.title);
  const [videoFile, setVideoFile] = useState(null);
  const [videoBase64, setVideoBase64] = useState(video.videoUrl);

  useEffect(() => {
    if (video) {
      setVideoTitle(video.title);
      setVideoBase64(video.videoUrl);
    }
  }, [video]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setVideoBase64(reader.result);
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    const updatedVideoData = {
      title: videoTitle,
      videoUrl: videoBase64,
    };

    try {
      const response = await fetch(`http://localhost:1324/api/users/${id}/videos/${pid}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVideoData),
      });

      if (!response.ok) {
        throw new Error('Failed to update video');
      }

      const updatedVideo = await response.json();
      onUpdate(updatedVideo);
      alert('Updated Successfully');     
      onClose();
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-content">
        <form onSubmit={handleSubmit} className="update-video-form">
          <h3>Update Video</h3>
          <div className="form-group">
            <label>Video Title:</label>
            <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>
              Video:
            </label>
            <span>
              <input type="file" id="videoFile" accept="video/*" onChange={handleFileChange} hidden />
              <label htmlFor="videoFile"><RiVideoAddLine size={40} /></label>
              <span> {videoFile ? videoFile.name : 'Click to change the video'}</span>
            </span>
          </div>
          <div className="button-group">
            <button type="submit" className="btn-confirm">Update Video</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateVideoModal;
