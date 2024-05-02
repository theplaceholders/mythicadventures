import React from 'react';
import "./SelectCharacter.css"

const CharacterCard = ({ characterData, onCreateCharacter, slotIndex }) => {

  const handleSelectButtonClick = ({isCreateCharacter}) => {
    if(isCreateCharacter)
      onCreateCharacter(slotIndex);
    
  };

  return(
    <div className='characterCardContainer'>
      {characterData ? (
        <button className="characterSelectButton" onClick={()=>handleSelectButtonClick({"isCreateCharacter":false})}>
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
        <button className='characterSelectButton' onClick={()=>handleSelectButtonClick({"isCreateCharacter":true})}>
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
}) => {
  let characterInfo = userManager.userProfile;
  if (!characterInfo) {
    return <div>Loading...</div>; // Placeholder for when data is not yet available
  }

  const slots = [1, 2, 3].map(index => {
    const characterData = characterInfo[`slot-${index}`];
    return (
      <div key={`slot-${index}`}>
        <p>{`Slot ${index}`}</p>
        <CharacterCard characterData={characterData} onCreateCharacter={onCreateCharacter} slotIndex={index}/>
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