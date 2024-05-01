
export async function getDiscordId(accessToken) {

    const url = 'https://discord.com/api/users/@me';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }   
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;  
    } catch (error) {
        console.error('Failed to fetch Discord ID:', error);
        return null;  // Return null or handle the error as needed
    }
}
