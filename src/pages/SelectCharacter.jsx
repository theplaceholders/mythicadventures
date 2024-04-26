import React from 'react';
import "./selectCharacter.css"

const CharacterCard = ({ characterData, onCreateCharacter, slotIndex }) => {
  console.log(characterData);
  const handleCreateClick = () => {
    onCreateCharacter(slotIndex);
  };
  return(
    <div className='characterCardContainer'>
      {characterData ? (
        <div className='characterCardInfoContainer'>
          <p>Name: {characterData.characterName}</p>
          <p>Class: {characterData.characterClass}</p>
          <p>Race: {characterData.characterRace}</p>
        </div>
      ) : (
        <div className='characterCardIconContainer'>
          <button className='characterIcon-button' onClick={handleCreateClick}>
            <div className='characterIcon-addProfile'>
              <div />
              <div />
            </div>
            <h6>Create Character</h6>
          </button>
        </div>
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