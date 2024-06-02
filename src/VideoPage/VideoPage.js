import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoContext } from '../Videos/VideoContext';
import VideoList from '../Videos/VideoList';
import LeftMenu from '../LeftMenu/LeftMenu'; 
import Sidebar from '../LeftMenu/Sidebar';
import SearchBar from '../SearchBar/SearchBar';
import './VideoPage.css';

function VideoPage() {
  const videoData = useContext(VideoContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const videoRef = useRef(null);

  const doSearch = (q) => {
    setVideoList(videoData.filter((video) => video.title.includes(q)));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const videoC = videoData.find(v => v.id === parseInt(id));

  useEffect(() => {
    if (!videoC) {
      navigate('/'); // Navigate to Home page if video is not found
    } else {
      // Filter out the current video from the video list
      setVideoList(videoData.filter(video => video.id !== videoC.id));
      if (videoRef.current) {
        videoRef.current.muted = true; // Set the video to be muted
        videoRef.current.play().catch((error) => {
          console.error('Auto-play failed:', error);
        });
      }
    }
  }, [videoC, navigate, videoData]);

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
          <div className="video-player" >
            <video ref={videoRef} controls muted autoPlay>
              <source src={videoC.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="video-details">
            <h1>{videoC.title}</h1>
            <p>Author: {videoC.author}</p>
            <p>{videoC.views} views - {videoC.time}</p>
          </div>
        </div>
        <div className="video-bar">
          <VideoList videos={videoList} />
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
