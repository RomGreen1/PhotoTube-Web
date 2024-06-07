import React, { createContext, useState } from 'react';
import jsonVideos from '../videos/videos_db.json';
import { useNavigate } from 'react-router-dom';

export const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  // Initialize videos state with data from jsonVideos
  const [videos, setVideos] = useState(jsonVideos);
  
  // Initialize highestId state with the highest id from jsonVideos or default to 22
  const [highestId, setHighestId] = useState(() => {
    const maxId = jsonVideos.reduce((max, video) => (video.id > max ? video.id : max), 0);
    return maxId || 22;
  });

  // Function to add a new video
  const addVideo = (video) => {
    const newId = highestId + 1;
    setVideos((prevVideos) => [...prevVideos, { ...video, id: newId }]);
    setHighestId(newId);
  };

  // Function to update an existing video
  const updateVideo = (updatedVideo) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
    );
  };
  const navigate = useNavigate();
  // Function to delete a video by id
  const deleteVideo = (videoId) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
    navigate('/');
    
  };

  return (
    <VideosContext.Provider
      value={{
        videos,
        addVideo,
        updateVideo,
        deleteVideo,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};
