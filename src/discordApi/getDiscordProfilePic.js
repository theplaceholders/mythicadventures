export async function getDiscordProfilePic(userId, avatarhash, debugLog) {
    const src = `https://cdn.discordapp.com/avatars/${userId}/${avatarhash}.png`;
    debugLog('this is src', src)
    return src
}
