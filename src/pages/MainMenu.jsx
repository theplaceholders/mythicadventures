import React, { useState, useEffect } from 'react';
import { getUserProfiles } from '../utility/getUserProfiles';
import { useDebugLog } from '../utility/DebugLog';
import { getDiscordId } from '../discordApi/getDiscordId';

export const MainMenu = ({
  audioManager,
  userManager,
  onSelectCharacter,
  onSettings,
  auth
}) => {
  const debugLog = useDebugLog();
  useEffect(() => {
    const fetchData = async () => {

      debugLog(auth, "this is auth")
      const userData = await getDiscordId(auth)
      debugLog(JSON.stringify(userData), "this is user data")
      const profiles = await getUserProfiles(userData.id, debugLog);
      console.log(profiles);
      if (profiles) {
        userManager.setUserProfile(profiles);
      }
    };
    fetchData();
  }, [auth]);

  return (
    <div className="main-menu">
      <h1 className="game-title">MYTHIC ADVENTURES</h1>
      <img src="https://cdn.discordapp.com/avatars/606974608662331400/900cb74b8d7522e9542f80e7dfd8f575.png"/>

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
