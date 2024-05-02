import React, { useState, useEffect } from 'react';
import AudioManager from '../utility/AudioManager';
import { saveCharacter } from '../utility/saveCharacter';
import { getDiscordId } from '../discordApi/getDiscordId';
import { useDebugLog } from '../utility/DebugLog';
import { getDiscordProfilePic } from '../discordApi/getDiscordProfilePic';
const CreateCharacter = ({ auth, audioManager, onBack, slotIndex, setAvatarUrl  }) => {
  const [characterData, setCharacterData] = useState({
    slotNum: slotIndex,
    userId: '',
    characterName: '',
    characterClass: '',
    characterRace: '',
  });
  const debugLog = useDebugLog()
  useEffect(() => {
    const initializeData = async () => {
      const userData = await getDiscordId(auth);
      const userId = userData.id
      const avatarHash = userData.avatar
      const userName = userData.username
      let imageUrl = await getDiscordProfilePic(userId, avatarHash,userName, debugLog)
      debugLog(imageUrl, "this is url in create character")
      window.playerAvatarUrl = imageUrl;
      setCharacterData((prev) => ({
        ...prev,
        userId: userId,
        slotNum: slotIndex,
        imageUrl: imageUrl,
      }));
    };

    initializeData(); // Call the async function within useEffect
  }, [setAvatarUrl]);

  const auraClass = `aura-${characterData.characterClass}`;

  return (
    <div className="characterInputs">
      <h1>Create Your Character</h1>
      {
        
      }
      <img className={`profilePic ${auraClass}`} src={characterData.imageUrl} alt="Character" />
      
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
        <option value="">Select Class</option>
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
        <option value="">Select Race</option>
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
