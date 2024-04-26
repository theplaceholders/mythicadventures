export const saveCharacter = async (characterData) => {
    try {
      const response = await fetch('http://localhost:3001/save-player-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: characterData }) 
      });
  
      if (response.ok) {
        const responseBody = await response.text();
        console.log('Character saved successfully:', responseBody);
      } else {
        console.error(`Failed to save character. Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving character:', error);
    }
  };
