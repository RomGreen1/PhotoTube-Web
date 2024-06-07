import React, { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext';

export const LikesContext = createContext();

export const LikesProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);
  const { user } = useContext(UserContext);

  const handleLike = (videoId) => {
    if (!user) {
      alert("You must be logged in to like videos.");
      return;
    }

    setLikes(prevLikes => {
      const newLikes = [...prevLikes];
      let videoLikes = newLikes.find(video => video.id === videoId);

      if (!videoLikes) {
        videoLikes = { id: videoId, count: 0, likes: [], dislikes: [] };
        newLikes.push(videoLikes);
      }
      if (videoLikes.likes.includes(user.username)) {
        // Undo like
        videoLikes.count -= 1;
        videoLikes.likes = videoLikes.likes.filter(username => username !== user.username);
      } else {
        // Add like
        videoLikes.count += videoLikes.dislikes.includes(user.username) ? 2 : 1;
        videoLikes.likes.push(user.username);
        videoLikes.dislikes = videoLikes.dislikes.filter(username => username !== user.username);
      }

      return newLikes.map(video => video.id === videoId ? videoLikes : video);
    });
  };

  const handleDislike = (videoId) => {
    if (!user) {
      alert("You must be logged in to dislike videos.");
      return;
    }

    setLikes(prevLikes => {
      const newLikes = [...prevLikes];
      let videoLikes = newLikes.find(video => video.id === videoId);

      if (!videoLikes) {
        videoLikes = { id: videoId, count: 0, likes: [], dislikes: [] };
        newLikes.push(videoLikes);
      }

      if (videoLikes.dislikes.includes(user.username)) {
        // Undo dislike
        videoLikes.count += 1;
        videoLikes.dislikes = videoLikes.dislikes.filter(username => username !== user.username);
      } else {
        // Add dislike
        videoLikes.count -= videoLikes.likes.includes(user.username) ? 2 : 1;
        videoLikes.dislikes.push(user.username);
        videoLikes.likes = videoLikes.likes.filter(username => username !== user.username);
      }

      return newLikes.map(video => video.id === videoId ? videoLikes : video);
    });
  };

  return (
    <LikesContext.Provider value={{ likes, handleLike, handleDislike }}>
      {children}
    </LikesContext.Provider>
  );
};
