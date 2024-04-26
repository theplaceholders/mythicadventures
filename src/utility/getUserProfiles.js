

export const getUserProfiles = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/get-slot-data/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const profiles = await response.json();
      return profiles;
    } catch (error) {
      console.error('Failed to fetch user profiles:', error);
    }
  };