import React, { createContext, useState, useEffect } from 'react';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([[]]);

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

    const updateComment = (videoId, index, newComment) => {
        setComments(prevComments => {
            const newComments = [...prevComments];
            if (newComments[videoId]) {
                newComments[videoId][index] = newComment;
            }
            return newComments;
        });
    };

    const deleteComment = (videoId, index) => {
        setComments(prevComments => {
            const newComments = [...prevComments];
            if (newComments[videoId]) {
                newComments[videoId].splice(index, 1);
            }
            return newComments;
        });
    };

    return (
        <CommentsContext.Provider value={{ comments, addComment, updateComment, deleteComment }}>
            {children}
        </CommentsContext.Provider>
    );
};
