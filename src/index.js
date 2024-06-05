import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CommentsProvider } from './context/CommentsContext';
import { VideosProvider } from './context/VideosContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <CommentsProvider>
      <VideosProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </VideosProvider>
    </CommentsProvider>
  </UserProvider>
);
