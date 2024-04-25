import React from 'react';
import "./selectCharacter.css"

const CharacterCard = ({characterInfo}) => {
  console.log(characterInfo)
  return(
    <div className='characterCardContainer'>
      <div className='characterCardIconContainer'>
        <div>
          <p>icon here</p>
          <div className='characterIcon'>
            <div/>
            <div/>
          </div>
        </div>
      </div>
      <div className='characterCardInfoContainter'>
        <p>Name: {characterInfo.name}</p>
        <p>Class: {characterInfo.class}</p>
        <p>Race: {characterInfo.race}</p>
      </div>
    </div>
  )
}

const SelectCharacter = ({
  audioManager, 
  userManager,
  onCreateCharacter,
  onBack,
}) => {
  console.log(userManager)

  return (
      <div className="characterSelect">
        <p>{JSON.stringify(userManager.userProfile)}</p>
        <CharacterCard characterInfo={{...userManager.userProfile}}/>
        <button id="btnBack" onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            audioManager.playSFX('click');
            onBack();
        }}>Back</button>
      </div>
  );
};



export default SelectCharacter;
