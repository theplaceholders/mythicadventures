import React, { useEffect } from 'react';
import { audioManager } from '../utility/AudioManager';

const CreateCharacter = ({onBack}) => {
    useEffect(() => {
        const btnBack = document.getElementById('btnBack');
        btnBack.addEventListener('click', handleBack);
        return () => {
            btnBack.removeEventListener('click', handleBack);
        };
    }, []);
    const handleBack = () => {
        audioManager.playSFX();
    };

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
            <button id="btnContinue">Continue</button>
            <button id="btnBack" onClick={onBack}>Back</button>
        </div>
    );
};

export default CreateCharacter;
