
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './signIn/SignIn';
import RegisterPage from './Registration/RegistrPage';
import HomePage from './Home/Home';
import VideoPage from './VideoPage/VideoPage';
import AddVideo from './Videos/AddVideo';

function App() {
  return (
    <div className="app">
      <Routes>
      <Route path="/video/:id" element={<VideoPage />} /> 
        <Route path="/" element={<HomePage />} />
          <Route path="/add-video" element={<AddVideo />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
