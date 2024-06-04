import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { CommentsContext } from '../../context/CommentsContext';
import './VideoComments.css';
import { MdDeleteOutline, MdCancelPresentation } from "react-icons/md";
import { BiCommentCheck, BiCommentX, BiCommentEdit, BiShare } from "react-icons/bi";

function VideoComments({ videoId }) {
    const { user } = useContext(UserContext);
    const { comments, addComment, updateComment, deleteComment } = useContext(CommentsContext);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editing, setEditing] = useState(false);

    const videoComments = comments[videoId] || [];

    const handleAddComment = () => {
        if (!newComment.trim()) {
            alert('Please write something before submitting.');
            return;
        }

        const commentData = {
            text: newComment,
            author: user.username,
            avatar: user.avatar,
            date: new Date().toLocaleDateString()
        };

        addComment(videoId, commentData);
        setNewComment('');
    };

    const handleUpdateComment = () => {
        if (!editComment.trim()) {
            alert('Please write something before updating.');
            return;
        }

        const commentData = {
            text: editComment,
            author: user.username,
            avatar: user.avatar,
            date: new Date().toLocaleDateString()
        };

        updateComment(videoId, editingIndex, commentData);
        setEditingIndex(-1);
        setEditing(false);
        setEditComment('');
    };

    const handleEdit = (index) => {
        setEditing(true);
        setEditingIndex(index);
        setEditComment(videoComments[index].text);
    };

    const handleDelete = (index) => {
        deleteComment(videoId, index);
        if (editingIndex === index) {
            setEditingIndex(-1);
            setEditing(false);
            setEditComment('');
        }
    };

    const cancelEdit = () => {
        setEditingIndex(-1);
        setEditing(false);
        setEditComment('');
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <hr className="divider" />
            {videoComments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment-header">
                        <img src={comment.avatar} alt="avatar" className="comment-avatar" />
                        <div className="comment-author">
                            <strong>{comment.author}</strong>
                            <span className="comment-date">{comment.date}</span>
                        </div>
                    </div>
                    <div className="comments-text-actions">
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                                className="comment-area"
                            />
                        ) : (
                            <span className="comment-text">{comment.text}</span>
                        )}
                        
                        {user && user.username === comment.author && (
                            <div id={`d_${index}`} className="comment-actions">
                                <BiShare size={20} />
                                {editingIndex === index ? (
                                    <>
                                        <BiCommentCheck size={20} onClick={handleUpdateComment} />
                                        <BiCommentX size={20} onClick={cancelEdit} />
                                    </>
                                ) : (
                                    <BiCommentEdit onClick={() => handleEdit(index)} size={20} />
                                )}
                                <MdDeleteOutline onClick={() => handleDelete(index)} size={20} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {user && (
                <form onSubmit={(e) => { e.preventDefault(); handleAddComment(); }} className="comment-form">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="comment-area"
                    />
                    <button type="submit" className="comment-submit">
                        Comment
                    </button>
                </form>
            )}
            <div style={{height:"30px"}}></div>
        </div>
    );
}

export default VideoComments;
