import React from 'react';

export const MainMenu = ({
  playSFX,
  onPlayGame,
  onCreateCharacter,
  onSettings,
}) => {
  return (
    <div className="main-menu">
      <h1 className="game-title">MYTHIC ADVENTURES</h1>
      <nav>
        <button
          id="btnPlayGame"
          onMouseEnter={() => playSFX('hover')}
          onClick={() => {
            playSFX('click');
            onPlayGame();
          }}
        >
          Play Game
        </button>
        <button
          id="btnCreateCharacter"
          onMouseEnter={() => playSFX('hover')}
          onClick={() => {
            playSFX('click');
            onCreateCharacter();
          }}
        >
          Create Character
        </button>
        <button
          id="btnSettings"
          onMouseEnter={() => playSFX('hover')}
          onClick={() => {
            playSFX('click');
            onSettings();
          }}
        >
          Settings
        </button>
      </nav>
    </div>
  );
};

export default MainMenu;
