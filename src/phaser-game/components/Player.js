import Phaser from 'phaser';

export default class Player {
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture).setOrigin(0.5, 1);
        this.sprite.setCollideWorldBounds();
        this.sprite.body.setSize(20, 18);
        this.sprite.body.setOffset(6, 40);
        this.sprite.setDepth(400);
        this.lastDirection = 'down'; 
        this.createAnimations();
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'walk-down',
            frames: [{ key: 'playerSheet', frame: 0 }],
            frameRate: 10
        });
        this.scene.anims.create({
            key: 'walk-up',
            frames: [{ key: 'playerSheet', frame: 1 }],
            frameRate: 10
        });
        this.scene.anims.create({
            key: 'walk-left',
            frames: [{ key: 'playerSheet', frame: 2 }],
            frameRate: 10
        });
        this.scene.anims.create({
            key: 'walk-right',
            frames: [{ key: 'playerSheet', frame: 3 }],
            frameRate: 10
        });
    }
    openSettings() {
        // Check if the SettingsScene is already running
        const settingsScene = this.scene.scene.get('SettingsScene');
        if (settingsScene && settingsScene.scene.isActive()) {
            // SettingsScene is already active, no action needed
        } else {
            // Pause the MainScene and launch the SettingsScene
            this.scene.scene.pause('MainScene');
            this.scene.scene.launch('SettingsScene');
        }
    }
    
    
    
    update(keys) {
        this.sprite.setVelocity(0);
        let isMoving = false;

        if(keys.esc.isDown){
            this.openSettings()
        }
        if (keys.a.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.anims.play('walk-left', true);
            this.sprite.flipX = false;
            this.lastDirection = 'left';
            isMoving = true;
        } else if (keys.d.isDown) {
            this.sprite.setVelocityX(500);
            this.sprite.anims.play('walk-left', true); // Play 'walk-left' with flipX true for right movement
            this.sprite.flipX = true;
            this.lastDirection = 'right';
            isMoving = true;
        }

        if (keys.w.isDown) {
            this.sprite.setVelocityY(-160);
            this.sprite.anims.play('walk-up', true);
            this.lastDirection = 'up';
            isMoving = true;
        } else if (keys.s.isDown) {
            this.sprite.setVelocityY(160);
            this.sprite.anims.play('walk-down', true);
            this.lastDirection = 'down';
            isMoving = true;
        }

        // Set the idle frame if no movement keys are pressed
        if (!isMoving) {
            this.sprite.anims.stop();
            switch (this.lastDirection) {
                case 'left':
                    this.sprite.setFrame(2); // Idle frame facing left
                    this.sprite.flipX = false;
                    break;
                case 'right':
                    this.sprite.setFrame(2); // Use the same frame as left, but flipped
                    this.sprite.flipX = true;
                    break;
                case 'up':
                    this.sprite.setFrame(1); // Idle frame facing up
                    break;
                case 'down':
                    this.sprite.setFrame(0); // Idle frame facing down
                    break;
            }
        }
    }
}

