import React, { useState, useEffect } from 'react';

const Settings = ({
  setVolume,
  setSFXVolume,
  sfxVolume,
  musicVolume,
  isMusicPlaying,
  playSFX,
  togglePlayPause,
  sfxEnabled,
  toggleSfxEnabled,
  onBack,
}) => {
  // Local state for slider positions
  const [localMusicVolume, setLocalMusicVolume] = useState(musicVolume || 0); // Default to 0 if undefined
  const [localSFXVolume, setLocalSFXVolume] = useState(sfxVolume || 0); // Default to 0 if undefined
  
  // Sync local state with props
  useEffect(() => {
    setLocalMusicVolume(musicVolume);
    setLocalSFXVolume(sfxVolume);
  }, [musicVolume, sfxVolume]);

  // Handlers for volume changes
  const handleMusicVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setLocalMusicVolume(newVolume);
  };

  const handleSFXVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setSFXVolume(newVolume);
    setLocalSFXVolume(newVolume);
  };

  return (
    <div className="settingsMenu">
      <h1>Settings</h1>
      <nav>
        <button onClick={() => {
          playSFX('click');
          togglePlayPause();
        }}>
          {isMusicPlaying ? 'Pause Music' : 'Play Music'}
        </button>
        
        <label htmlFor="musicVolumeSlider">Music Volume:</label>
        <input
          type="range"
          id="musicVolumeSlider"
          min="0"
          max="1"
          step="0.01"
          value={localMusicVolume}
          onChange={handleMusicVolumeChange}
        />

        <label htmlFor="sfxVolumeSlider">SFX Volume:</label>
        <input
          type="range"
          id="sfxVolumeSlider"
          min="0"
          max="1"
          step="0.01"
          value={localSFXVolume}
          onChange={handleSFXVolumeChange}
        />

        <button onMouseEnter={() => playSFX('hover')} onClick={() => {
          playSFX('click');
          toggleSfxEnabled();
        }}>
          {sfxEnabled ? 'Disable SFX' : 'Enable SFX'}
        </button>
        
        <button onMouseEnter={() => playSFX('hover')} onClick={() => {
          playSFX('click');
          onBack();
        }}>
          Back
        </button>
      </nav>
    </div>
  );
};

export default Settings;

