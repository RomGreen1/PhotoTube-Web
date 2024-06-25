import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import './VideoPage.css';
import VideoComments from './videoComments/VideoComments';
import SearchBar from '../searchbar/SearchBar';
import ConfirmationModal from '../confirmModal/ConfirmationModal';
import UpdateVideoModal from '../confirmModal/UpdateVideoModal';
import ShareModal from '../confirmModal/ShareModal';
import VideoListRightList from '../videos/VideoListRightText';

import { AiOutlineLike, AiTwotoneLike, AiOutlineDislike, AiTwotoneDislike } from "react-icons/ai";
import { LuFileEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { GoShare } from "react-icons/go";

function VideoPage() {
  const { user } = useContext(UserContext);
  const { videoId, userIdCreater } = useParams();
  const [videoList, setVideoList] = useState([]);
  const videoRef = useRef(null);
  const [videoC, setVideoC] = useState(null);
  const [showModal, setShowModal] = useState({ type: null, isVisible: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const videoResponse = await fetch(`http://localhost:1324/api/users/${userIdCreater}/videos/${videoId}`);
      const videoData = await videoResponse.json();
      if (!videoData) {
        navigate('/');
      }
      setVideoC(videoData);
      const videosResponse = await fetch('http://localhost:1324/api/videos');
      const videosData = await videosResponse.json();
      const filteredVideos = videosData.filter(v => v._id !== videoId);
      setVideoList(filteredVideos);
    };
    fetchVideos();
  }, [videoId, userIdCreater]);

  useEffect(() => {
    if (videoC && videoRef.current) {
      videoRef.current.src = videoC.videoUrl;
      videoRef.current.load();
    }
  }, [videoC?.videoUrl]);

  const toggleModal = (type) => {
    if (!user && type !== 'share') {
      alert("You must be logged in to perform this action.");
      return;
    }
    setShowModal({ type, isVisible: !showModal.isVisible });
  };

  const confirmDelete = async () => {
       try {
      const response = await fetch(`http://localhost:1324/api/users/${userIdCreater}/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete video');
      }

      alert('Video deleted successfully');
      navigate('/'); // Redirect to another page after successful deletion
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video');
    } finally {
      toggleModal(null);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const loggedId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like videos.");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:1324/api/users/${loggedId}/videos/${videoId}/like`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'like' }),
      });

      if (!response.ok) {
        throw new Error('Failed to like video');
      }

      const updatedLikes = await response.json();
      setVideoC(prevVideoC => ({
        ...prevVideoC,
        likes: updatedLikes.likes
      }));

    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDislike = async () => {
    if (!user) {
      alert("You must be logged in to dislike videos.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:1324/api/users/${loggedId}/videos/${videoId}/like`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'dislike' }),
      });

      if (!response.ok) {
        throw new Error('Failed to dislike video');
      }

      const updatedLikes = await response.json();
      setVideoC(prevVideoC => ({
        ...prevVideoC,
        likes: updatedLikes.likes
      }));

    } catch (error) {
      console.error('Error disliking video:', error);
    }
  };

  const userHasLiked = videoC?.likes?.some(like => like.userId === loggedId && like.action === 'like');
  const userHasDisliked = videoC?.likes?.some(like => like.userId === loggedId && like.action === 'dislike');
  const likeCount = videoC?.likes?.filter(like => like.action === 'like').length || 0;
  const isCreator = user &&loggedId === userIdCreater;

  return (
    <div className='video-page'>
      <div className='div-do-search'>
        <SearchBar />
      </div>
      <div className='main-content'>
        <div className='video-page-item'>
          {videoC && (
            <>
              <div className="video-player-page">
                <video ref={videoRef} controls autoPlay>
                  <source src={`data:video/mp4;base64,${videoC.videoUrl}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="video-details-page">
                <div className='video-img-dir-page'>
                  <span className='video-title-page'>{videoC.title} </span>
                  
                  <div className='video-delete-update-icon'>
                    <span className='span-margin'><GoShare size={30} onClick={() => toggleModal('share')} /></span>
                    {isCreator ? 
                    (<>
                    <span className='span-margin'><LuFileEdit onClick={() => toggleModal('update')} style={{ marginBottom: 1 }} /></span>
                    <span><MdOutlineDelete onClick={() => toggleModal('delete')} /></span>
                    </>) : null}        
                  </div>
                </div>

                <div className='video-img-dir-page'>
                  <div>
                    <img className='video-img-page' src={videoC.creatorImg} alt="video thumbnail" /><span> {videoC.createdBy}</span>
                  </div>
                  <div className="like-dislike-container">
                    <div className="like-dislike-button">
                      {userHasLiked ?
                        <AiTwotoneLike className='icon' onClick={() => handleLike()} /> :
                        <AiOutlineLike className='icon' onClick={() => handleLike()} />}
                      <span>{likeCount}</span>
                    </div>
                    <div className="separator"></div>
                    <div className="like-dislike-button">
                      {userHasDisliked ?
                        <AiTwotoneDislike className='icon' onClick={() => handleDislike()} /> :
                        <AiOutlineDislike className='icon' onClick={() => handleDislike()} />}
                    </div>
                  </div>
                </div>
                <div className='views-time'>
                  <span>{videoC.views} views - {formatDate(videoC.date)}</span>
                </div>
                <div className="video-comments-page">
                  <VideoComments video={videoC} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="video-bar">
          <VideoListRightList videos={videoList} />
        </div>
      </div>
      {showModal.type === 'delete' && (
        <ConfirmationModal show={showModal.isVisible} onClose={() => toggleModal('delete')} onConfirm={confirmDelete} name="video" />
      )}
      {showModal.type === 'update' && (
          <UpdateVideoModal 
          show={showModal.isVisible} 
          onClose={() => toggleModal('update')} 
          video={videoC} 
          id={userIdCreater}
          pid={videoId}
          onUpdate={(updatedVideo) => setVideoC(updatedVideo)}
        />
      )}
      {showModal.type === 'share' && (
        <ShareModal show={showModal.isVisible} handleClose={() => toggleModal('share')} />
      )}
    </div>
  );
}

export default VideoPage;
