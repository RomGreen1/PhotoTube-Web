
import './App.css';

import { DarkModeProvider } from '../context/DarkModeContext';
import AppContent from './AppContent';
function App() {

  return (
    <DarkModeProvider>
   <AppContent/>
    </DarkModeProvider>
  );
}

export default App;
