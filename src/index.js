import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { UsersProvider } from './context/UsersContext';
import { CommentsProvider } from './context/CommentsContext';
import { VideosProvider } from './context/VideosContext';
import { SearchProvider } from './context/SearchContext';
import { LikesProvider } from './context/LikesContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <UserProvider>
          <VideosProvider>
            <CommentsProvider>
              <LikesProvider>
                <SearchProvider>
                  <App />
                </SearchProvider>
              </LikesProvider>
            </CommentsProvider>
          </VideosProvider>
        </UserProvider>
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>
);

