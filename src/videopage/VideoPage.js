import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videoss from '../videos/videos_db.json';
import './VideoPage.css';
import VideoComments from './videoComments/VideoComments.js';
import { useUser } from '../context/UserContext';
import { AiOutlineLike, AiTwotoneLike, AiOutlineDislike, AiTwotoneDislike } from "react-icons/ai";
import VideoListRightList from '../videos/VideoListRightText.js'

function VideoPage() {
  const { user } = useUser();
  const { id } = useParams();
  const [videoList, setVideoList] = useState([]);
  const videoRef = useRef(null);
  const [likes, setLikes] = useState(0);
  
  const [hasLiked,setHasLiked] = useState(false);
  const [hasDisLiked,setHasDisLiked] = useState(false);
  
  const navigate = useNavigate();
  const sessionVideos = JSON.parse(sessionStorage.getItem('videos')) || [];
  let videoC;

  if (sessionVideos && Array.isArray(sessionVideos)) {
    videoC = sessionVideos.find(v => v.id === parseInt(id));
  }
  
  if (!videoC) {
    videoC = videoss.find(v => v.id === parseInt(id));
  }

  console.log(videoC);
  useEffect(() => {
    const initialLikes = Number(sessionStorage.getItem(`likes_${id}`)) || 0;
    setLikes(initialLikes);
    if (user) {
      const hasLikedKey = `hasLiked_${id}_${user.username}`;
      const likedStatus = sessionStorage.getItem(hasLikedKey);
      const hasDisLikedKey = `hasdisLiked_${id}_${user.username}`;
      const likedDisStatus = sessionStorage.getItem(hasDisLikedKey);
      setHasLiked(!!likedStatus);
      setHasDisLiked(!!likedDisStatus);
    }
 
    setVideoList(videoss.filter(video => video.id !== videoC.id));
    if (videoRef.current) {
      videoRef.current.src = videoC.videoUrl;
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.error('Auto-play failed:', error);
      });
    }
  }, [id, navigate]);



  const handleLike = (value) => {
    if (!user) {
      alert("You must be logged in to like videos.");
      return;
    }
    const hasLikedKey = `hasLiked_${id}_${user.username}`;
    const hasLiked = sessionStorage.getItem(hasLikedKey);
    const hasDisLikedKey = `hasdisLiked_${id}_${user.username}`;
    const hasDisLiked = sessionStorage.getItem(hasDisLikedKey);
    let newLikes=0;
    if (value === 1) {
      sessionStorage.setItem(`hasLiked_${id}`, newLikes.toString());
      if(hasDisLiked)
        {
          newLikes = likes + 2;      
          sessionStorage.removeItem(hasDisLikedKey);
          setHasDisLiked(false);
        }
        else
        {
          newLikes = likes + 1;   
        }
        setLikes(newLikes);  
        sessionStorage.setItem(`likes_${id}`, newLikes.toString());
        sessionStorage.setItem(hasLikedKey, 'true');
        setHasLiked(true);
    
    }
    else
    {
      newLikes = likes + 1;
      setLikes(newLikes);   
      sessionStorage.setItem(`likes_${id}`, newLikes.toString());
      sessionStorage.removeItem(hasDisLikedKey);
      setHasDisLiked(false);
    }
    
  };

  const handleDislike = (value) => {
    if (!user) {
      alert("You must be logged in to like videos.");
      return;
    }
    const hasLikedKey = `hasLiked_${id}_${user.username}`;
    const hasLiked = sessionStorage.getItem(hasLikedKey);
    const hasDisLikedKey = `hasdisLiked_${id}_${user.username}`;
    const hasDisLiked = sessionStorage.getItem(hasDisLikedKey);
    let newLikes=0;
    if (value === 2) {
      sessionStorage.setItem(`hasdisLiked_${id}`, newLikes.toString());
      if(hasLiked)
        {
          newLikes = likes - 2;      
          sessionStorage.removeItem(hasLikedKey);
          setHasLiked(false);
        }
        else
        {
          newLikes = likes - 1;   
        }
        sessionStorage.setItem(hasDisLikedKey, 'true');
        setHasDisLiked(true);
    
    }
    else
    {
      newLikes = likes - 1;
      sessionStorage.removeItem(hasLikedKey);
      setHasLiked(false);
    }
    setLikes(newLikes);   
    sessionStorage.setItem(`likes_${id}`, newLikes.toString());
  };

  return (
    <div className='video-page'>
      <div className='main-content'>
        <div className='video-page-item'>
          <div className="video-player-page">
           
            <video ref={videoRef} controls muted autoPlay>
              <source src={videoC.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        
          </div>
          <div className="video-details-page">
            <span className='video-title-page'>{videoC.title}</span>
            <div className='video-img-dir-page'>
              <div>
            <img className='video-img-page' src={videoC.img}></img><span> {videoC.author}</span>
            </div>
            <div className="like-dislike-container">
            <div className="like-dislike-button">
                {hasLiked ? 
                  <AiTwotoneLike size={20} onClick={() => handleDislike(1)} /> : 
                  <AiOutlineLike size={20} onClick={() => handleLike(1)} />}
                <span>{likes}</span>
              </div>
              <div className="separator"></div>
              <div className="like-dislike-button">
              {hasDisLiked ? 
                  <AiTwotoneDislike size={20} onClick={() => handleLike(2)} /> : 
                  <AiOutlineDislike size={20} onClick={() => handleDislike(2)} />}
              </div>
              
            </div>
            </div>
          <div className='views-time'>
          <span>{videoC.views} views - {videoC.time}</span>
          </div>
          <div className="video-comments-page">
          <VideoComments videoId={videoC.id} />
          </div>
          </div>

          
        </div>
        <div className="video-bar">
          <VideoListRightList videos={videoList} />
        </div>
      </div>
    </div>
  );
}

export default VideoPage;