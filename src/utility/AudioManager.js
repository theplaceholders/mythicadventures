import backgroundMusic from '../assets/audio/2019-11-30_-_No_More_Good_-_David_Fesliyan.mp3';
import hoverSound from '../assets/audio/hover.wav'
import click from '../assets/audio/click.mp3'
const sfxSources = {
    click: click,
    hover: hoverSound
};

export class AudioManager{
    static musicAudio = new Audio(backgroundMusic);
    static isMusicPlaying = false;
    static sfxEnabled = true;
    static sfxAudios = {};

    constructor(){
        if(Object.keys(AudioManager.sfxAudios).length == 0){
            Object.keys(sfxSources).forEach(key=>{
                AudioManager.sfxAudios[key] = new Audio(sfxSources[key])
            });
            AudioManager.sfxAudios.volume = 1;
        }
    }

    togglePlayPause(){
        if (AudioManager.musicAudio.paused) {
            AudioManager.musicAudio.play().catch(e => console.error('Error playing music:', e));
            AudioManager.isMusicPlaying = true;
        } else {
            AudioManager.musicAudio.pause();
            AudioManager.isMusicPlaying = false;
        }
    };

    setVolume(volume){
        AudioManager.musicAudio.volume = volume
    };

    toggleSfxEnabled(){
        AudioManager.sfxEnabled = !AudioManager.sfxEnabled;
    };

    playSFX(key){
        if (AudioManager.sfxEnabled) {
            AudioManager.sfxAudios[key].currentTime = 0;
            AudioManager.sfxAudios[key].play().catch(e => console.error(`Error playing ${key} SFX:`, e));
        }
    };

    setSFXVolume(volume){
        AudioManager.sfxAudios.volume = volume;
        Object.keys(AudioManager.sfxAudios).forEach(key=>{
            if(key != "volume")
            AudioManager.sfxAudios[key].volume = parseFloat(volume)
        })
    };
};

export default AudioManager;

