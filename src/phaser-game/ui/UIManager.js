// UIManager.js
import HealthBar from "./bars/healthBar";  // Adjust path as necessary
import StaminaBar from "./bars/staminaBar";
import ManaBar from "./bars/manaBar";
export default class UIManager  {
    constructor(scene, playerData) {
        this.scene = scene;
        this.playerData = playerData;
        this.playerClass = playerData.general.characterClass;
        this.isRegenerating = false;
    
        // Initialize bars before setting them up
        this.healthBar = new HealthBar(this.scene, 220, 125, this.playerData.health, this.playerData.maxHealth);
        this.staminaBar = new StaminaBar(this.scene, 220, 155, this.playerData.stats.stamina, this.playerData.stats.maxStamina);
        this.manaBar = this.playerClass === "Mage" ? new ManaBar(this.scene, 220, 185, this.playerData.mana, this.playerData.maxMana) : null;
    
        this.setupBars();
    }
    setupBars() {
        if (this.playerClass === "Mage") {
            this.ManaBar = new ManaBar(this.scene, 220, 185, this.playerData.mana, this.playerData.maxMana);
        }
        this.healthBar = new HealthBar(this.scene, 220, 125, this.playerData.health, this.playerData.maxHealth);
        this.staminaBar = new StaminaBar(this.scene, 220, 155, this.playerData.stats.stamina, this.playerData.stats.maxStamina);
        this.hasStamina = this.staminaBar.hasStamina;
    }

    startStaminaRegeneration() {
        if (!this.isRegenerating) {
            this.regenerationTimer = this.scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    if (this.staminaBar.value < this.playerData.stats.maxStamina) {
                        this.staminaBar.increase(10);
                    }
                },
                callbackScope: this,
                loop: true
            });
            this.isRegenerating = true;
        }
    }

    stopStaminaRegeneration() {
        if (this.regenerationTimer && this.isRegenerating) {
            this.regenerationTimer.remove();
            this.isRegenerating = false;
        }
    }

    updateHealth(percentage) {
        const decreaseAmount = this.healthBar.value - percentage;
        this.healthBar.decrease(decreaseAmount);
    }
    updateMana(percentage) {
        const decreaseAmount = this.ManaBar.value - percentage;
        this.ManaBar.decrease(decreaseAmount);
    }
    updateStamina(percentage) {
        if (!this.staminaBar) {
            console.error("StaminaBar is not initialized.");
            return;
        }
        const decreaseAmount = this.staminaBar.maxValue * (percentage / 100);
        this.staminaBar.decrease(decreaseAmount);
    }
    updateHasStamina() {
        this.hasStamina = this.staminaBar.hasStamina;
    }

}
