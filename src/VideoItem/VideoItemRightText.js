import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoItemRightText.css'; // Assuming you have some CSS for styling

function VideoItemRightText({ video }) {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div className="video-item-right-text" onClick={handleVideoClick}>
      <div className="video-thumbnail">
        <video>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-details-right">
        <span className="video-title-right">{video.title}</span>
        <span className="video-author">{video.author}</span>
        <span className="video-stats">{video.views} views - {video.time}</span>
      </div>
    </div>
  );
}

export default VideoItemRightText;
