import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoItem.css'; // Assuming you have some CSS for styling

function VideoItem({ video }) {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div className="video-item" onClick={handleVideoClick}>
      <div className="video">
        <video >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div>
        {/* <img src={video.img} alt={video.title} /> */}
        <span>{video.title}</span>
      </div>
      <div>
        <p>{video.author}</p>
        <p>{video.views} views - {video.time}</p>
      </div>
    </div>
  );
}

export default VideoItem;
