import React, { useState, useEffect } from 'react';
import AudioManager from '../utility/AudioManager';
import { saveCharacter } from '../utility/saveCharacter';
import { checkSlotNum } from '../utility/checkSlotNum';

const CreateCharacter = ({ audioManager, onBack }) => {
  const [characterData, setCharacterData] = useState({
    slotNum: 0,
    userId: '',
    characterName: '',
    characterClass: '',
    characterRace: '',
  });

  // Initialize userId only once, when the component mounts
  useEffect(() => {
    const initializeData = async () => {
      const userId = '123456789'; // Define userId or retrieve it from somewhere
      const slotCount = await checkSlotNum(userId); // Assume checkSlotNum is async
      const slotNum = slotCount === 0 ? 1 : slotCount + 1; // If no slots, start at 1, else increment

      setCharacterData((prev) => ({
        ...prev,
        userId: userId,
        slotNum: slotNum,
      }));
    };

    initializeData(); // Call the async function within useEffect
  }, []);

  return (
    <div className="characterInputs">
      <h1>Create Your Character</h1>
      <label htmlFor="characterName">Name:</label>
      <input
        type="text"
        id="characterName"
        name="characterName"
        value={characterData.characterName}
        onChange={(e) =>
          setCharacterData((prev) => ({
            ...prev,
            characterName: e.target.value,
          }))
        }
      />

      <label htmlFor="characterClass">Class:</label>
      <select
        id="characterClass"
        name="characterClass"
        value={characterData.characterClass}
        onChange={(e) =>
          setCharacterData((prev) => ({
            ...prev,
            characterClass: e.target.value,
          }))
        }
      >
        <option value="">Select Class</option> {/* Empty option */}
        <option value="warrior">Warrior</option>
        <option value="mage">Mage</option>
        <option value="ranger">Ranger</option>
      </select>

      <label htmlFor="characterRace">Race:</label>
      <select
        id="characterRace"
        name="characterRace"
        value={characterData.characterRace}
        onChange={(e) =>
          setCharacterData((prev) => ({
            ...prev,
            characterRace: e.target.value,
          }))
        }
      >
        <option value="">Select Race</option> {/* Empty option */}
        <option value="human">Human</option>
        <option value="elf">Elf</option>
        <option value="orc">Orc</option>
      </select>

      <button
        id="btnContinue"
        onMouseEnter={() => audioManager.playSFX('hover')}
        onClick={() => {
          audioManager.playSFX('click');
          saveCharacter(characterData);
        }}
      >
        Continue
      </button>

      <button
        id="btnBack"
        onMouseEnter={() => audioManager.playSFX('hover')}
        onClick={() => {
          audioManager.playSFX('click');
          onBack();
        }}
      >
        Back
      </button>
    </div>
  );
};

export default CreateCharacter;