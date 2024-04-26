import React from 'react';
import "./selectCharacter.css"

const CharacterCard = ({characterInfo, onCreateCharacter}) => {
  characterInfo={}
  return(
    <div className='characterCardContainer'>
      <div className='characterCardIconContainer'>
        {Object.keys(characterInfo).length? 
          null 
          :
          <button className='characterIcon-button' onClick={() => onCreateCharacter()}>
            <div className='characterIcon-addProfile'>
              <div/>
              <div/>
            </div>
            <h6>Create Character</h6>
          </button>
        }
      </div>
      {Object.keys(characterInfo).length? 
          <div className='characterCardInfoContainter'>
            <p>Name: {characterInfo.name}</p>
            <p>Class: {characterInfo.class}</p>
            <p>Race: {characterInfo.race}</p>
          </div> 
          :
          null
        }
    </div>
  )
}

const SelectCharacter = ({
  audioManager, 
  userManager,
  onCreateCharacter,
  onBack,
}) => {
  return (
      <div className="characterSelect">
        <div className="characterSlots">
          {[1,2,3].map((index)=>{
            return(
              <div>
                <p>{`slot-${index}`}</p>
                <CharacterCard characterInfo={{...userManager.userProfile}} onCreateCharacter={onCreateCharacter}/>
              </div>
            )
          })}
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
