function createAudioManager() {
    // Music setup
    const musicPlayer = document.createElement('audio');
    musicPlayer.loop = true;
    const musicSource = document.createElement('source');
    musicSource.src = './assets/audio/2019-11-30_-_No_More_Good_-_David_Fesliyan.mp3';
    musicSource.type = 'audio/mpeg';  // Correct MIME type for MP3 files
    musicPlayer.appendChild(musicSource);
    document.body.appendChild(musicPlayer);

    // SFX setup
    const sfxPlayer = document.createElement('audio');
    const sfxSource = document.createElement('source');
    sfxSource.src = './assets/audio/analog-appliance-button-15-186961.mp3';
    sfxSource.type = 'audio/mpeg';  // Correct MIME type for MP3 files
    sfxPlayer.appendChild(sfxSource);
    document.body.appendChild(sfxPlayer);

    // Functions to control music and SFX
    function playMusic() {
        musicPlayer.play().catch(e => console.error('Error playing music:', e));
    }

    function pauseMusic() {
        musicPlayer.pause();
    }

    function togglePlayPause() {
        if (musicPlayer.paused) {
            playMusic();
            return 'Pause Music';
        } else {
            pauseMusic();
            return 'Play Music';
        }
    }

    function setVolume(volume) {
        musicPlayer.volume = volume;
    }

    function playSFX() {
        sfxPlayer.currentTime = 0;
        sfxPlayer.play().catch(e => console.error('Error playing SFX:', e));
    }

    function setSFXVolume(volume) {
        sfxPlayer.volume = volume;
    }

    // Returning the functions so they can be used outside this setup function
    return {
        togglePlayPause,
        setVolume,
        setSFXVolume,
        playSFX,
        playMusic,
        musicPlayer,
        sfxPlayer
    };
}

const audioManager = createAudioManager();
export { audioManager };
