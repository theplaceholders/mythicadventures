import API_URL from "./API-URL";

export async function getPlayerData(slotIndex, userId) {

    const endpoint = `${API_URL}/get-player-data/${userId}/${slotIndex}`;
    try {
        const response = await fetch(endpoint);
        console.log(response, "this is responseeeeeeeee")
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch player data:', error);
        throw error; // Re-throw to let caller handle the exception
    }
}