export default class HealthBar {

    constructor(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.setDepth(3);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;  // This represents the proportion of the bar that represents full health

        this.draw();

        scene.add.existing(this.bar);
        this.bar.setScrollFactor(0);  // This ensures the bar doesn't move with the camera
    }

    decrease(amount) {
        this.value -= amount;
        if (this.value < 0) {
            this.value = 0;
        }
        this.draw();
        return (this.value === 0);
    }

    draw() {
        this.bar.clear();

        // Background
        this.bar.fillStyle(0x000000);  
        this.bar.fillRect(this.x, this.y, 80, 16);
        //Bar color
        this.bar.fillStyle(0x800080);  
        var d = Math.floor(this.p * this.value);  
        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }

}