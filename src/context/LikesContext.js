import React, { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext';

// Create a context for likes
export const LikesContext = createContext();

export const LikesProvider = ({ children }) => {
  // Initialize the likes state as an empty array
  const [likes, setLikes] = useState([]);
  // Get the user from the UserContext
  const { user } = useContext(UserContext);

  // Function to handle liking a video
  const handleLike = (videoId) => {
    if (!user) {
      alert("You must be logged in to like videos.");
      return;
    }

    setLikes(prevLikes => {
      const newLikes = [...prevLikes];
      let videoLikes = newLikes.find(video => video.id === videoId);

      if (!videoLikes) {
        // Initialize likes data for the video if not present
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

      // Update the likes state with the new like data for the video
      return newLikes.map(video => video.id === videoId ? videoLikes : video);
    });
  };

  // Function to handle disliking a video
  const handleDislike = (videoId) => {
    if (!user) {
      alert("You must be logged in to dislike videos.");
      return;
    }

    setLikes(prevLikes => {
      const newLikes = [...prevLikes];
      let videoLikes = newLikes.find(video => video.id === videoId);

      if (!videoLikes) {
        // Initialize likes data for the video if not present
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

      // Update the likes state with the new dislike data for the video
      return newLikes.map(video => video.id === videoId ? videoLikes : video);
    });
  };

  // Provide the likes state and like/dislike functions to the context consumers
  return (
    <LikesContext.Provider value={{ likes, handleLike, handleDislike }}>
      {children}
    </LikesContext.Provider>
  );
};
