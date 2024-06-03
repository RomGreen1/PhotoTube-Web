import React, { useState , useContext, useEffect} from 'react';
import './Home.css';
import { VideoContext } from '../Videos/VideoContext';
import VideoList from '../Videos/VideoList';
import SearchBar from '../SearchBar/SearchBar';
function HomePage() {
  
const videoData = useContext(VideoContext);
  const [videoList, setVideoList] = useState(videoData);
  const doSearch = function (q) {
    setVideoList(videoData.filter((video) => video.title.includes(q)));
  }

  return (
    <div className="home">
    
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
