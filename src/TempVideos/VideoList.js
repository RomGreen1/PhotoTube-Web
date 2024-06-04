// VideoList.js
import React from 'react';
import VideoItem from '../videoItem/VideoItem.js';
import './VideoList.css';

function VideoList({ videos }) {
  return (
    <div className="video-list">
      {videos.map(video => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoList;
