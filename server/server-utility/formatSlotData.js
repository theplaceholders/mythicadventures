const formatSlotData = (data) => {
  let stats = {};

  // Define base stats for each class
  switch (data.characterClass) {
      case 'Warrior':
          stats = {
              health: 150,
              maxHealth: 150,
              stamina: 100,
              maxStamina: 100,
              mana: 0,
              maxMana: 0, 
              damage: 30, 
              defense: 20,
              sprintFactor: 0.20,
              maxSprintFactor: 0.50,
          };
          break;
      case 'Mage':
          stats = {
              health: 100,
              maxHealth: 100,
              stamina: 50,
              maxStamina: 50,
              mana: 150,
              maxMana: 150, 
              damage: 45, 
              defense: 10, 
              sprintFactor: 0.30,
              maxSprintFactor: 0.60,
          };
          break;
      case 'Ranger':
          stats = {
              health: 120,
              maxHealth: 120,
              stamina: 120,
              maxStamina: 120,
              mana: 0,
              maxMana: 0, 
              damage: 35, 
              defense: 15, 
              sprintFactor: 0.40,
              maxSprintFactor: 0.80,
          };
          break;
      default:
          // Optionally handle unexpected class types
          throw new Error("Invalid class type provided.");
  }

  // Organize the data structure as required
  return {
      [`slot-${data.slotNum}`]: {
          slotNum: data.slotNum,
          userId: data.userId,
          characterName: data.characterName,
          characterClass: data.characterClass,
          characterRace: data.characterRace
      },
      [`playerData-${data.slotNum}`]: {
          general: {
              characterName: data.characterName,
              characterClass: data.characterClass,
              characterRace: data.characterRace
          },
          stats: stats
      }
  };
};

module.exports = {
  formatSlotData
}