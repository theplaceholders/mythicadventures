import Phaser from 'phaser';
import plantSheet from './sprites/TX Plant.png';
import playerSheet from './sprites/TX Player.png';
import propsSheet from './sprites/TX Props.png';
import shadowPlantSheet from './sprites/TX Shadow Plant.png';
import shadowSheet from './sprites/TX Shadow.png';
import structSheet from './sprites/TX Struct.png';
import tilesetGrassSheet from './sprites/TX Tileset Grass.png';
import tilesetStoneGroundSheet from './sprites/TX Tileset Stone Ground.png';
import tilesetWallSheet from './sprites/TX Tileset Wall.png';

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.spritesheet('plantSheet', plantSheet, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerSheet', playerSheet, { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('propsSheet', propsSheet, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('shadowPlantSheet', shadowPlantSheet, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('shadowSheet', shadowSheet, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('structSheet', structSheet, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('tilesetGrassSheet', tilesetGrassSheet, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('tilesetStoneGroundSheet', tilesetStoneGroundSheet, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('tilesetWallSheet', tilesetWallSheet, { frameWidth: 32, frameHeight: 32 });
    }

    create() {
       this.player = this.add.sprite(100, 400, "playerSheet")
    }

    update() {
        // Game update loop.
    }
}

export function startGame(width, height) {

    
    const config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        scene: [MainScene]
    };

    new Phaser.Game(config);
}

