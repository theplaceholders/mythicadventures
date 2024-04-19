import Phaser from 'phaser';

// Define a class that extends Phaser.Scene
class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('plant', './sprites/TX Plant.png');
        this.load.image('player', './sprites/TX Player.png');
        this.load.image('props', './sprites/TX Props.png');
        this.load.image('shadowPlant', './sprites/TX Shadow Plant.png');
        this.load.image('shadow', './sprites/TX Shadow.png');
        this.load.image('struct', './sprites/TX Struct.png');
        this.load.image('tilesetGrass', './sprites/TX Tileset Grass.png');
        this.load.image('tilesetStoneGround', './sprites/TX Tileset Stone Ground.png');
        this.load.image('tilesetWall', './sprites/TX Tileset Wall.png');
    }
    
    


    create() {
        // Add the player sprite
        this.player = this.add.sprite(400, 300, 'player');
        // Set up any other game objects here
    }

    update() {
        // Handle the game loop here
        // Update your game state in each frame
    }
}

// The startGame function will set up the game and its configuration
export function startGame() {
    console.log('Starting game...');
    const gameCanvas = document.getElementById('game');
    const config = {
        type: Phaser.WEBGL,
        width: 800,
        height: 600,
        canvas: gameCanvas,
        scene: [MainScene] // Add your scene to the list of scenes
    };

    const game = new Phaser.Game(config);
}
