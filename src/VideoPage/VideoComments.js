import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext'; // Assuming you have a UserContext
import './VideoComments.css';
function VideoComments({ videoId }) {
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState(() => {
        // Load comments from sessionStorage
        const savedComments = sessionStorage.getItem(`comments_${videoId}`);
        return savedComments ? JSON.parse(savedComments) : [];
    });
    const [newComment, setNewComment] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);  // Track the index of the comment being edited

    useEffect(() => {
        // Save comments to sessionStorage whenever they change
        sessionStorage.setItem(`comments_${videoId}`, JSON.stringify(comments));
    }, [comments, videoId]);

    const handleAddOrEditComment = (e) => {
        e.preventDefault();
        const commentData = {
            text: newComment,
            author: user.username,
            date: new Date().toLocaleDateString()
        };

        if (editingIndex >= 0) {
            const updatedComments = comments.map((comment, index) => index === editingIndex ? commentData : comment);
            setComments(updatedComments);
            setEditingIndex(-1); // Reset editing index
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
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <p><strong>{comment.author}</strong> ({comment.date}): {comment.text}</p>
                    {user && user.username === comment.author && (
                        <div>
                            <button onClick={() => handleEdit(index)}>Edit</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
            {user && (
                <form onSubmit={handleAddOrEditComment}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        required
                    ></textarea>
                    <button type="submit">{editingIndex >= 0 ? 'Update Comment' : 'Add Comment'}</button>
                </form>
            )}
        </div>
    );
}

export default VideoComments;