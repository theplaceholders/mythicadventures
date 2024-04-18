import Phaser, { CANVAS } from 'phaser';

export function startGame() {
    console.log('Starting game...');
    const gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.classList.add('visible');
    const config = {
        type: Phaser.WEBGL,
        width: 800,
        height: 600,
        canvas: gameCanvas
    };

    const game = new Phaser.Game(config);

    function preload() {
        this.load.image('player', 'assets/images/player.svg');
    }

    function create() {
        const player = this.add.sprite(400, 300, 'player');
    }

    function update() {
        // Update game state in each frame
    }
}

// Hide or remove elements related to character creation or main menu
document.addEventListener('DOMContentLoaded', () => {
    const playGameBtn = document.getElementById('btnPlayGame');
    playGameBtn.addEventListener('click', () => {
        startGame();
        document.getElementById('pageContainer').style.display = 'none';
        document.getElementById('pageContainer').remove();
    });
});