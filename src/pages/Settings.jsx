import React, { useEffect, useState } from 'react';
import { MainMenu } from './MainMenu.jsx'; 
import { audioManager } from '../utility/AudioManager';
import { debugLog } from '../utility/debug';

export function Settings({ onBack }) {
    // State to store and control the values for volume settings
    const [musicVolume, setMusicVolume] = useState(audioManager.musicPlayer.volume);
    const [sfxVolume, setSFXVolume] = useState(audioManager.sfxPlayer.volume);

    useEffect(() => {
        debugLog('Settings component mounted.');

        // Set volume to the latest state when it changes
        audioManager.setVolume(musicVolume);
        audioManager.setSFXVolume(sfxVolume);

        // Play sound effects when navigating back as a user interaction example
        return () => {
            audioManager.playSFX();
        };
    }, [musicVolume, sfxVolume]); // Depend on volume state so effects run on their updates

    // Handler for toggling music play/pause
    const handleToggleMusic = () => {
        const status = audioManager.togglePlayPause();
        debugLog(`Music toggled: ${status}`);
    };

    // Handlers for volume changes
    const handleMusicVolumeChange = (event) => {
        setMusicVolume(event.target.value);
    };

    const handleSFXVolumeChange = (event) => {
        setSFXVolume(event.target.value);
    };

    return (
        <div className="settingsMenu">
            <h1>Settings</h1>
            <nav>
                <button id="btnToggleMusic" onClick={handleToggleMusic}>
                    {audioManager.musicPlayer.paused ? 'Play Music' : 'Pause Music'}
                </button>
                <label htmlFor="musicVolumeSlider">Music Volume:</label>
                <input 
                    type="range" 
                    id="musicVolumeSlider" 
                    min="0" max="1" 
                    step="0.01" 
                    value={musicVolume} 
                    onChange={handleMusicVolumeChange} 
                />

                <label htmlFor="sfxVolumeSlider">SFX Volume:</label>
                <input 
                    type="range" 
                    id="sfxVolumeSlider" 
                    min="0" max="1" 
                    step="0.01" 
                    value={sfxVolume} 
                    onChange={handleSFXVolumeChange} 
                />

                <button id="btnBack" onClick={onBack}>Back</button>
            </nav>
        </div>
    );
}

export default Settings;
