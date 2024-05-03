import API_URL from "./API-URL";

export const getUserProfiles = async (userId) => {
    try {
      // await debugLog('trying to fetch hello', 'checking')
      
      const response = await fetch(`${API_URL}/get-slot-data/${userId}`);
      // await debugLog('this is response', response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const profiles = await response.json();
      return profiles;
    } catch (error) {
      console.error('Failed to fetch user profiles:', error);
    }
  };