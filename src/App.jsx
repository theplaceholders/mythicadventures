import React, { useMemo, useState } from 'react';
import { useAudioManager } from './utility/AudioManager';
import MainMenu from './pages/MainMenu';
import Settings from './pages/Settings';
import CreateCharacter from './pages/CreateCharacter';

import backgroundMusic from './assets/audio/2019-11-30_-_No_More_Good_-_David_Fesliyan.mp3';
import hoverSound from './assets/audio/hover.wav'
import click from './assets/audio/click.mp3'
import './styles/App.css'
const sfxSources = {
  click: click,
  hover: hoverSound
};
function App() {
    const {
        setVolume, 
        setSFXVolume, 
        isMusicPlaying, 
        playSFX, 
        togglePlayPause, 
        sfxEnabled, 
        toggleSfxEnabled
    } = useAudioManager({
        musicSrc: backgroundMusic,
        sfxSources: sfxSources
    });

    const [currentPage, setCurrentPage] = useState('mainMenu');

    const renderPage = () => {
        switch (currentPage) {
            case 'mainMenu':
                return <MainMenu 
                onSettings={() => setCurrentPage('settings')} 
                onCreateCharacter={() => setCurrentPage('createCharacter')}
                onPlayGame={() => setCurrentPage('playGame')}
                playSFX={playSFX}
                sfxEnabled={sfxEnabled}
                />;
            case 'settings':
                return <Settings 
                            onBack={() => setCurrentPage('mainMenu')}
                            togglePlayPause={togglePlayPause}
                            isMusicPlaying={isMusicPlaying}
                            setVolume={setVolume}
                            setSFXVolume={setSFXVolume}
                            playSFX={playSFX}
                            sfxEnabled={sfxEnabled}
                            toggleSfxEnabled={toggleSfxEnabled}
                        />;
            case 'createCharacter':
                return <CreateCharacter 
                onBack={() => setCurrentPage('mainMenu')} 
                playSFX={playSFX}
                />;
            default:
                return <MainMenu onSettings={() => setCurrentPage('settings')} />;
        }
    };

    return <div className="App">{renderPage()}</div>;
}

export default App;


