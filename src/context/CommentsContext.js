import React, { createContext, useState, useEffect } from 'react';

// Create a context for comments
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    // Initialize the comments state as an array of arrays
    const [comments, setComments] = useState([[]]);

    // Function to add a comment to a specific video
    const addComment = (videoId, comment) => {
        setComments(prevComments => {
            const newComments = [...prevComments];
            if (!newComments[videoId]) {
                newComments[videoId] = [];
            }
            newComments[videoId].push(comment);
            return newComments;
        });
    };

    // Function to update a specific comment of a specific video
    const updateComment = (videoId, index, newComment) => {
        setComments(prevComments => {
            const newComments = [...prevComments];
            if (newComments[videoId]) {
                newComments[videoId][index] = newComment;
            }
            return newComments;
        });
    };

    // Function to delete a specific comment of a specific video
    const deleteComment = (videoId, index) => {
        setComments(prevComments => {
            const newComments = [...prevComments];
            if (newComments[videoId]) {
                newComments[videoId].splice(index, 1);
            }
            return newComments;
        });
    };

    // Provide the comments and comment management functions to the context consumers
    return (
        <CommentsContext.Provider value={{ comments, addComment, updateComment, deleteComment }}>
            {children}
        </CommentsContext.Provider>
    );
};
