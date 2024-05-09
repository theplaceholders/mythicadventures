    import Phaser from 'phaser';

    export default class Player {
        constructor(scene, x, y, texture, isCustom, playerData, uiManager) {
            this.playerData = playerData
            this.uiManager = uiManager
            this.isSprinting = null
            this.scene = scene;
            this.sprite = scene.physics.add.sprite(x, y, texture).setOrigin(0.5, 0.5);
            this.sprite.setCollideWorldBounds(true);
            this.sprite.body.setSize(20, 18);
            this.sprite.body.setOffset(6, 40);
            this.sprite.setDepth(400);
            if(isCustom) {
                this.sprite.setScale(0.5);
            } else {
                this.sprite.setScale(0.2);
            }
            this.circleMaskGraphics = null;
            this.auraMaskGraphics = null;

            this.createAuraMask(playerData.general.characterClass, 20)
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
            this.circleMaskGraphics = this.scene.make.graphics();
            this.circleMaskGraphics.fillStyle(0xffffff);
            this.circleMaskGraphics.beginPath();
            this.circleMaskGraphics.arc(0, 0, radius, 0, Math.PI * 2);
            this.circleMaskGraphics.fillPath();
            this.circleMaskGraphics.closePath();
            const mask = this.circleMaskGraphics.createGeometryMask();
            this.sprite.setMask(mask);
            this.circleMaskGraphics.setPosition(this.sprite.x, this.sprite.y);
        }
        
        createAuraMask(playerClass, radius) {
            this.auraMaskGraphics = this.scene.make.graphics();
            const colorMap = { Mage: 0x0000ff, Ranger: 0x00ff00, Warrior: 0xff0000 };
            const auraColor = colorMap[playerClass] || 0xffffff;
            
            // Set the fill style and start drawing
            this.auraMaskGraphics.fillStyle(auraColor, 1); // Ensure full opacity
            this.auraMaskGraphics.beginPath();
            this.auraMaskGraphics.arc(0, 0, radius + 10, 0, Math.PI * 2);this.auraMaskGraphics.fillPath();
            this.auraMaskGraphics.closePath();
            this.auraMaskGraphics.setDepth(2);
            // Debug: Draw directly on the scene for visibility
            this.scene.add.existing(this.auraMaskGraphics);
        }
        
        updateMaskPositions() {
            if (this.circleMaskGraphics) {
                this.circleMaskGraphics.setPosition(this.sprite.x, this.sprite.y);
            }
            if (this.auraMaskGraphics) {
                this.auraMaskGraphics.setPosition(this.sprite.x, this.sprite.y);
            }
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
            this.updateMaskPositions();
            
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
            let baseVelocity = 160;
            let velocityMultiplier = 1;
        
            // Check hasStamina from UIManager's staminaBar to allow sprinting
            if (keys.shiftLeft.isDown && this.uiManager.staminaBar.hasStamina) {
                velocityMultiplier += this.playerData.stats.sprintFactor;
                this.isSprinting = true;
            } else {
                this.isSprinting = false;
            }
        
            let vx = 0;
            let vy = 0;
        
            if (keys.a.isDown) {
                vx = -baseVelocity * velocityMultiplier;
            } else if (keys.d.isDown) {
                vx = baseVelocity * velocityMultiplier;
            }
        
            if (keys.w.isDown) {
                vy = -baseVelocity * velocityMultiplier;
            } else if (keys.s.isDown) {
                vy = baseVelocity * velocityMultiplier;
            }
        
            if (keys.esc.isDown) {
                this.openSettings();
            }
        
            // Apply the computed velocities to the sprite
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

