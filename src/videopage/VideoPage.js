import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideosContext } from '../context/VideosContext';
import { UserContext } from '../context/UserContext';
import { LikesContext } from '../context/LikesContext';
import './VideoPage.css';
import VideoComments from './videoComments/VideoComments';
import { AiOutlineLike, AiTwotoneLike, AiOutlineDislike, AiTwotoneDislike } from "react-icons/ai";
import VideoListRightList from '../videos/VideoListRightText';
import SearchBar from '../searchbar/SearchBar';
import { LuFileEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmationModal from '../confirmModal/ConfirmationModal';
import UpdateVideoModal from '../confirmModal/UpdateVideoModal';
import ShareModal from '../confirmModal/ShareModal';
import { GoShare } from "react-icons/go";

function VideoPage() {
  // Get user from UserContext
  const { user } = useContext(UserContext);
  // Get video id from URL parameters
  const { id } = useParams();
  // Get videos and deleteVideo function from VideosContext
  const { videos, deleteVideo } = useContext(VideosContext);
  // Get likes, handleLike, and handleDislike functions from LikesContext
  const { likes, handleLike, handleDislike } = useContext(LikesContext);
  // Initialize videoList state as an empty array
  const [videoList, setVideoList] = useState([]);
  // Create a reference for the video element
  const videoRef = useRef(null);
  // Initialize videoC state as null (current video)
  const [videoC, setVideoC] = useState(null);
  // Initialize currentLikes state to keep track of likes count
  const [currentLikes, setCurrentLikes] = useState(0);
  // Initialize hasLiked state to check if the user has liked the video
  const [hasLiked, setHasLiked] = useState(false);
  // Initialize hasDisLiked state to check if the user has disliked the video
  const [hasDisLiked, setHasDisLiked] = useState(false);
  // Initialize showModal state to manage confirmation modal visibility
  const [showModal, setShowModal] = useState(false);
  // Initialize showUpdateModal state to manage update modal visibility
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // Initialize showShareModal state to manage share modal visibility
  const [showShareModal, setShareShowModal] = useState(false);

  // Effect to filter out the current video from the video list and set the current video
  useEffect(() => {
    const filteredVideos = videos.filter(v => v.id !== parseInt(id));
    setVideoList(filteredVideos);
    const foundVideo = videos.find(v => v.id === parseInt(id));
    setVideoC(foundVideo);
  }, [videos, id]);

  // Effect to set current likes and like/dislike states when videoC or likes change
  useEffect(() => {
    if (videoC) {
      const videoLikes = likes.find(video => video.id === videoC.id) || { count: 0, likes: [], dislikes: [] };
      setCurrentLikes(videoLikes.count);
      setHasLiked(videoLikes.likes.includes(user?.username));
      setHasDisLiked(videoLikes.dislikes.includes(user?.username));
    }
  }, [videoC, likes, user]);

  // Effect to set the video source when videoC changes
  useEffect(() => {
    if (videoC && videoRef.current) {
      videoRef.current.src = videoC.videoUrl;
      videoRef.current.load();
    }
  }, [videoC]);

  // Function to open the delete confirmation modal
  const openModal = () => {
    if (!user) {
      alert("You must be logged in to delete videos.");
      return;
    }

    setShowModal(true);
  };

  // Function to close the delete confirmation modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to confirm video deletion
  const confirmDelete = () => {
    deleteVideo(videoC.id);
    closeModal();
  };

  // Function to open the update modal
  const openUpdateModal = () => {
    if (!user) {
      alert("You must be logged in to update videos.");
      return;
    }

    setShowUpdateModal(true);
  };

  // Function to close the update modal
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // Function to toggle the share modal
  const toggleModal = () => {
    setShareShowModal(!showShareModal);
  };

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
                  <source src={videoC.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="video-details-page">
                <div className='video-img-dir-page'>
                  <span className='video-title-page'>{videoC.title} </span>
                  
                  <div className='video-delete-update-icon'>
                    <span className='span-margin'><GoShare size={30} onClick={toggleModal}/></span>
                    <span className='span-margin'><LuFileEdit onClick={openUpdateModal} style={{ marginBottom: 1 }} /></span>
                    <span><MdOutlineDelete onClick={openModal} /></span>
                  </div>
                </div>

                <div className='video-img-dir-page'>
                  <div>
                    <img className='video-img-page' src={videoC.img} alt="video thumbnail" /><span> {videoC.author}</span>
                  </div>
                  <div className="like-dislike-container">
                    <div className="like-dislike-button">
                      {hasLiked ?
                        <AiTwotoneLike className='icon' onClick={() => handleLike(videoC.id)} /> :
                        <AiOutlineLike className='icon' onClick={() => handleLike(videoC.id)} />}
                      <span>{currentLikes}</span>
                    </div>
                    <div className="separator"></div>
                    <div className="like-dislike-button">
                      {hasDisLiked ?
                        <AiTwotoneDislike className='icon' onClick={() => handleDislike(videoC.id)} /> :
                        <AiOutlineDislike className='icon' onClick={() => handleDislike(videoC.id)} />}
                    </div>
                  </div>
                </div>
                <div className='views-time'>
                  <span>{videoC.views} views - {videoC.time}</span>
                </div>
                <div className="video-comments-page">
                  <VideoComments videoId={videoC.id} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="video-bar">
          <VideoListRightList videos={videoList} />
        </div>
      </div>
      <ConfirmationModal show={showModal} onClose={closeModal} onConfirm={confirmDelete} />
      <UpdateVideoModal show={showUpdateModal} onClose={closeUpdateModal} video={videoC} />
      <ShareModal show={showShareModal} handleClose={toggleModal} />
    </div>
  );
}

export default VideoPage;
