import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { SearchProvider } from './context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <UserProvider>
                <SearchProvider>
                  <App />
                </SearchProvider>     
        </UserProvider> 
    </BrowserRouter>
  </React.StrictMode>
);

