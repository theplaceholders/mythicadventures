import React, { useState, useEffect } from 'react';
import MainMenu from './pages/MainMenu';
import Settings from './pages/Settings';
import CreateCharacter from './pages/CreateCharacter';
import PhaserGame from './pages/PhaserGame';
import AudioManager from './utility/AudioManager';
import './styles/App.css';
import SelectCharacter from './pages/SelectCharacter';
import { DebugProvider, DebugLogWindow } from './utility/DebugLog';
import { DiscordSDK } from "@discord/embedded-app-sdk";
import API_URL from './utility/API-URL';
import { getDiscordId } from './discordApi/getDiscordId'; 
import { getUserProfiles } from './utility/getUserProfiles';
import { getDiscordProfilePic } from './discordApi/getDiscordProfilePic'; 

 function App() {
  const [currentPage, setCurrentPage] = useState('mainMenu');
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const [auth, setAuth] = useState();
  const audioManager = new AudioManager();
  useEffect( () => {
    const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
    const setupDiscordSdk = async () => {
      await discordSdk.ready();
      console.log("Discord SDK is ready");
      
      try {
        const { code } = await discordSdk.commands.authorize({
          client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
          response_type: "code",
          state: "",
          prompt: "none",
          scope: [
            "identify",
            "guilds", 
          ],
        });

        const response = await fetch(`${API_URL}/get-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const data  = await response.json();
        const accessToken = data.accessToken
        const authenticated = await discordSdk.commands.authenticate({
          access_token: accessToken
        });

        if (authenticated) {
          setAuth(accessToken);
          const userData = await getDiscordId(accessToken)
          const profile = await getUserProfiles(userData.id)
          const imageUrl = await getDiscordProfilePic(userData.id, userData.avatar, userData.username)
          setUser({userData:userData, profile:profile, imageUrl:imageUrl})
          window.playerAvatarUrl = imageUrl
          setIsLoading(false)
          console.log("Discord SDK is authenticated");
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        console.error("Error during Discord SDK setup: ", error);
      }
    };
    
     setupDiscordSdk();
  }, []); 

  async function updateUserProfile(){
    const profile = await getUserProfiles(user.userData.id);
    setUser(prev=>({...prev, profile:profile}))
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'mainMenu':
        return <MainMenu audioManager={audioManager} user={user} onSettings={() => setCurrentPage('settings')} onSelectCharacter={() => setCurrentPage('selectCharacter')} onPlayGame={() => setCurrentPage('playGame')} />;
      case 'settings':
        return <Settings audioManager={audioManager} onBack={() => setCurrentPage('mainMenu')} />;
      case 'createCharacter':
        return <CreateCharacter userManager={{user, setUser}} audioManager={audioManager} onBack={() => {setUser(prev=>({...prev, slotNum:null})); updateUserProfile();  setCurrentPage('selectCharacter');}} />;
      case 'selectCharacter':
        return <SelectCharacter onCreateCharacter={(slotIndex) => {setCurrentPage('createCharacter');}} audioManager={audioManager} userManager={{ user, setUser }} onBack={() => setCurrentPage('mainMenu')} onPlayGame={()=> setCurrentPage('playGame')} updateUserProfile={updateUserProfile}/>;
      case 'playGame':
        return <PhaserGame exitGame={() => setCurrentPage('mainMenu')} />;
      default:
        return <MainMenu audioManager={audioManager} onSettings={() => setCurrentPage('settings')} />;
    }
  };

  return (
    <div className="App">
      <DebugProvider>
        {isLoading? <h1>Loading......</h1> : renderPage()}
        <DebugLogWindow />
      </DebugProvider>
    </div>
  );
}

export default App;


