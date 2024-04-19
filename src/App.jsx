import React, { useState } from 'react';
import MainMenu from './pages/MainMenu';
import Settings from './pages/Settings';
import CreateCharacter from './pages/CreateCharacter';
import AudioManager from './utility/AudioManager';

import './styles/App.css'
import { startGame } from './phaser-game/game';



function App() {
    const [currentPage, setCurrentPage] = useState('mainMenu');
    let audioManager = new AudioManager();
    

    const renderPage = () => {
        switch (currentPage) {
            case 'mainMenu':
                return <MainMenu 
                audioManager={audioManager}
                onSettings={() => setCurrentPage('settings')} 
                onCreateCharacter={() => setCurrentPage('createCharacter')}
                onPlayGame={() => setCurrentPage('playGame')}/>;
            case 'settings':
                return  <Settings 
                          audioManager={audioManager}
                          onBack={() => setCurrentPage('mainMenu')}/>;
            case 'createCharacter':
                return <CreateCharacter
                          audioManager={audioManager} 
                          onBack={() => setCurrentPage('mainMenu')}/>;
            case 'playGame':
                var w = window.innerWidth;
                var h = window.innerHeight;
                startGame(w, h);
                return <div id="game"></div>
            default:
                return  <MainMenu 
                          audioManager={audioManager}
                          onSettings={() => setCurrentPage('settings')}/>;
        }
    };


  return <div className="App">{renderPage()}</div>;
}

export default App;
