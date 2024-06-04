import React, { useState , useContext, useEffect} from 'react';
import './Home.css';
import videoss from '../videos/videos_db.json'
import VideoList from '../videos/VideoList';
import SearchBar from '../searchbar/SearchBar';
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const [videoList, setVideoList] = useState(videoss);
  const doSearch = function (q) {
    setVideoList(videoList.filter((video) => video.title.includes(q)));
  }
  useEffect(() => {
    console.log("Loaded videos:", videoss); // Check if videos are loaded correctly
  }, []);
  const navigate = useNavigate();
  return (
    <div className="home">
        <div className='div-do-search'>
        <SearchBar doSearch={doSearch} />
        </div>
      <div className="content">
        <VideoList  videos={videoList} />
      </div>
      <div style={{height:"10000px;"}}></div>
    </div>
    
  );
}

export default HomePage;
