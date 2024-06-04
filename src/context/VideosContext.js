import React, { createContext, useState, useEffect } from 'react';

export const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  // Load videos from sessionStorage, assuming successful parsing
  const initialVideos = JSON.parse(sessionStorage.getItem('videos')) || [];
  const [videos, setVideos] = useState(initialVideos);
  const [highestId, setHighestId] = useState(() => {
    const maxId = initialVideos.reduce((max, video) => (video.id > max ? video.id : max), 0);
    return maxId || 22; // Set to 22 if no videos exist initially
  });

  // Save videos to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('videos', JSON.stringify(videos));
  }, [videos]);

  const addVideo = (video) => {
    const newId = highestId + 1; // Generate a new ID by incrementing the highest used ID
    setVideos((prevVideos) => [...prevVideos, { ...video, id: newId }]); // Taking the perv+new video and update his id
    setHighestId(newId); // Update the highest used ID
  };

  //need to check
  const updateVideo = (updatedVideo) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
    );
  };

  //need to check
  const deleteVideo = (videoId) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
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
