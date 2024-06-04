import React, { useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { RiVideoAddLine, RiImageAddLine } from "react-icons/ri";
import { VideosContext } from '../../context/VideosContext';
import './AddVideo.css'
function AddVideo() {
    const { user, setUser } = useUser();
    const { addVideo } = useContext(VideosContext); // Access the addVideo function from the VideosContext
    const navigate = useNavigate();
    useEffect(() => {

        if (!user) {
            navigate('/');
        }

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Extract data directly from DOM elements
        const videoTitle = document.getElementById('videoTitle').value;
        const authorName = document.getElementById('authorName').value;
        const img2 = document.getElementById('thumbnailImage').files[0];
        const videoFile2 = document.getElementById('videoFile').files[0];
    
        // Create a new video object
        const newVideo = {
            id: 16,
            title: videoTitle,
            author: authorName,
            views: 0,
            time: new Date().toLocaleString(),
            img: URL.createObjectURL(img2),
            videoUrl: URL.createObjectURL(videoFile2)
        };
        
        // Call the addVideo function to add the new video
        addVideo(newVideo);

        navigate('/');
    };
    return (
        <div className="wrapper-add-video">
            <div className="inner-add-video">
                <form onSubmit={handleSubmit} className="add-video-form " noValidate>
                    <h3>Add New Video</h3>
                    <div className="form-group-add-video">
                        <label className="">Video Title:</label>
                        <input type="text" className="form-input-add-video" id="videoTitle" name="videoTitle" />
                    </div>
                    <div className="form-group-add-video">
                        <label className="">Author:</label>
                        <input type="text" className="form-input-add-video" id="authorName" name="authorName"  />
                    </div>
                    <div className="form-group-add-video">
                        <label className="">Video:</label>
                        <input type="file" className="form-input-add-video" id="videoFile" accept="videoFile/*"  hidden />
                     <label className="" for="videoFile"><RiVideoAddLine size={50} /></label>
                        <span id="file-chosen-video">No file chosen</span>
                    </div>
                    <div className="form-group-add-video">
                        <label className="">Image:</label>
                        <input type="file" className="form-input-add-video" id="thumbnailImage" name="thumbnailImage" accept="image/*" hidden/>
                        <label className="" for="thumbnailImage"><RiImageAddLine size={50} /></label>
                        <span id="file-chosen-img">No file chosen</span>
                    </div>
                    <button type="submit" className="register-button-add-video">Confirm Add
                        <i className="zmdi zmdi-arrow-right"></i>
                    </button>
                </form>
            </div>
        </div>


    );
}

export default AddVideo;
