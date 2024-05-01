import Phaser from 'phaser';

export default class Player {
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture).setOrigin(0.5, 0.5);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setSize(20, 18);
        this.sprite.body.setOffset(6, 40);
        this.sprite.setDepth(400);
        this.sprite.setScale(0.5);

        // Create and apply a circular mask
        this.createCircleMask(25);

        this.scene.input.on('pointerdown', (pointer) => {
            this.targetX = pointer.worldX;
            this.targetY = pointer.worldY;
            this.isMoving = true;
        });
        this.scene.input.on('pointermove', (pointer) => {
            this.updateRotationToMouse(pointer);
        });
        this.isMoving = false;
    }
    createCircleMask(radius) {
        this.maskGraphics = this.scene.make.graphics();
        this.maskGraphics.fillStyle(0xffffff);
        this.maskGraphics.beginPath();
        this.maskGraphics.arc(0, 0, radius, 0, Math.PI * 2); // Adjust the radius as needed
        this.maskGraphics.fillPath();
        this.maskGraphics.closePath();

        const mask = this.maskGraphics.createGeometryMask();
        this.sprite.setMask(mask);
        this.maskGraphics.setPosition(this.sprite.x, this.sprite.y);
    }

    updateMask() {
        this.maskGraphics.setPosition(this.sprite.x, this.sprite.y);
    }

    updateLastAngle() {
        if (this.targetX !== undefined && this.targetY !== undefined) {
            this.lastAngle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, this.targetX, this.targetY);
        }
    }

    update(keys) {
        this.updateRotationToMouse();
        // if (this.isMoving) {
        //     this.moveTowardsTarget();
        // }
        this.handleKeyboardInput(keys);
        this.updateMask();
    }
    updateRotationToMouse() {
        const camera = this.scene.cameras.main;
        const pointer = this.scene.input.activePointer;

        const cameraRelativeX = pointer.x + camera.scrollX;
        const cameraRelativeY = pointer.y + camera.scrollY;
    
        const angle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, cameraRelativeX, cameraRelativeY);
        this.sprite.rotation = angle;
    }
    
    // moveTowardsTarget() {
    //     const reachedX = Math.abs(this.sprite.x - this.targetX) < 5;
    //     const reachedY = Math.abs(this.sprite.y - this.targetY) < 5;
    //     console.log(`Moving to (${this.targetX}, ${this.targetY}) from (${this.sprite.x}, ${this.sprite.y}). Reached: ${reachedX && reachedY}`);
    //     if (reachedX && reachedY) {
    //         this.sprite.setVelocity(0, 0);
    //         this.isMoving = false;
    //     } else {
    //         const angle = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, this.targetX, this.targetY);
    //         this.sprite.setVelocityX(200 * Math.cos(angle));
    //         this.sprite.setVelocityY(200 * Math.sin(angle));
    //     }
    // }

    handleKeyboardInput(keys) {
        let vx = 0;
        let vy = 0;
        if (keys.a.isDown) {
            vx = -160;
        } else if (keys.d.isDown) {
            vx = 160;
        }
        if (keys.w.isDown) {
            vy = -160;
        } else if (keys.s.isDown) {
            vy = 160;
        }
        this.sprite.setVelocityX(vx);
        this.sprite.setVelocityY(vy);
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

