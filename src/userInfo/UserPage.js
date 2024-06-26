import React, { useEffect, useState } from 'react';
import './UserPage.css';
import { useParams } from 'react-router-dom';
import VideoList from '../videos/VideoList';
import VideoItem from '../videoitem/VideoItem';

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
        <div className='userPage'>
            <div className='userProfile'>
                <div className='userProfileHeader'>
                            <img src={mostViewedVideo.creatorImg} alt={mostViewedVideo.createdBy} className='userProfileImg' />
                            <h1 className='userDisplayName'>{mostViewedVideo.createdBy}</h1>
                </div>
                <hr className='userDivider' />
                <div className='userMostViewedSection'>
                    <h2>Most Viewed Video</h2>
                    <div className='userMostViewedVideo'>
                        <div className="userMostViewedVideoItem">
                            {mostViewedVideo && <VideoItem key={mostViewedVideo._id} video={mostViewedVideo} />}
                        </div>
                    </div>
                </div>
                <hr className='userDivider' />
                <div className='userVideoList'>
                
                    <VideoList videos={videoList} />
                </div>
            </div>
        </div>
    );
};

export default UserPage;
