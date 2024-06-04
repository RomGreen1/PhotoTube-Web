import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoItem.css';

function VideoItem({ video }) {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div className="video-item" onClick={handleVideoClick}>
    <div className="video">
      <video>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="">
      <div className="video-meta">
        <img className='video-img' src={video.img} alt={video.title} />
        <div className="video-info">
          <span className="video-title">{video.title}</span>
           <span className="video-author">{video.author}</span>
          <span className="video-date">{video.views} views - {video.time}</span>
        </div>
      </div>
    </div>
  </div>
  
  
  );
}

export default VideoItem;
