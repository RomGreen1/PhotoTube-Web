import React, { useContext, useState, useEffect } from 'react';
import './Home.css';
import { VideosContext } from '../context/VideosContext';
import VideoList from '../videos/VideoList';
import SearchBar from '../searchbar/SearchBar';
import { SearchContext } from '../context/SearchContext';

function HomePage() {
  // Get videos from VideosContext
  const { videos } = useContext(VideosContext);
  // Initialize videoList state as an empty array
  const [videoList, setVideoList] = useState([]);
  // Get search query from SearchContext
  const { searchQuery } = useContext(SearchContext);

  // Update videoList based on searchQuery
  useEffect(() => {
    if (!searchQuery) {
      setVideoList(videos); // If no search query, set videoList to all videos
    } else {
      setVideoList(videos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      )); // Filter videos based on search query
    }
  }, [searchQuery, videos]); // Dependencies are searchQuery and videos

  return (
    <div className="home">
      <div className='div-do-search'>
        <SearchBar />
      </div>
      <div className="content">
        <VideoList videos={videoList} />
      </div>
      <div style={{ height: "100px" }}></div> {/* Spacer div */}
    </div>
  );
}

export default HomePage;
