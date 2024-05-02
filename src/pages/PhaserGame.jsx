import React, { useEffect } from 'react';
import { startGame } from '../phaser-game/game';

const PhaserGame = ({ exitGame, avatarUrl }) => {
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    startGame(width, height, exitGame, avatarUrl);

    return () => {

    };
  }, [exitGame]);

  return <div id="game-container" />;
};

export default PhaserGame;