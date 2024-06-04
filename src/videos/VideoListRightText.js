// VideoList.js
import React from 'react';
import VideoItemRightText from '../videoitem/VideoItemRightText';
import './VideoList.css';

function VideoListRightList ({ videos }) {
  return (
    <div className="video-list-right">
      {videos.map(video => (
        <VideoItemRightText key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoListRightList;
