import React from 'react';

const CreateCharacter = ({ onBack, playSFX }) => {
    return (
        
        <div className="characterInputs">
            <h1>Create Your Character</h1>
            <label htmlFor="characterName">Name:</label>
            <input type="text" id="characterName" name="characterName" />

            <label htmlFor="characterClass">Class:</label>
            <select id="characterClass" name="characterClass">
                <option value="warrior">Warrior</option>
                <option value="mage">Mage</option>
                <option value="ranger">Ranger</option>
            </select>

            <label htmlFor="characterRace">Race:</label>
            <select id="characterRace" name="characterRace">
                <option value="human">Human</option>
                <option value="elf">Elf</option>
                <option value="orc">Orc</option>
            </select>
            <button id="btnContinue" onMouseEnter={() => playSFX('hover')}
          onClick={() => {
            playSFX('click');
          }}>Continue</button>
            <button id="btnBack" onMouseEnter={() => playSFX('hover')}
          onClick={() => {
            playSFX('click');
            onBack();
          }}>Back</button>
        </div>
    );
};

export default CreateCharacter;

