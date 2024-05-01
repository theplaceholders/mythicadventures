import API_URL from "./API-URL";
export const checkSlotNum = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/check-slot-count/${userId}`);
        if (!response.ok) {
            // If the response is not 2xx, it throws to catch the error properly
            throw new Error(`Server responded with status: ${response.status}`);
        }

        // Attempting to parse the response as JSON
        const jsonResponse = await response.json();
        const { count } = jsonResponse;
        console.log(`User ${userId} has ${count} slots.`);
        return count;
    } catch (error) {
        // This will catch any network errors or JSON parsing errors
        console.error('Error checking slot count:', error);
        return null; // Optionally return null or appropriate fallback if the function fails
    }
};
