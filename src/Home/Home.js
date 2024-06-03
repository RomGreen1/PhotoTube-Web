import React, { useState , useContext, useEffect} from 'react';
import './Home.css';
import { VideoContext } from '../Videos/VideoContext';
import VideoList from '../Videos/VideoList';
import LeftMenu from '../LeftMenu/LeftMenu'; // Assuming you have a LeftMenu component
import Sidebar from '../LeftMenu/Sidebar';
import SearchBar from '../SearchBar/SearchBar';
import {useUser} from "../UserContext";

function HomePage() {
const videoData = useContext(VideoContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoList, setVideoList] = useState(videoData);
  const doSearch = function (q) {
    setVideoList(videoData.filter((video) => video.title.includes(q)));
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

      <div className="content">
        <VideoList  videos={videoList} />
      </div>
    </div>
  );
}

export default HomePage;
