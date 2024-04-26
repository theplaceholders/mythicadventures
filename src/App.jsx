import React, { useState, useEffect } from 'react';
import MainMenu from './pages/MainMenu';
import Settings from './pages/Settings';
import CreateCharacter from './pages/CreateCharacter';
import PhaserGame from './pages/PhaserGame'; // This would be your new component
import AudioManager from './utility/AudioManager';

import './styles/App.css';
import SelectCharacter from './pages/SelectCharacter';

function App() {
  const [characterCreationSlot, setCharacterCreationSlot] = useState(null);
  const [currentPage, setCurrentPage] = useState('mainMenu');
  const [userProfile, setUserProfile] = useState({});
  const audioManager = new AudioManager();

  const renderPage = () => {
    switch (currentPage) {
      case 'mainMenu':
        return (
          <MainMenu
            audioManager={audioManager}
            userManager={{ userProfile, setUserProfile }}
            onSettings={() => setCurrentPage('settings')}
            // onCreateCharacter={() => setCurrentPage('createCharacter')}
            onSelectCharacter={() => setCurrentPage('selectCharacter')}
            onPlayGame={() => setCurrentPage('playGame')}
          />
        );
      case 'settings':
        return (
          <Settings
            audioManager={audioManager}
            onBack={() => setCurrentPage('mainMenu')}
          />
        );
      case 'createCharacter':
        return (
            <CreateCharacter
            slotIndex={characterCreationSlot}
            audioManager={audioManager} 
            onBack={() => {
                setCharacterCreationSlot(null); // Reset the slotIndex when going back
                setCurrentPage('selectCharacter');
            }}/>
        );
      case 'selectCharacter':
        return (
          <SelectCharacter
            onCreateCharacter={(slotIndex) => {
              // Here, you can now store the slotIndex in a state, or pass it to the CreateCharacter page in some way
              setCharacterCreationSlot(slotIndex); // Assuming you have a state setter for storing the selected slot
              setCurrentPage('createCharacter');
            }}
            audioManager={audioManager}
            userManager={{ userProfile, setUserProfile }}
            onBack={() => setCurrentPage('mainMenu')}
          />
        );
      case 'playGame':
        return <PhaserGame exitGame={() => setCurrentPage('mainMenu')} />;
      default:
        return (
          <MainMenu
            audioManager={audioManager}
            onSettings={() => setCurrentPage('settings')}
          />
        );
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
