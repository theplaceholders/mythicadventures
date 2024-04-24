
export const saveCharacter = async (characterData) => {
    console.log(characterData, "character data here");
  
    try {
      const response = await fetch('http://localhost:3001/save-player-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: characterData }) // Ensure the body is a stringified JSON and structured as your server expects
      });
  
      if (response.ok) {
        const responseBody = await response.text();
        console.log(responseBody);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving character:', error);
    }
  };
  