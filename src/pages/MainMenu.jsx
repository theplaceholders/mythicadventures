export const MainMenu = ({
  audioManager,
  onSelectCharacter,
  onSettings,
  user
}) => {

  return (
    <div className="main-menu">
      <h1 className="game-title">MYTHIC ADVENTURES</h1>
      <img src={user.imageUrl}/>
      <nav>
        <button
          id="btnPlayGame"
          onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            window.isTutorial = false
            audioManager.playSFX('click');
              onSelectCharacter();
          }}
        >
          Play Game
        </button>
        <button
          id="btnTutorial"
          onMouseEnter={() => audioManager.playSFX('hover')}
          onClick={() => {
            window.isTutorial = true
            audioManager.playSFX('click');
              onSelectCharacter();
          }}
        >
          Tutorial
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
