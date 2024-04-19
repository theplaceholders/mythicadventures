import MainScene from "./scenes/mainScene";
import SettingsScene from "./scenes/settingsScene";
export function startGame(width, height, onGameExit) {
    const config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }, 
            },
        },
        scene: [MainScene, SettingsScene,],
    };

    const game = new Phaser.Game(config);
    game.onGameExit = onGameExit;
}


