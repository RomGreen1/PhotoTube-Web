import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoItem.css';
import { UserContext } from '../context/UserContext';

function VideoItem({ video }) {
  const navigate = useNavigate();
  const {user} = useContext(UserContext); 

  const handleVideoClick = () => {
    navigate(`/video/${video._id}/${video.userId}`);
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleUserClick = () => {
    navigate(`/userPage/${video.userId}`);
  };

  return (
    <div className="video-item" >
    <div className="video">
      <video onClick={handleVideoClick}>
        <source src={`http://localhost:${video.videoUrl}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="">
      <div className="video-meta">
        <img className='video-img' src={`http://localhost:${video.creatorImg}`} onClick={handleUserClick} alt={video.title} />
        <div className="video-info">
          <span className="video-title">{video.title}</span>
           <span className="video-author">{video.createdBy}</span>
          <span className="video-date">{video.views} views - {formatDate(video.date)}</span>
        </div>
      </div>
    </div>
  </div>
  
  
  );
}

export default VideoItem;
