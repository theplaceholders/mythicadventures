export async function getDiscordProfilePic(userId, avatarHash, userName, debugLog) {
    let src;
    if (avatarHash) {
        src = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`;
    } else {
        const hashIndex = userName.indexOf('#');
        if (hashIndex !== -1 && (hashIndex + 5) === userName.length) { // Ensures there are four digits after '#'
            const discriminator = parseInt(userName.substring(hashIndex + 1));
            const index = discriminator % 5; // Use legacy system calculation
            src = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
        } else {
            // Fallback or assume new system calculation if no discriminator is found
            const index = (BigInt(userId) >> 22n) % 6n;
            src = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
        }
    }
    debugLog('this is src', src);
    return src;
}
