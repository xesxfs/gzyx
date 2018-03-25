class GameCfg extends SingleClass{
	public constructor() {
		super();		
	}

	public initUserConfig(){
		App.SoundManager.allowPlayBGM = App.LocalStorageUtil.allowMusic;
		App.SoundManager.allowPlayEffect = App.LocalStorageUtil.allowEffect;
		App.NativeBridge.sendAutoVoice(App.LocalStorageUtil.autoVoice);
	}
}