import React, { createContext } from 'react';

const videoData = [
        {
          "id": 1,
          "title": "play 1",
          "author": "nba",
          "views": 100,
          "time": "1 year",
          "img": "/VideoImages/photo1.jpg",
          "videoUrl": "/MPS/play1.mp4"
        },
        {
          "id": 2,
          "title": "play 2",
          "author": "nba",
          "views": 1500,
          "time": "2 years",
          "img": "/VideoImages/photo2.jpg",
          "videoUrl": "/MPS/play2.mp4"
        },
        {
          "id": 3,
          "title": "play 3",
          "author": "nba",
          "views": 10000,
          "time": "5 months",
          "img": "/VideoImages/photo3.jpg",
          "videoUrl": "/MPS/play3.mp4"
        },
        {
          "id": 4,
          "title": "play 4",
          "author": "nba",
          "views": 1000,
          "time": "7 months",
          "img": "/VideoImages/photo4.jpg",
          "videoUrl": "/MPS/play4.mp4"
        },
        {
          "id": 5,
          "title": "play 5",
          "author": "nba",
          "views": 1000,
          "time": "7 months",
          "img": "/VideoImages/photo5.jpg",
    "videoUrl": "/MPS/play5.mp4"
        },
        {
          "id": 6,
          "title": "play 6",
          "author": "nba",
          "views": 1500,
          "time": "2 years",
          "img": "/VideoImages/photo6.jpg",
          "videoUrl": "/MPS/play6.mp4"
        },
        {
          "id": 7,
          "title": "play 7",
          "author": "nba",
          "views": 1500,
          "time": "2 years",
          "img": "/VideoImages/photo7.jpg",
          "videoUrl": "/MPS/play7.mp4"
        },
        {
          "id": 8,
          "title": "play 8",
          "author": "nba",
          "views": 1500,
          "time": "2 years",
          "img": "/VideoImages/photo8.jpg",
          "videoUrl": "/MPS/play8.mp4"
        },
        {
          "id": 9,
          "title": "play 9",
          "author": "nba",
          "views": 1500,
          "time": "2 years",
          "img": "/VideoImages/photo9.jpg",
          "videoUrl": "/MPS/play9.mp4"
        },
        {
          "id": 10,
          "title": "play 10",
          "author": "nba",
          "views": 1500,
          "time": "2 years",
          "img": "/VideoImages/photo10.jpg",
          "videoUrl": "/MPS/play10.mp4"
        }
      ]
      
;

export const VideoContext = createContext(videoData);
