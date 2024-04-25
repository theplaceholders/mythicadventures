import React, { useState, useEffect } from 'react';

function getUserProfile(userId){
  if(userId){
    return {id:"test123-1", class:"developer", race:"stoopid"}
  }
  return {}
}

export const MainMenu = ({
  audioManager,
  userManager,
  onSelectCharacter,
  onSettings,
}) => {

  useEffect(()=>{
    const _devId = "test123-1"
    const profile = getUserProfile(_devId)
    if(profile){
      userManager.setUserProfile(profile)
    }
  },[])

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
