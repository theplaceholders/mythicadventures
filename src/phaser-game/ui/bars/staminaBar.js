export default class StaminaBar {
    constructor(scene, x, y, stamina, maxStamina) {
        console.log("Initializing StaminaBar with:", stamina, "current stamina and", maxStamina, "max stamina");
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.setDepth(3);
        this.x = x;
        this.y = y;
        this.value = stamina;
        this.maxValue = maxStamina;
        this.hasStamina = true;

        this.draw();

        scene.add.existing(this.bar);

        this.bar.setScrollFactor(0);
    }

    decrease(amount) {
        this.value -= amount;

        if (this.value <= 0) {
            this.value = 0;
            this.hasStamina = false; // Set hasStamina to false when value reaches 0
        }

        this.draw();

        return this.value === 0;
    }

    increase(amount) {
        this.value += amount;
        if (this.value > this.maxValue) {
            this.value = this.maxValue;
        }
        this.hasStamina = true; // Ensure hasStamina is true when increasing stamina
        this.draw();
    }

    draw() {
        this.bar.clear();

        // Background
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 80, 16);

        // Determine fill color based on stamina percentage
        if (this.value < this.maxValue * 0.3) {  // Consider stamina low if below 30% of max
            this.bar.fillStyle(0xff0000);  // Red when low
        } else {
            this.bar.fillStyle(0x00ff00);  // Green otherwise
        }

        // Calculate filled width based on current stamina
        var d = Math.floor((this.value / this.maxValue) * 76);  // Correctly calculate the width
        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
}
