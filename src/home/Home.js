import React, { useContext, useState} from 'react';
import './Home.css';
import {VideosContext} from '../context/VideosContext'
import VideoList from '../videos/VideoList';
import SearchBar from '../searchbar/SearchBar';
import { SearchContext } from '../context/SearchContext';
import { useEffect } from 'react';
function HomePage() {
  const {videos} = useContext(VideosContext);
  const [videoList, setVideoList] = useState([]);
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    if (!searchQuery) {
      setVideoList(videos);
    } else {
      setVideoList(videos.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [searchQuery]);


  return (
    <div className="home">
        <div className='div-do-search'>
        <SearchBar />
        </div>
      <div className="content">
        <VideoList  videos={videoList} />
      </div>
      <div style={{height: "100px"}}></div>
    </div>
    
  );
}

export default HomePage;
