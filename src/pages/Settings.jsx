import React, { useState, useEffect } from 'react';

const Settings = ({
  setVolume,
  setSFXVolume,
  isMusicPlaying,
  playSFX,
  togglePlayPause,
  sfxEnabled,
  toggleSfxEnabled,
  onBack,
}) => {
  const [musicVolume, setMusicVolume] = useState(0.5); // Default volume
  const [sfxVolume, setSFXVolumeState] = useState(0.5); // Default volume

  // Apply volume updates
  useEffect(() => {
    setVolume(musicVolume);
    setSFXVolume(sfxVolume);
  }, [musicVolume, sfxVolume, setVolume, setSFXVolume]);

  return (
    <div className="settingsMenu">
      <h1>Settings</h1>
      <nav>
        <button
          onMouseEnter={() => playSFX('hover')}
          onClick={() => {
            playSFX(); // This will play the sound effect
            togglePlayPause(); // This will toggle the music playback
          }}
        >
          {isMusicPlaying ? 'Pause Music' : 'Play Music'}
        </button>
        <label htmlFor="musicVolumeSlider">Music Volume:</label>
        <input
          type="range"
          id="musicVolumeSlider"
          min="0"
          max="1"
          step="0.01"
          value={musicVolume}
          onChange={(e) => setMusicVolume(e.target.value)}
        />

        <label htmlFor="sfxVolumeSlider">SFX Volume:</label>
        <input
          type="range"
          id="sfxVolumeSlider"
          min="0"
          max="1"
          step="0.01"
          value={sfxVolume}
          onChange={(e) => setSFXVolumeState(e.target.value)}
        />

        <button
          onMouseEnter={() => playSFX('hover')}
          onClick={() => {
            playSFX(),toggleSfxEnabled(!sfxEnabled);
          }}

        >
          {sfxEnabled ? 'Disable SFX' : 'Enable SFX'}
        </button>
        <button
          onMouseEnter={() => playSFX('hover')}
          onClick={() => {
            playSFX('click');
            onBack();
          }}
        >
          Back
        </button>
      </nav>
    </div>
  );
};

export default Settings;
