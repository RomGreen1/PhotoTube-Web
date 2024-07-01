import React, { useEffect, useState } from 'react';
import './UserPage.css';
import { useParams } from 'react-router-dom';
import VideoList from '../videos/VideoList';
import VideoItem from '../videoitem/VideoItem';

const UserPage = () => {
    const { id } = useParams();
    const [mostViewedVideo, setMostViewedVideo] = useState(null);
    const [videoList, setVideosList] = useState([]);
    const [userD, setUserD] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const videosResponse = await fetch(`http://localhost:1324/api/users/${id}/videos`);
                const videosData = await videosResponse.json();

                if (videosData.length > 0) {
                    setVideosList(videosData);
                    const maxViewed = videosData.reduce((prev, current) => (prev.views > current.views) ? prev : current);
                    setMostViewedVideo(maxViewed);
                    // Filter out the most viewed video from the list
                    const updatedVideosList = videosData.filter(video => video._id !== maxViewed._id);
                    setVideosList(updatedVideosList);
                    setUserD(null); // Clear user data if videos are found
                } else {
                    const userResponse = await fetch(`http://localhost:1324/api/users/${id}`);
                    const userData = await userResponse.json();
                    setUserD(userData);
                    setMostViewedVideo(null); // Clear most viewed video if no videos are found
                    setVideosList([]); // Clear video list if no videos are found
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
                {mostViewedVideo ? (
                    <>
                        <div className='userProfileHeader'>
                            <img src={`http://localhost:${mostViewedVideo.creatorImg}`} alt={mostViewedVideo.createdBy} className='userProfileImg' />
                            <h1 className='userDisplayName'>{mostViewedVideo.createdBy}</h1>
                        </div>
                        <hr className='userDivider' />
                        <div className='userMostViewedSection'>
                            <h2>Most Viewed Video</h2>
                            <div className='userMostViewedVideo'>
                                <div className="userMostViewedVideoItem">
                                    <VideoItem key={mostViewedVideo._id} video={mostViewedVideo} />
                                </div>
                            </div>
                        </div>
                        <hr className='userDivider' />
                        <div className='userVideoList'>
                            <VideoList videos={videoList} />
                        </div>
                    </>
                ) : (
                    <>
                        {userD && (
                            <div className='userProfileHeader'>
                                <img src={`http://localhost:${userD.profileImg}`} alt={userD.displayname} className='userProfileImg' />
                                <h1 className='userDisplayName'>{userD.displayname}</h1>
                            </div>
                        )}
                        <hr className='userDivider' />
                        <div className='noVideosMessage'>
                            <p>There are no videos</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserPage;
