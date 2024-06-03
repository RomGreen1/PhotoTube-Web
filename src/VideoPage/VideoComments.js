import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext'; // Assuming you have a UserContext
import './VideoComments.css';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function VideoComments({ videoId }) {
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState(() => {
        const savedComments = sessionStorage.getItem(`comments_${videoId}`);
        return savedComments ? JSON.parse(savedComments) : [];
    });
    const [newComment, setNewComment] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);

    useEffect(() => {
        sessionStorage.setItem(`comments_${videoId}`, JSON.stringify(comments));
    }, [comments, videoId]);

    const handleAddOrEditComment = (e) => {
        e.preventDefault();
        const commentData = {
            text: newComment,
            author: user.username,
            avatar: user.avatar,
            date: new Date().toLocaleDateString()
        };

        if (editingIndex >= 0) {
            const updatedComments = comments.map((comment, index) => index === editingIndex ? commentData : comment);
            setComments(updatedComments);
            setEditingIndex(-1);
        } else {
            setComments([...comments, commentData]);
        }
        setNewComment('');
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewComment(comments[index].text);
    };

    const handleDelete = (index) => {
        const updatedComments = comments.filter((_, idx) => idx !== index);
        setComments(updatedComments);
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <hr className="divider" />
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment-header">
                        <img src={comment.avatar} alt="avatar" className="comment-avatar" />
                        <div className="comment-author">
                            <strong>{comment.author}</strong>
                            <span className="comment-date">{comment.date}</span>
                        </div>
                    </div>
                    <div className="comments-text-actions">
                    <span className="comment-text">{comment.text}</span>
                    {user && user.username === comment.author && (
                        <div className="comment-actions">
                            <CiEdit onClick={() => handleEdit(index)}/>
                            <MdDeleteOutline onClick={() => handleDelete(index)}/>
                        </div>
                    )}
                    </div>
                </div>
            ))}
            {user && (
                <form onSubmit={handleAddOrEditComment} className="comment-form">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="comment-area"
                    ></input>
                    <button type="submit" className="comment-submit">
                        {editingIndex >= 0 ? 'Update Comment' : 'Comment'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default VideoComments;
