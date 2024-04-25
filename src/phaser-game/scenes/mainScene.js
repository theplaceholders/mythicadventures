import Phaser from 'phaser';
import Player from '../components/Player.js';
import playerSheet from '../sprites/TX Player.png';
import GameMap from '../maps/GameMap.js';
import UIManager from '../ui/UIManager.js'; // Import UIManager

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.gameMap = new GameMap(this);
        this.uiManager = new UIManager(this);
    }
    preload() {
        this.load.spritesheet('playerSheet', playerSheet, { frameWidth: 32, frameHeight: 64 });
        this.gameMap.preload();
    }

    create() {
        this.uiManager.setupUI();
        this.player = new Player(this, 100, 400, 'playerSheet');
        const { grassLayer, plantsLayer } = this.gameMap.create();
        this.gameMap.getScene().physics.add.collider(this.player.sprite, plantsLayer);
        
        const { width, height } = this.gameMap.getMapDimensions(); 
        this.physics.world.setBounds(0, 0, width, height);
        
        this.setupCamera();
        this.keys = this.input.keyboard.addKeys({
            w: 'W', a: 'A', s: 'S', d: 'D', esc: 'ESC'
        });
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





