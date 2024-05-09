import Phaser from 'phaser';
import plantsSheet from '../sprites/TX Plant.png';
import grassSheet from '../sprites/TX Tileset Grass.png';
import testMap from './testMap.json';

export default class GameMap {
    constructor(scene) {
        this.scene = scene;
        this.map = null;
    }

    preload() {
        this.scene.load.image("grass", grassSheet);
        this.scene.load.image("plants", plantsSheet);
        this.scene.load.tilemapTiledJSON("testMap", testMap);
    }

    create() {
        this.map = this.scene.add.tilemap("testMap");
        const camera = this.scene.cameras.main;
        
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        camera.setZoom(1.5);

        const landscapeTiles = this.map.addTilesetImage("Landscapes", "grass");
        const plantTiles = this.map.addTilesetImage("Plants", "plants");

        const grassLayer = this.map.createLayer("Bottom Layer ", landscapeTiles, 0, 0);
        const plantsLayer = this.map.createLayer("Tree Layer", plantTiles, 0, 0);

        grassLayer.setDepth(1);
        plantsLayer.setDepth(1);
        plantsLayer.setCollisionByProperty({ collide: true });

        this.scene.physics.world.createDebugGraphic();
        this.scene.physics.world.drawDebug = true;

        plantsLayer.renderDebug(this.scene.add.graphics(), {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });
        return { grassLayer, plantsLayer };
    }

    getScene() {
        return this.scene;
    }

    getMapDimensions() {
        if (this.map) {
            return { width: this.map.widthInPixels, height: this.map.heightInPixels };
        }
        return { width: 0, height: 0 }; // Default or error handling
    }
}


