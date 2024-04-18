import React, { useState, useEffect } from 'react';
import AudioManager from '../utility/AudioManager';

const Settings = ({
  audioManager,
  toggleSfxEnabled,
  onBack,
}) => {
  const [musicVolumeValue, setMusicVolumeValue] = useState(0)
  const [sfxVolumeValue, setSfxVolumeValue] = useState(0)
  const [musicButtonText, setMusicButtonText] = useState('')
  const [sfxButtonText, setSfxButtonText] = useState('')
  useEffect(()=>{
    setMusicVolumeValue(AudioManager.musicAudio.volume)
    setSfxVolumeValue(AudioManager.sfxAudios.volume)
    setMusicButtonText(AudioManager.isMusicPlaying ? 'Pause Music' : 'Play Music')
    setSfxButtonText(AudioManager.sfxEnabled ? 'Disable SFX' : 'Enable SFX')
  })

  return (
    <div className="settingsMenu">
      <h1>Settings</h1>
      <nav>
        <button
          onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            audioManager.playSFX('click'); // This will play the sound effect
            audioManager.togglePlayPause(); // This will toggle the music playback
            setMusicButtonText(AudioManager.isMusicPlaying ? 'Pause Music' : 'Play Music')
          }}
        >
          {musicButtonText}
        </button>
        
        <label htmlFor="musicVolumeSlider">Music Volume:</label>
        <input
          type="range"
          id="musicVolumeSlider"
          min="0"
          max="1"
          step="0.01"
          value={musicVolumeValue}
          onChange={(e) => {
            setMusicVolumeValue(e.target.value);
            audioManager.setVolume(e.target.value);}}
        />

        <label htmlFor="sfxVolumeSlider">SFX Volume:</label>
        <input
          type="range"
          id="sfxVolumeSlider"
          min="0"
          max="1"
          step="0.01"
          value={sfxVolumeValue}
          onChange={(e) => {
            setSfxVolumeValue(e.target.value)
            audioManager.setSFXVolume(e.target.value);}}
        />

        <button
          onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            audioManager.playSFX('click'); 
            audioManager.toggleSfxEnabled();
            setSfxButtonText(AudioManager.sfxEnabled ? 'Disable SFX' : 'Enable SFX')
          }}

        >
          {sfxButtonText}
        </button>
        <button
          onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            audioManager.playSFX('click');
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

