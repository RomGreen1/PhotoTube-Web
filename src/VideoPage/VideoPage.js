import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoContext } from '../Videos/VideoContext';
import VideoList from '../Videos/VideoList';
import LeftMenu from '../LeftMenu/LeftMenu';
import Sidebar from '../LeftMenu/Sidebar';
import SearchBar from '../SearchBar/SearchBar';
import './VideoPage.css';
import VideoComments from './VideoComments';
import { useUser } from '../UserContext';





function VideoPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams();
  const videoData = useContext(VideoContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const videoRef = useRef(null);
  const [likes, setLikes] = useState(() => {
    const initialLikes = sessionStorage.getItem(`likes_${id}`) || 0;
    return parseInt(initialLikes, 10);
  });


  const doSearch = (q) => {
    setVideoList(videoData.filter((video) => video.title.includes(q)));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();
  const videoC = videoData.find(v => v.id === parseInt(id))

  useEffect(() => {
    if (!videoC) {
      navigate('/'); // Navigate to Home page if video is not found
    } else {
      setVideoList(videoData.filter(video => video.id !== videoC.id));
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch((error) => {
          console.error('Auto-play failed:', error);
        });
      }
    }
  }, [videoC, navigate, videoData, id]);

  const handleLike = () => {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    const currentUser = users.find(u => u.username === username && u.password === password);

    console.log(currentUser)

    if (!currentUser) {
      alert("You must be logged in to like videos.");
      return;
    }

    const hasLikedKey = `hasLiked_${id}_${currentUser.username}`;
    const hasLiked = sessionStorage.getItem(hasLikedKey);

    if (!hasLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      sessionStorage.setItem(`likes_${id}`, newLikes.toString());
      sessionStorage.setItem(hasLikedKey, 'true'); // Set flag indicating this user has liked this video
    } else {
      alert("You have already liked this video.");
    }
  };

  if (!videoC) {
    return null; // Return null while redirecting
  }

  return (
      <div className='video-page'>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`left-menu-in ${menuOpen ? 'open' : 'close'}`}>
          <Sidebar />
        </div>
        <div className={`left-menu ${menuOpen ? 'open' : 'close'}`}>
          <LeftMenu />
        </div>
        <div className='div-do-search'>
          <SearchBar doSearch={doSearch} />
        </div>
        <div className='main-content'>
          <div className='video-page-item'>
            <div className="video-player">
              <video ref={videoRef} controls muted autoPlay>
                <source src={videoC.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="video-details">
              <h1>{videoC.title}</h1>
              <p>Author: {videoC.author}</p>
              <p>{videoC.views} views - {videoC.time}</p>
              <button className="btn btn-primary" onClick={handleLike}>Like</button>
              <span> {likes} Likes</span>
            </div>
            <VideoComments videoId={videoC.id} />
          </div>
          <div className="video-bar">
            <VideoList videos={videoList} />
          </div>
        </div>
      </div>
  );
}

export default VideoPage;
