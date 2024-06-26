import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoItemRightText.css'; // Assuming you have some CSS for styling

function VideoItemRightText({ video }) {
  const navigate = useNavigate();

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

  return (
    <div className="video-item-right-text" >
      <div className="video-thumbnail">
        <video onClick={handleVideoClick}>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-details-right">
        <span className="video-title-right">{video.title}</span>
        <span className="video-author">{video.createdBy}</span>
        <span className="video-stats">{video.views} views</span>
        <span className="video-stats">  {formatDate(video.date)}</span>
      </div>
    </div>
  );
}

export default VideoItemRightText;
