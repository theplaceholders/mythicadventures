import Phaser from 'phaser';

export default class Player {
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture).setOrigin(0.5, 1);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setSize(20, 18);
        this.sprite.body.setOffset(6, 40);
        this.sprite.setDepth(400);
        this.lastDirection = 'down';
        this.createAnimations();
        this.scene.input.on('pointerdown', (pointer) => {
            this.targetX = pointer.worldX;
            this.targetY = pointer.worldY;
            this.isMoving = true;
            this.keyboardOverride = false; // Add a flag to manage control
        });
        this.isMoving = false;
        this.keyboardOverride = false; // Flag to detect keyboard intervention
    }

    update(keys) {
        if (this.isMoving && !this.keyboardOverride) {
            this.moveTowardsTarget();
        }
        this.handleKeyboardInput(keys);
    }

    moveTowardsTarget() {
        const reachedX = Math.abs(this.sprite.x - this.targetX) < 5;
        const reachedY = Math.abs(this.sprite.y - this.targetY) < 5;
        if (reachedX && reachedY) {
            this.sprite.setVelocity(0, 0);
            this.isMoving = false;
        } else {
            const angle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, this.targetX, this.targetY);
            this.sprite.setVelocityX(200 * Math.cos(angle));
            this.sprite.setVelocityY(200 * Math.sin(angle));
        }
    }

    handleKeyboardInput(keys) {
        if (keys.a.isDown || keys.d.isDown || keys.w.isDown || keys.s.isDown) {
            this.keyboardOverride = true; // Set override if any movement key is pressed
        }

        if (this.keyboardOverride) {
            let vx = 0;
            let vy = 0;
            if (keys.a.isDown) {
                vx = -160;
                this.sprite.anims.play('walk-left', true);
                this.sprite.flipX = false;
                this.lastDirection = 'left';
            } else if (keys.d.isDown) {
                vx = 160;
                this.sprite.anims.play('walk-right', true);
                this.sprite.flipX = true;
                this.lastDirection = 'right';
            }
            if (keys.w.isDown) {
                vy = -160;
                this.sprite.anims.play('walk-up', true);
                this.lastDirection = 'up';
            } else if (keys.s.isDown) {
                vy = 160;
                this.sprite.anims.play('walk-down', true);
                this.lastDirection = 'down';
            }

            this.sprite.setVelocityX(vx);
            this.sprite.setVelocityY(vy);

            if (vx === 0 && vy === 0) {
                this.sprite.setVelocity(0, 0); // Stop moving
                this.sprite.anims.stop();
                this.setIdleFrame();
            }
        }
    }

    setIdleFrame() {
        switch (this.lastDirection) {
            case 'left':
                this.sprite.setFrame(2);
                this.sprite.flipX = false;
                break;
            case 'right':
                this.sprite.setFrame(2);
                this.sprite.flipX = true;
                break;
            case 'up':
                this.sprite.setFrame(1);
                break;
            case 'down':
                this.sprite.setFrame(0);
                break;
        }
    }

    createAnimations() {
        this.scene.anims.create({ key: 'walk-down', frames: [{ key: 'playerSheet', frame: 0 }], frameRate: 10 });
        this.scene.anims.create({ key: 'walk-up', frames: [{ key: 'playerSheet', frame: 1 }], frameRate: 10 });
        this.scene.anims.create({ key: 'walk-right', frames: [{ key: 'playerSheet', frame: 2 }], frameRate: 10 });
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
}
