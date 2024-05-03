import React, { useEffect } from 'react';
import "./SelectCharacter.css"

const CharacterCard = ({characterData, slotIndex, handleSelectButtonClick }) => {

  return(
    <div className='characterCardContainer'>
      {characterData ? (
        <button className="characterSelectButton" onClick={()=>handleSelectButtonClick({"isCreateCharacter":false, slotIndex})}>
          <div className='characterCardIconContainer'>
            <div className='characterIcon-addProfile'>
              <div />
              <div />
            </div>
          </div>
          <div className='characterCardInfoContainer'>
            <p>Name: {characterData.characterName}</p>
            <p>Class: {characterData.characterClass}</p>
            <p>Race: {characterData.characterRace}</p>
          </div>
        </button>
      ) : (
        <button className='characterSelectButton' onClick={()=>handleSelectButtonClick({"isCreateCharacter":true, slotIndex})}>
          <div className='characterCardIconContainer'>
            <div className='characterIcon-addProfile'>
              <div />
              <div />
            </div>
            <h4>Create Character</h4>
          </div>
        </button>
      )}
    </div>
  );
};


const SelectCharacter = ({
  userManager,
  onCreateCharacter,
  audioManager,
  onBack,
  onPlayGame
}) => {
  

  const{ user, setUser } = userManager
  let characterInfo = userManager.user.profile;
  if (!characterInfo) {
    return <div>Loading...</div>; // Placeholder for when data is not yet available
  }

  const handleSelectButtonClick = ({isCreateCharacter, slotIndex}) => {
    if(isCreateCharacter){
      setUser(prev=>{console.log(JSON.stringify({...prev, slotNum:slotIndex}));return ({...prev, slotNum:slotIndex})})
      onCreateCharacter();
    } else {
      setUser(prev=>({...prev, currentSlot:slotIndex}))
      onPlayGame()
    }
    
  };

  const slots = [1, 2, 3].map(index => {
    const characterData = characterInfo[`slot-${index}`];
    return (
      <div key={`slot-${index}`}>
        <p>{`Slot ${index}`}</p>
        <CharacterCard characterData={characterData} slotIndex={index} handleSelectButtonClick={handleSelectButtonClick}/>
      </div>
    );
  });

  return (
    <div className="characterSelect">
      <div className="characterSlots">
        {slots}
      </div>
      <button id="btnBack" onMouseEnter={() => audioManager.playSFX('hover')}
        onClick={() => {
          audioManager.playSFX('click');
          onBack();
        }}>Back</button>
    </div>
  );
};

export default SelectCharacter;