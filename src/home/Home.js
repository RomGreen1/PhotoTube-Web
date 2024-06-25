import React, { useContext, useState, useEffect } from 'react';
import './Home.css';
import VideoList from '../videos/VideoList';
import SearchBar from '../searchbar/SearchBar';
import { SearchContext } from '../context/SearchContext';

function HomePage() {

  
  // Initialize videoList state as an empty array
  const [videoList, setVideoList] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  // Get search query from SearchContext
  const { searchQuery } = useContext(SearchContext);

 
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch('http://localhost:1324/api/videos');
      const videosData = await response.json();
      setVideoList(videosData);
      setFilteredVideos(videosData); 
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredVideos(videoList); 
    } else {
      setFilteredVideos(videoList.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      )); 
    }
  }, [searchQuery, videoList]); 

  return (
    <div className="home">
      <div className='div-do-search'>
        <SearchBar />
      </div>
      <div className="content">
        <VideoList videos={filteredVideos} />
      </div>
      <div style={{ height: "100px" }}></div> {/* Spacer div */}
    </div>
  );
}

export default HomePage;
