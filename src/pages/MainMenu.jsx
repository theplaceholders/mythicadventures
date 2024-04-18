import React from 'react';

export const MainMenu = ({ onPlayGame, onCreateCharacter, onSettings }) => {
    return (
        <div className="main-menu">
            <h1 className="game-title">MYTHIC ADVENTURES</h1>
            <nav>
                <button id="btnPlayGame" onClick={onPlayGame}>Play Game</button>
                <button id="btnCreateCharacter" onClick={onCreateCharacter}>Create Character</button>
                <button id="btnSettings" onClick={onSettings}>Settings</button>
            </nav>
        </div>
    );
}

export default MainMenu;