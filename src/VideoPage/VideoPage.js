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
import videos from '../Videos/videos_db.json';


function VideoPage() {
  const [video, setVideo] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const videoRef = useRef(null);
  const [likes, setLikes] = useState(() => {
    const initialLikes = sessionStorage.getItem(`likes_${id}`) || 0;
    return parseInt(initialLikes, 10);
  });


  const doSearch = (q) => {
    setVideoList(videos.filter((video) => video.title.includes(q)));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();


  useEffect(() => {
    // Attempt to find the video from JSON DB
    let videoDetails = videos.find(v => v.id === parseInt(id));

    // If not found in JSON DB, try finding it in session storage
    if (!videoDetails) {
      const sessionVideos = JSON.parse(sessionStorage.getItem('new_videos')) || [];
      videoDetails = sessionVideos.find(v => v.id === parseInt(id));
    }

    if (!videoDetails) {
      // If still not found, navigate away or show an error
      navigate('/'); // Redirect to home or show an error message
    } else {
      setVideo(videoDetails);
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(error => console.error('Auto-play failed:', error));
      }
    }
  }, [id, navigate]);

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
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="video-details">
              <h1>{video.title}</h1>
              <p>Author: {video.author}</p>
              <p>{video.views} views - {video.time}</p>
              <button className="btn btn-primary" onClick={handleLike}>Like</button>
              <span> {likes} Likes</span>
            </div>
            <VideoComments videoId={video.id} />
          </div>
          <div className="video-bar">
            <VideoList videos={videoList} />
          </div>
        </div>
      </div>
  );
}

export default VideoPage;
