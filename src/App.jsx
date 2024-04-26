import React, { useState, useEffect } from 'react';
import MainMenu from './pages/MainMenu';
import Settings from './pages/Settings';
import CreateCharacter from './pages/CreateCharacter';
import PhaserGame from './pages/PhaserGame'; // This would be your new component
import AudioManager from './utility/AudioManager';

import './styles/App.css';
import SelectCharacter from './pages/SelectCharacter';

function App() {
    const [currentPage, setCurrentPage] = useState('mainMenu');
    const [userProfile, setUserProfile] = useState({})
    const audioManager = new AudioManager();

    const renderPage = () => {
        switch (currentPage) {
            case 'mainMenu':
                return <MainMenu 
                    audioManager={audioManager}
                    userManager={{userProfile, setUserProfile}}
                    onSettings={() => setCurrentPage('settings')} 
                    // onCreateCharacter={() => setCurrentPage('createCharacter')}
                    onSelectCharacter={() => setCurrentPage('selectCharacter')}
                    onPlayGame={() => setCurrentPage('playGame')}/>;
            case 'settings':
                return <Settings 
                    audioManager={audioManager}
                    onBack={() => setCurrentPage('mainMenu')}/>;
            case 'createCharacter':
                return <CreateCharacter
                    audioManager={audioManager} 
                    onBack={() => setCurrentPage('selectCharacter')}/>;
            case 'selectCharacter':
                return <SelectCharacter
                    onCreateCharacter={() => setCurrentPage('createCharacter')}
                    audioManager={audioManager}
                    userManager={{userProfile, setUserProfile}} 
                    onBack={() => setCurrentPage('mainMenu')}/>;  
            case 'playGame':
                return <PhaserGame 
                    exitGame={() => setCurrentPage('mainMenu')} />;
            default:
                return <MainMenu 
                    audioManager={audioManager}
                    onSettings={() => setCurrentPage('settings')} />;
        }
    };

    return <div className="App">{renderPage()}</div>;
}

export default App;
