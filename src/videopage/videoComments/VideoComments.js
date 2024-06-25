import React, { useState, useEffect, useContext } from 'react';
import './VideoComments.css';
import { MdDeleteOutline } from "react-icons/md";
import { BiCommentCheck, BiCommentX, BiCommentEdit, BiShare } from "react-icons/bi";
import { UserContext } from '../../context/UserContext';

function VideoComments({ video }) {
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editing, setEditing] = useState(false);
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:1324/api/users/${video._id}/comments`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const responseComments = await response.json();
                setComments(responseComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
    
        fetchComments();
    }, [video,comments]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert('Please write something before submitting.');
            return;
        }
        
        const commentData = {
            text: newComment,
        };
        
        try {
            const response = await fetch(`http://localhost:1324/api/users/${userId}/videos/${video._id}/comments`, {
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
            setComments([...comments, newCommentData]);
            setNewComment(''); // Clear the newComment state
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleUpdateComment = async () => {
        if (!editComment.trim()) {
            alert('Please write something before updating.');
            return;
        }

        const token = localStorage.getItem('token');
        const commentId = comments[editingIndex]._id; // Get the comment ID

        const commentData = {
            text: editComment,
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
            const updatedComments = comments.map((comment, index) =>
                index === editingIndex ? updatedCommentData : comment
            );
            setComments(updatedComments);
            setEditingIndex(-1); // Reset editing index
            setEditing(false); // Exit editing mode
            setEditComment(''); // Clear the editComment state
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDelete = async (index) => {
        const token = localStorage.getItem('token');
        const commentId = comments[index]._id; // Get the comment ID

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

            const updatedComments = comments.filter((_, i) => i !== index);
            setComments(updatedComments);
            if (editingIndex === index) {
                setEditingIndex(-1); // Reset editing index if the deleted comment was being edited
                setEditing(false); // Exit editing mode
                setEditComment(''); // Clear the editComment state
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleEdit = (index, comment) => {
        setEditing(true); // Enter editing mode
        setEditingIndex(index); // Set the index of the comment being edited
        setEditComment(comment.text); // Set the text of the comment being edited
    };

    const cancelEdit = () => {
        setEditingIndex(-1); // Reset editing index
        setEditing(false); // Exit editing mode
        setEditComment(''); // Clear the editComment state
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <hr className="divider" />
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment-header">
                        <img src={comment.userProfileImg} alt="avatar" className="comment-avatar" />
                        <div className="comment-author">
                            <strong>{comment.username}</strong>
                            <span className="comment-date">{formatDate(comment.date)}</span>
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
                        <div id={`d_${index}`} className="comment-actions">
    <BiShare size={20} />
    {user && userId === comment.createdBy && (
        <>
            {editingIndex === index ? (
                <>
                    <BiCommentCheck size={20} onClick={handleUpdateComment} />
                    <BiCommentX size={20} onClick={cancelEdit} />
                </>
            ) : (
                <BiCommentEdit onClick={() => handleEdit(index, comment)} size={20} />
            )}
            <MdDeleteOutline onClick={() => handleDelete(index)} size={20} />
        </>
    )}
</div>

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
