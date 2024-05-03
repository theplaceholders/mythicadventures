import API_URL from "./API-URL";
export const removeCharacter = async ({slotIndex, userId}) => {
    try {
      const response = await fetch(`${API_URL}/remove-player-data`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slotIndex, userId }) 
      });
  
      if (response.ok) {
        const responseBody = await response.text();
        console.log('Character removed successfully:', responseBody);
      } else {
        console.error(`Failed to remove character. Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error removing character:', error);
    }
  };
