import Phaser from 'phaser';
import Button from '../inputs/Button'; // Adjust path as needed
import ButtonsSheet from '../sprites/TX GameButtons.png';
class SettingsScene extends Phaser.Scene {
  constructor() {
    super('SettingsScene');
  }

  preload() {
    this.load.spritesheet('buttons', ButtonsSheet, {
      frameWidth: 250, // Assuming each button's width
      frameHeight: 125, // Assuming each button's height
    });
  }

  create() {
    // Create a container
    this.menuContainer = this.add.container();

    const buttonTitles = ['Back', 'Audio', 'Controls', 'Graphics', 'Exit'];
    let totalHeight = 0; // This will track the total height of all buttons

    buttonTitles.forEach((title, index) => {
      // Set y position for buttons with some vertical spacing
      let y = index * 150; // This will be relative to the container's position
      totalHeight += 150; // Update the total height
      let menuItem = this.createMenuItem(title, 0, y, title); // Set x to 0 since it will be centered later
      this.menuContainer.add(menuItem);
    });

    // Assuming all buttons have the same width and height
    const buttonWidth = 300; // The width of each button
    const buttonHeight = 130; // The height of each button
    totalHeight = buttonTitles.length * buttonHeight; // Total height of all buttons including spacing

    // Center the container on the screen
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Adjust container position to center
    this.menuContainer.setPosition(centerX, centerY - totalHeight / 2);
  }

  createMenuItem(text, x, y, label) {
    let button = new Button(
      this,
      x,
      y,
      'buttons',
      5,
      label,
      () => {
        this.handleMenuItemClick(text);
      },
      this,
      1,
      0,
      2
    );

    this.menuContainer.add(button);

    return button;
  }

  handleMenuItemClick(item) {
    console.log(item + ' clicked');
    switch (item) {
      case 'Back':
        this.scene.stop();
        this.scene.resume('MainScene');
        break;
      case 'Audio':
        // Handle audio settings
        break;
      case 'Controls':
        // Handle control settings
        break;
      case 'Graphics':
        // Handle graphics settings
        break;
      case 'Exit':
        this.game.destroy(true); // This will destroy the Phaser game instance
        if (this.game.onGameExit) {
          this.game.onGameExit(); // Call the callback passed from React
        }
        break;
      default:
        console.warn('Unknown item clicked:', item);
    }
  }
}

export default SettingsScene;
