import Phaser from 'phaser';
import playerSheet from '../sprites/TX Player.png';
import buttonsSheet from "../sprites/TX GameButtons.png";
import Button from '../inputs/Button';
import testMap from '../maps/testMap.json';
import grassSheet from '../sprites/TX Tileset Grass.png'
import plantsSheet from '../sprites/TX Plant.png'
class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // Load the player sprite sheet and the buttons sprite sheet
        this.load.spritesheet('playerSheet', playerSheet, { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('settingsButton', buttonsSheet, {
            frameWidth: 125,
            frameHeight: 130,
        });
        this.load.image("grass", grassSheet)
        this.load.image("plants", plantsSheet)
        this.load.tilemapTiledJSON("testMap", testMap)
    }

    create() {
        let camera = this.cameras.main;
        camera.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        camera.setZoom(1.5);
        camera.zoom = 1.5;
        
        this.physics.world.createDebugGraphic();
        this.physics.world.drawDebug = true;
        const startingMap = this.add.tilemap("testMap")
        const landscapeTiles = startingMap.addTilesetImage("Landscapes", "grass");
        const plantTiles = startingMap.addTilesetImage("Plants", "plants");
        const grassLayer = startingMap.createLayer("Bottom Layer ", landscapeTiles)
        grassLayer.setDepth(1);
        const plantsLayer = startingMap.createLayer("Top Layer", plantTiles)
        plantsLayer.setDepth(10);
        plantsLayer.setCollisionByProperty({ collide: true });
        plantsLayer.renderDebug(this.add.graphics(), {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding faces
        });
        this.lastDirection = 'down';
        this.player = this.physics.add.sprite(100, 400, 'playerSheet', 0);
        this.cameras.main.startFollow(this.player)

        this.physics.add.collider(this.player, plantsLayer);
        this.player.setOrigin(0.5, 1);
        this.player.setDepth(5);
        this.anims.create({
            key: 'walk-down',
            frames: [{ key: 'playerSheet', frame: 0 }],
            frameRate: 10
        });
        this.anims.create({
            key: 'walk-up',
            frames: [{ key: 'playerSheet', frame: 1 }],
            frameRate: 10
        });
        this.anims.create({
            key: 'walk-left',
            frames: [{ key: 'playerSheet', frame: 2 }],
            frameRate: 10
        });
        this.anims.create({
            key: 'walk-right',
            frames: [{ key: 'playerSheet', frame: 3 }],
            frameRate: 10
        });


        this.player.setCollideWorldBounds(true); // Keeps the player within the game bounds
        
        // Create key objects for WASD movement
        this.keys = this.input.keyboard.addKeys({
            w: 'W',
            a: 'A',
            s: 'S',
            d: 'D'
        });
        

        const buttonX = this.sys.game.config.width - 100; 
        const buttonY = 100; 
        
        const settingsButton = new Button(this, buttonX, buttonY, 'settingsButton',4  ,"" ,this.openSettings, this, 1, 0, 2);
}
openSettings() {
    this.scene.pause(); // Pause MainScene
    this.scene.launch('SettingsScene'); // Launch Settings Scene
}
    update() {
        // Reset velocity each frame
        this.player.setVelocity(0);
        this.player.setDepth(this.player.y);
        // Determine if any movement key is down
        let isMoving = false;
    
        // Handle horizontal movement
        if (this.keys.a.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('walk-left', true);
            this.player.flipX = false;
            this.lastDirection = 'left';
            isMoving = true;
        } else if (this.keys.d.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('walk-left', true); // Play 'walk-left' but with flipX true for right movement
            this.player.flipX = true;
            this.lastDirection = 'right';
            isMoving = true;
        }
        
        // Handle vertical movement
        if (this.keys.w.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play('walk-up', true);
            this.lastDirection = 'up';
            isMoving = true;
        } else if (this.keys.s.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('walk-down', true);
            this.lastDirection = 'down';
            isMoving = true;
        }
    
        // If no movement keys are pressed, set the idle frame based on the last direction
        if (!isMoving) {
            this.player.anims.stop();   
    
            // Set the player to the last direction they were facing
            switch (this.lastDirection) {
                case 'left':
                    this.player.setFrame(2); // Idle frame facing left
                    this.player.flipX = false;
                    break;
                case 'right':
                    this.player.setFrame(2); // Use the same frame as left, but flipped
                    this.player.flipX = true;
                    break;
                case 'up':
                    this.player.setFrame(1); // Idle frame facing up
                    break;
                case 'down':
                    this.player.setFrame(0); // Idle frame facing down
                    break;
            }
        }
    }
    
}

export default MainScene;
