import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { CommentsContext } from '../../context/CommentsContext';
import './VideoComments.css';
import { MdDeleteOutline, MdCancelPresentation } from "react-icons/md";
import { BiCommentCheck, BiCommentX, BiCommentEdit, BiShare } from "react-icons/bi";

function VideoComments({ videoId }) {
    // Get the user from the UserContext
    const { user } = useContext(UserContext);
    // Get comments and comment management functions from the CommentsContext
    const { comments, addComment, updateComment, deleteComment } = useContext(CommentsContext);
    // Initialize newComment state for adding a new comment
    const [newComment, setNewComment] = useState('');
    // Initialize editComment state for editing a comment
    const [editComment, setEditComment] = useState('');
    // Initialize editingIndex state to keep track of the comment being edited
    const [editingIndex, setEditingIndex] = useState(-1);
    // Initialize editing state to toggle editing mode
    const [editing, setEditing] = useState(false);

    // Get the comments for the specific video
    const videoComments = comments[videoId] || [];

    // Function to handle adding a new comment
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

        addComment(videoId, commentData); // Add the comment
        setNewComment(''); // Clear the newComment state
    };

    // Function to handle updating a comment
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

        updateComment(videoId, editingIndex, commentData); // Update the comment
        setEditingIndex(-1); // Reset editing index
        setEditing(false); // Exit editing mode
        setEditComment(''); // Clear the editComment state
    };

    // Function to handle editing a comment
    const handleEdit = (index) => {
        setEditing(true); // Enter editing mode
        setEditingIndex(index); // Set the index of the comment being edited
        setEditComment(videoComments[index].text); // Set the text of the comment being edited
    };

    // Function to handle deleting a comment
    const handleDelete = (index) => {
        deleteComment(videoId, index); // Delete the comment
        if (editingIndex === index) {
            setEditingIndex(-1); // Reset editing index if the deleted comment was being edited
            setEditing(false); // Exit editing mode
            setEditComment(''); // Clear the editComment state
        }
    };

    // Function to cancel editing a comment
    const cancelEdit = () => {
        setEditingIndex(-1); // Reset editing index
        setEditing(false); // Exit editing mode
        setEditComment(''); // Clear the editComment state
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
            <div style={{ height: "30px" }}></div> {/* Spacer div */}
        </div>
    );
}

export default VideoComments;
