import Phaser from 'phaser';
import Player from '../components/Player.js';
import GameMap from '../maps/GameMap.js';
import UIManager from '../ui/UIManager.js'; // Import UIManager

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.gameMap = new GameMap(this);
        this.uiManager = new UIManager(this);
    }

    preload() {
        const avatarUrl = window.playerAvatarUrl || 'default_avatar_url.png';   
        this.avatarUrl = avatarUrl     
        this.load.image('playerSprite', avatarUrl);
        this.load.plugin('rexCircleMaskImagePlugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcirclemaskimageplugin.min.js', true);
        this.gameMap.preload();
    }

    create() {
        this.uiManager.setupUI();
        const isCustom = this.isCustomAvatar(this.avatarUrl);
        this.player = new Player(this, 100, 400, 'playerSprite', isCustom);
        const { grassLayer, plantsLayer } = this.gameMap.create();
        this.gameMap.getScene().physics.add.collider(this.player.sprite, plantsLayer);
        
        const { width, height } = this.gameMap.getMapDimensions(); 
        this.physics.world.setBounds(0, 0, width, height);
        
        this.setupCamera();
        this.keys = this.input.keyboard.addKeys({
            w: 'W', a: 'A', s: 'S', d: 'D', esc: 'ESC'
        });
    }
    isCustomAvatar(avatarUrl) {
        console.log("This is herererererererere", avatarUrl)
        // Check if the URL contains the 'embed/avatars' segment which indicates a default avatar
        const isDefault = avatarUrl.includes('embed/avatars');
        // Return true if it's not a default avatar, meaning it's a custom avatar
        return !isDefault;
    }
    setupCamera() {
        const camera = this.cameras.main;
        const { width, height } = this.gameMap.getMapDimensions();
        camera.setBounds(0, 0, width, height);
        camera.setZoom(1.5);
        camera.startFollow(this.player.sprite);
    }
    update() {
        this.player.update(this.keys);
        
    }
}

export default MainScene;





