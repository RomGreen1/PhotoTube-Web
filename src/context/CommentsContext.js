import React, { createContext, useState, useEffect } from 'react';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState(() => {
        const savedComments = JSON.parse(localStorage.getItem('comments')) || {};
        return savedComments;
    });

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const addComment = (videoId, comment) => {
        setComments(prevComments => {
            const videoComments = prevComments[videoId] || [];
            return {
                ...prevComments,
                [videoId]: [...videoComments, comment]
            };
        });
    };

    const updateComment = (videoId, index, newComment) => {
        setComments(prevComments => {
            const videoComments = prevComments[videoId] || [];
            videoComments[index] = newComment;
            return {
                ...prevComments,
                [videoId]: videoComments
            };
        });
    };

    const deleteComment = (videoId, index) => {
        setComments(prevComments => {
            const videoComments = prevComments[videoId] || [];
            videoComments.splice(index, 1);
            return {
                ...prevComments,
                [videoId]: videoComments
            };
        });
    };

    return (
        <CommentsContext.Provider value={{ comments, addComment, updateComment, deleteComment }}>
            {children}
        </CommentsContext.Provider>
    );
};
