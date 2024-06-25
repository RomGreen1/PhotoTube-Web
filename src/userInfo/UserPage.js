// src/components/UserPage.js
import React, { useEffect, useState } from 'react';
import './UserPage.css'; // Ensure this is the correct path to your CSS file
import { useParams } from 'react-router-dom';
import VideoList from '../videos/VideoList'; // Adjust paths as necessary
import VideoItem from '../videoitem/VideoItem'; // Adjust paths as necessary

const UserPage = () => {
    const { id } = useParams();
    const [mostViewedVideo, setMostViewedVideo] = useState({});
    const [videoList, setVideosList] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const videosResponse = await fetch(`http://localhost:1324/api/users/${id}/videos`);
                const videosData = await videosResponse.json();
                setVideosList(videosData);

                // Set the most viewed video
                if (videosData.length > 0) {
                    const maxViewed = videosData.reduce((prev, current) => (prev.views > current.views) ? prev : current);
                    setMostViewedVideo(maxViewed);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <div className='userProfile'>
            
            {mostViewedVideo && (
                <>
                <div className='section1'>
                    <div className='profileHeader'>
                        <img src={mostViewedVideo.userProfileImg} alt={mostViewedVideo.createdBy} className='profileImg' />
                        <h1 className='displayName'>{mostViewedVideo.createdBy}</h1>
                    </div>
                    <hr className='divider' />
                    <div className='mostViewedVideo'>
                        <h2>Most Viewed Video</h2>
                        <VideoItem key={mostViewedVideo._id} video={mostViewedVideo} />
                    </div>
                    </div>
                    <div className='section2'>
                    <hr className='divider' />
                    <div className='videoList'>
                        <h2>All Videos</h2>
                        <VideoList videos={videoList}/>
                    </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserPage;
