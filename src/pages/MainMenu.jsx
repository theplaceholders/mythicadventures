import React, { useState, useEffect } from 'react';
import { getUserProfiles } from '../utility/getUserProfiles';



export const MainMenu = ({
  audioManager,
  userManager,
  onSelectCharacter,
  onSettings,
}) => {

  useEffect(() => {
    const userId = "123456789";
    const fetchData = async () => {
      const profiles = await getUserProfiles(userId);
      console.log(profiles);
      if (profiles) {
        userManager.setUserProfile(profiles);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main-menu">
      <h1 className="game-title">MYTHIC ADVENTURES</h1>
      <nav>
        <button
          id="btnPlayGame"
          onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            audioManager.playSFX('click');
              onSelectCharacter();
          }}
        >
          Play Game
        </button>
        <button
          id="btnSettings"
          onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            audioManager.playSFX('click');
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
