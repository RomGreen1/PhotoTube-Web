import React, { useState , useContext, useEffect} from 'react';
import './Home.css';
import { VideoContext } from '../Videos/VideoContext';
import VideoList from '../Videos/VideoList';
import LeftMenu from '../LeftMenu/LeftMenu'; // Assuming you have a LeftMenu component
import Sidebar from '../LeftMenu/Sidebar';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import videos from '../Videos/videos_db.json';


function HomePage() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [videoList, setVideoList] = useState(videos);
    const navigate = useNavigate();

    // Function to load videos from both the context and session storage
    useEffect(() => {
        const sessionVideos = JSON.parse(sessionStorage.getItem('new_videos')) || [];
        setVideoList([...videos, ...sessionVideos]);
    }, [videos]);

    const doSearch = function (q) {
    setVideoList(videoList.filter((video) => video.title.includes(q)));
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const addVideo =() => {
      navigate('/add-video');
  }

  return (
    <div className="home">
        <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`left-menu-in ${menuOpen ? 'close' : 'open'}`}>
      <Sidebar/>
      </div>
      <div className={`left-menu ${menuOpen ? 'open' : 'close'}`}>
        <LeftMenu />
      </div>
        <div className='div-do-search'>
        <SearchBar doSearch={doSearch} />
        </div>
        <div className='add-video'>
           <button className="add-video" onClick={addVideo}></button>
        </div>
      <div className="content">
        <VideoList  videos={videoList} />
      </div>
    </div>
  );
}

export default HomePage;
