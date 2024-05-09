import Phaser from 'phaser';
import Player from '../components/Player.js';
import GameMap from '../maps/GameMap.js';
import UIManager from '../ui/UIManager.js'; // Import UIManager

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.gameMap = new GameMap(this);
    }

    preload() {
        const avatarUrl = window.playerAvatarUrl || 'default_avatar_url.png';   
        this.avatarUrl = avatarUrl   
        this.load.image('playerSprite', avatarUrl);
        this.gameMap.preload();
    }

    create() {
        const isCustom = this.isCustomAvatar(this.avatarUrl);
        this.playerData = this.setupPlayerData();
        this.uiManager = new UIManager(this, this.playerData);


        this.player = new Player(this, 100, 400, 'playerSprite', isCustom, this.playerData, this.uiManager);
        const {plantsLayer } = this.gameMap.create();
        this.gameMap.getScene().physics.add.collider(this.player.sprite, plantsLayer);
        
        const { width, height } = this.gameMap.getMapDimensions(); 
        this.physics.world.setBounds(0, 0, width, height);
        
        this.setupCamera();
        this.keys = this.input.keyboard.addKeys({
            w: 'W', a: 'A', s: 'S', d: 'D', esc: 'ESC', shiftLeft: 'SHIFT'
        });
    }
    isCustomAvatar(avatarUrl) {
        console.log("This is herererererererere", avatarUrl, avatarUrl.includes('embed/avatars'))
        // Check if the URL contains the 'embed/avatars' segment which indicates a default avatar
        // Return true if it's not a default avatar, meaning it's a custom avatar
        return !avatarUrl.includes('embed/avatars');
    }
    setupCamera() {
        const camera = this.cameras.main;
        const { width, height } = this.gameMap.getMapDimensions();
        camera.setBounds(0, 0, width, height);
        camera.setZoom(1.5);
        camera.startFollow(this.player.sprite);
    }

    setupPlayerData() {
        return window.playerData; 
    }

    update(time, delta) {
        this.player.update(this.keys);
        if (this.player.isSprinting && this.uiManager.hasStamina) {
            if (!this.player.wasSprintingLastFrame) {
                this.uiManager.stopStaminaRegeneration();
            }
            this.uiManager.updateStamina(10 * (delta / 1000)); // Adjusting the rate according to the frame time
        } else {
            if (this.player.wasSprintingLastFrame) {
                this.uiManager.startStaminaRegeneration();
            }
        }
        this.player.wasSprintingLastFrame = this.player.isSprinting; // Track sprinting status across frames
    }
}

export default MainScene;





