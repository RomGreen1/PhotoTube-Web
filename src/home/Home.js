import React, { useState} from 'react';
import './Home.css';
import videoss from '../videos/videos_db.json'
import VideoList from '../videos/VideoList';
import SearchBar from '../searchbar/SearchBar';
import { useEffect } from 'react';

function HomePage() {
  const [videoList, setVideoList] = useState(videoss);
  const doSearch = function (q) {
    setVideoList(videoList.filter((video) => video.title.includes(q)));
  }

  useEffect(() => {
    // Retrieve videos from session storage
    const sessionVideos = JSON.parse(sessionStorage.getItem('videos'))|| [];
    // Check if sessionVideos is an array
    
      // Merge session storage videos with initial videos
      const mergedVideos = [...videoList, ...sessionVideos];
      // Set the merged videos as the new video list
      setVideoList(mergedVideos);
    
  }, []);

  return (
    <div className="home">
        <div className='div-do-search'>
        <SearchBar doSearch={doSearch} />
        </div>
      <div className="content">
        <VideoList  videos={videoList} />
      </div>
      <div style={{height: "100px"}}></div>
    </div>
    
  );
}

export default HomePage;
