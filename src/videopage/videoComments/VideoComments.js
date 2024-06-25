import React, { useState, useContext } from 'react';
import './VideoComments.css';
import { MdDeleteOutline } from "react-icons/md";
import { BiCommentCheck, BiCommentX, BiCommentEdit, BiShare } from "react-icons/bi";
import { UserContext } from '../../context/UserContext';

function VideoComments({ video }) {
    // Initialize newComment state for adding a new comment
    const [newComment, setNewComment] = useState('');
    // Initialize editComment state for editing a comment
    const [editComment, setEditComment] = useState('');
    // Initialize editingIndex state to keep track of the comment being edited
    const [editingIndex, setEditingIndex] = useState(-1);
    // Initialize editing state to toggle editing mode
    const [editing, setEditing] = useState(false);
    const { user } = useContext(UserContext);

    // Function to handle adding a new comment
    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert('Please write something before submitting.');
            return;
        }
        console.log(video)
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const commentData = {
            commentText: newComment,
        };
        
        try {
            const response = await fetch(`http://localhost:1324/api/users/${userId}/videos/${video._Id}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
    
            const newCommentData = await response.json();
            video.comments.push(newCommentData); // Add the comment to the video.comments array
            setNewComment(''); // Clear the newComment state
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Function to handle updating a comment
    const handleUpdateComment = async () => {
        if (!editComment.trim()) {
            alert('Please write something before updating.');
            return;
        }

        const token = localStorage.getItem('token');
        const commentId = video.comments[editingIndex]._id; // Get the comment ID

        const commentData = {
            commentText: editComment,
        };

        try {
            const response = await fetch(`http://localhost:1324/api/users/${commentId}/comments`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                throw new Error('Failed to update comment');
            }

            const updatedCommentData = await response.json();
            video.comments[editingIndex] = updatedCommentData; // Update the comment in the video.comments array
            setEditingIndex(-1); // Reset editing index
            setEditing(false); // Exit editing mode
            setEditComment(''); // Clear the editComment state
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    // Function to handle deleting a comment
    const handleDelete = async (index) => {
        const token = localStorage.getItem('token');
        const commentId = video.comments[index]._id; // Get the comment ID

        try {
            const response = await fetch(`http://localhost:1324/api/users/${commentId}/comments`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }

            video.comments.splice(index, 1); // Remove the comment from the video.comments array
            if (editingIndex === index) {
                setEditingIndex(-1); // Reset editing index if the deleted comment was being edited
                setEditing(false); // Exit editing mode
                setEditComment(''); // Clear the editComment state
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // Function to handle editing a comment
    const handleEdit = (index, comment) => {
        setEditing(true); // Enter editing mode
        setEditingIndex(index); // Set the index of the comment being edited
        setEditComment(comment.commentText); // Set the text of the comment being edited
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
            {video.comments.map((comment, index) => (
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
                                    <BiCommentEdit onClick={() => handleEdit(index, comment)} size={20} />
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
