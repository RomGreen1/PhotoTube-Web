import './App.css';
import { DarkModeProvider } from './DarkModeContext';
import AppContent from './AppContent';
function App() {

  return (
    <DarkModeProvider>
   <AppContent/>
    </DarkModeProvider>
  );
}

export default App;
