import React, { useState, useEffect, useRef } from 'react';

export const useAudioManager = ({ musicSrc, sfxSources }) => {
    const [musicAudio] = useState(() => new Audio(musicSrc));
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [sfxEnabled, setSfxEnabled] = useState(true);
    const sfxAudios = useRef({});

    // Create and manage audio objects for each sound effect
    useEffect(() => {
        // Initialize all SFX audio objects
        Object.keys(sfxSources).forEach(key => {
            sfxAudios.current[key] = new Audio(sfxSources[key]);
        });

        return () => {
            // Cleanup audio objects
            Object.values(sfxAudios.current).forEach(audio => {
                audio.pause();
            });
        };
    }, [sfxSources]); // Recreate when sfxSources changes

    const togglePlayPause = () => {
        if (musicAudio.paused) {
            musicAudio.play().catch(e => console.error('Error playing music:', e));
            setIsMusicPlaying(true);
        } else {
            musicAudio.pause();
            setIsMusicPlaying(false);
        }
    };

    const setVolume = (volume) => {
        musicAudio.volume = volume;
    };

    const toggleSfxEnabled = () => {
        setSfxEnabled(!sfxEnabled);
    };

    const playSFX = (key) => {
        if (sfxEnabled && sfxAudios.current[key]) {
            sfxAudios.current[key].currentTime = 0;
            sfxAudios.current[key].play().catch(e => console.error(`Error playing ${key} SFX:`, e));
        }
    };

    const setSFXVolume = (volume) => {
        if (sfxEnabled) {
            Object.values(sfxAudios.current).forEach(audio => {
                audio.volume = volume;
            });
        }
    };

    return { togglePlayPause, setVolume, setSFXVolume, playSFX, isMusicPlaying, toggleSfxEnabled, sfxEnabled };
};

export default useAudioManager;

