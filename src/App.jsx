import React, { useState } from 'react';
import './App.css';
import MainMenu from './pages/MainMenu'; // Import your MainMenu component
import Settings from './pages/Settings'; // Import your Settings component
import CreateCharacter from './pages/CreateCharacter'; // Import your CreateCharacter component

function App() {
  const [currentPage, setCurrentPage] = useState('mainMenu');

  const renderPage = () => {
    switch (currentPage) {
      case 'mainMenu':
        return <MainMenu 
                 onPlayGame={() => setCurrentPage('playGame')}
                 onCreateCharacter={() => setCurrentPage('createCharacter')}
                 onSettings={() => setCurrentPage('settings')}
               />;
      case 'settings':
        return <Settings 
        onBack={() => setCurrentPage('mainMenu')}
        
        />;
      case 'createCharacter':
        return <CreateCharacter 
        onBack={() => setCurrentPage('mainMenu')}
        
        />;
      // Define cases for other pages like 'playGame' here as well
      default:
        return <MainMenu />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;


