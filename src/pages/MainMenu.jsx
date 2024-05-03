export const MainMenu = ({
  audioManager,
  onSelectCharacter,
  onSettings
}) => {
  const [profilePic, setProfilePic] = useState()
  const debugLog = useDebugLog();
  //fix here
  useEffect(() => {
    const fetchData = async () => {
      
      debugLog(auth, "this is auth")
      const userData = await getDiscordId(auth)
      debugLog(JSON.stringify(userData))
      const userId = userData.id
      const avatarHash = userData.avatar
      const userName = userData.username
      let imageUrl = await getDiscordProfilePic(userId, avatarHash, userName, debugLog)
      debugLog(imageUrl)
      setProfilePic(imageUrl)
      debugLog(JSON.stringify(userData), "this is user data")
      const profiles = await getUserProfiles(userData.id, debugLog);
      console.log(profiles);
      if (profiles) {
        userManager.setUserProfile(profiles);
      }
    };
    fetchData();
  }, [auth]);

  return (
    <div className="main-menu">
      <h1 className="game-title">MYTHIC ADVENTURES</h1>
      <img src={profilePic}/>
      <nav>
        <button
          id="btnPlayGame"
          onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            audioManager.playSFX('click');
              onSelectCharacter();
          }}
        >
          Play Game
        </button>
        <button
          id="btnSettings"
          onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            audioManager.playSFX('click');
            onSettings();
          }}
        >
          Settings
        </button>
      </nav>
    </div>
  );
};

export default MainMenu;
