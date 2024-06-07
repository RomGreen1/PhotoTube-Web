import React, { useState, useEffect, useContext } from 'react';
import { VideosContext } from '../context/VideosContext';
import { RiVideoAddLine, RiImageAddLine } from "react-icons/ri";
import './UpdateVideoModal.css';

function UpdateVideoModal({ show, onClose, video }) {
  const { updateVideo } = useContext(VideosContext);
  const [videoTitle, setVideoTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (video) {
      setVideoTitle(video.title);
      setAuthorName(video.author);
    }
  }, [video]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedVideo = {
      ...video,
      title: videoTitle,
      author: authorName,
      img: thumbnailImage ? URL.createObjectURL(thumbnailImage) : video.img,
      videoUrl: videoFile ? URL.createObjectURL(videoFile) : video.videoUrl,
    };

    updateVideo(updatedVideo);
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="update-video-form">
          <h3>Update Video</h3>
          <div className="form-group">
            <label>Video Title:</label>
            <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>
              Video:
            </label>
            <span>
              <input type="file" id="videoFile" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} hidden />
              <label htmlFor="videoFile"><RiVideoAddLine size={40} /></label>
              <span> {videoFile ? videoFile.name : video.videoUrl}</span>
            </span>
        
          </div>
          <div className="form-group">
            <label>
              Image:
            </label>
            <span>
              <input type="file" id="thumbnailImage" accept="image/*" onChange={(e) => setThumbnailImage(e.target.files[0])} hidden />
              <label htmlFor="thumbnailImage"><RiImageAddLine size={40} /></label>
              <span> {thumbnailImage ? thumbnailImage.name : video.img}</span>
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
