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
 function App() {
  const [characterCreationSlot, setCharacterCreationSlot] = useState(null);
  const [currentPage, setCurrentPage] = useState('mainMenu');
  const [userProfile, setUserProfile] = useState({});
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
        console.log(data.accessToken)
        const authenticated = await discordSdk.commands.authenticate({
          access_token: accessToken
        });

        if (authenticated) {
          setAuth(accessToken);
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

  const renderPage = () => {
    switch (currentPage) {
      case 'mainMenu':
        return <MainMenu auth = {auth} audioManager={audioManager} userManager={{ userProfile, setUserProfile }} onSettings={() => setCurrentPage('settings')} onSelectCharacter={() => setCurrentPage('selectCharacter')} onPlayGame={() => setCurrentPage('playGame')} />;
      case 'settings':
        return <Settings audioManager={audioManager} onBack={() => setCurrentPage('mainMenu')} />;
      case 'createCharacter':
        return <CreateCharacter slotIndex={characterCreationSlot} audioManager={audioManager} onBack={() => {setCharacterCreationSlot(null); setCurrentPage('selectCharacter');}} />;
      case 'selectCharacter':
        return <SelectCharacter onCreateCharacter={(slotIndex) => {setCharacterCreationSlot(slotIndex); setCurrentPage('createCharacter');}} audioManager={audioManager} userManager={{ userProfile, setUserProfile }} onBack={() => setCurrentPage('playGame')} />;
      case 'playGame':
        return <PhaserGame exitGame={() => setCurrentPage('mainMenu')} />;
      default:
        return <MainMenu audioManager={audioManager} onSettings={() => setCurrentPage('settings')} />;
    }
  };

  return (
    <div className="App">
      <DebugProvider>
        {renderPage()}
        <DebugLogWindow />
      </DebugProvider>
    </div>
  );
}

export default App;


