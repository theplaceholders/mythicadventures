import buttonsSheet from '../sprites/TX GameButtons.png'

import Phaser from 'phaser';

class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, frame, text, onClick, context, overFrame, outFrame, downFrame) {
        super(scene, x, y);

        this.buttonSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, texture, frame);
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, {
            font: 'bold 20px Arial',
            color: '#ffffff'
        }).setOrigin(0.5, 0.5);

        this.add(this.buttonSprite);
        this.add(this.text);
        this.setSize(this.buttonSprite.width, this.buttonSprite.height);
        this.setInteractive({ useHandCursor: true }) 
            .on('pointerover', () => {
                scene.input.setDefaultCursor('pointer'); 
            })
            .on('pointerout', () => {
                scene.input.setDefaultCursor('default'); 
            })
            .on('pointerdown', () => {

            })
            .on('pointerup', () => {

                onClick.call(context);
            });

        scene.add.existing(this);
    }
}

export default Button;
