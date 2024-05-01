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
        this.load.image('playerSprite', 'https://cdn.discordapp.com/avatars/606974608662331400/900cb74b8d7522e9542f80e7dfd8f575.png');
        this.load.plugin('rexCircleMaskImagePlugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcirclemaskimageplugin.min.js', true);
        this.gameMap.preload();
    }

    create() {
        this.uiManager.setupUI();

        this.player = new Player(this, 100, 400, 'playerSprite');
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





