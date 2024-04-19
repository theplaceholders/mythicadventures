import Phaser from 'phaser';
import playerSheet from '../sprites/TX Player.png';
import buttonsSheet from "../sprites/TX GameButtons.png";
import Button from '../inputs/Button';
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
    }

    create() {
        this.lastDirection = 'down';
        // Create the player sprite with physics properties
        this.player = this.physics.add.sprite(100, 400, 'playerSheet', 0);
        
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
        const buttonY = 1000; 
        
        const settingsButton = new Button(this, buttonX, 100, 'settingsButton',4  ,"" ,this.openSettings, this, 1, 0, 2);
}
openSettings() {
    this.scene.pause(); // Pause MainScene
    this.scene.launch('SettingsScene'); // Launch Settings Scene
}
    update() {
        // Reset velocity each frame
        this.player.setVelocity(0);
        
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
