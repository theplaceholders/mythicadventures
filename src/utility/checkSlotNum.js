
export const checkSlotNum = async (userId) => {
    try {   
      const response = await fetch(`http://localhost:3001/check-slot-count/${userId}`);
  
      if (response.ok) {
        const { count } = await response.json();
        console.log(`User ${userId} has ${count} slots.`);
        return count;
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error checking slot count:', error);
    }
  };