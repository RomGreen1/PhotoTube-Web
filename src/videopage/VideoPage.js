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


function VideoPage() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const { videos, deleteVideo } = useContext(VideosContext);
  const { likes, handleLike, handleDislike } = useContext(LikesContext);
  const [videoList, setVideoList] = useState([]);
  const videoRef = useRef(null);
  const [videoC, setVideoC] = useState(null);
  const [currentLikes, setCurrentLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisLiked, setHasDisLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal for updating video

  useEffect(() => {
    const filteredVideos = videos.filter(v => v.id !== parseInt(id));
    setVideoList(filteredVideos);
    const foundVideo = videos.find(v => v.id === parseInt(id));
    setVideoC(foundVideo);
  }, [videos, id]);

  useEffect(() => {
    if (videoC) {
      const videoLikes = likes.find(video => video.id === videoC.id) || { count: 0, likes: [], dislikes: [] };
      setCurrentLikes(videoLikes.count);
      setHasLiked(videoLikes.likes.includes(user?.username));
      setHasDisLiked(videoLikes.dislikes.includes(user?.username));
    }
  }, [videoC, likes, user]);

  useEffect(() => {
    if (videoC && videoRef.current) {
      videoRef.current.src = videoC.videoUrl;
      videoRef.current.load();
    }
  }, [videoC]);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmDelete = () => {
    deleteVideo(videoC.id);
    closeModal();
  };

  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
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
                  <span className='video-title-page'>{videoC.title}</span>
                  <div className='video-delete-update-icon'>
                    <span className='span-margin'> <LuFileEdit  onClick={openUpdateModal} style={{ marginBottom: 1 }} /></span>
                    <span> <MdOutlineDelete onClick={openModal} /></span>

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
    </div>
  );
}

export default VideoPage;
