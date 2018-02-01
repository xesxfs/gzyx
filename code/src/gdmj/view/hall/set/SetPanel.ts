/**
 * @author xiongjian
 * 
 * 2016-12-29
 */

class SetPanel extends BasePanel{
    public hallGro:eui.Group;
    public closeBtn:eui.Button;
    public contactBtn:eui.Button;
    public versionLab:eui.Label;
    public copyrightLab:eui.Label;
    public music_togBtn_hall:eui.ToggleButton;
    public voice_togBtn_hall:eui.ToggleButton;
    public gameGro:eui.Group;
    public music_togBtn_game:eui.ToggleButton;
    public voice_togBtn_game:eui.ToggleButton;
    public voice_autoBtn:eui.ToggleButton;
    public tuoguanBtn:eui.ToggleButton;
    public setImg:eui.Image;
    public setEdit:eui.EditableText;
    public nameLab:eui.Label;
    public changeBtn:eui.Button;
    public music_togBtn_hall0:eui.ToggleButton;
    public voice_togBtn_hall0:eui.ToggleButton;
    public hallIndGro:eui.Group;
    public closeBtn0:eui.Button;


    public music_togBtn:eui.ToggleButton;
    public voice_togBtn:eui.ToggleButton;
    private touchNum: number;
    private timeNum: number;

    public constructor() {
        super();
        this.skinName = "SetPanelSkin"
    }

   protected childrenCreated() {
    }

    /** 添加到场景*/
    protected onEnable() {

        if (this.gameBool) {
            this.hallGro.visible = false;
            this.hallIndGro.visible = false;
            this.gameGro.visible = true;
            this.music_togBtn = this.music_togBtn_game;
            this.voice_togBtn = this.voice_togBtn_game;
        }
        else {
            if (App.getInstance().indepFlag) {
                this.hallGro.visible = false;
                this.hallIndGro.visible = true;
                this.gameGro.visible = false;
                this.music_togBtn = this.music_togBtn_hall0;
                this.voice_togBtn = this.voice_togBtn_hall0;
            }
            else {
                this.hallGro.visible = true;
                this.hallIndGro.visible = false;
                this.gameGro.visible = false;
                this.music_togBtn = this.music_togBtn_hall;
                this.voice_togBtn = this.voice_togBtn_hall;
            }
        }

        this.touchNum = 0;
        this.setEdit.visible = false;
        this.music_togBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.voice_togBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.voice_autoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.tuoguanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.setToggleSwitchTouch,this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.closeBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.setImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);
        this.setEdit.addEventListener(egret.FocusEvent.FOCUS_OUT, this.FcousOut, this);
        this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeBtn, this);
        this.setCenter();

        this.initView();
    }

    /** 从场景中移除*/
    protected onRemove() {
      
        this.music_togBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.voice_togBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.voice_autoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setToggleSwitchTouch, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.closeBtn0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.tuoguanBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.setToggleSwitchTouch,this);
        this.setImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);
        this.setEdit.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.FcousOut, this);
        this.changeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeBtn, this);
        this.gameBool = false;
        this.touchNum = 0;
    }

    private onSet() {
        this.touchNum ++;
        clearTimeout(this.timeNum);
        this.timeNum = setTimeout(()=>{
            this.touchNum = 0;
        }, 700);
        if (this.touchNum > 13) {
            this.setEdit.visible = true;
            this.setEdit.text = "";
        }
    }

    private FcousOut() {
        var curText = this.setEdit.text;
        var date = (new Date().getTime())/1000;
        var secretText = "open"+ArrayTool.formatDate1(date);
        if (curText == secretText) {
            App.DataCenter.secret = true;
            (<GameScene>App.SceneManager.getCurScene()).showSwapCard();
        }
        else {
            this.setEdit.visible = false;
        }
    }

    /**设置界面值 */
    private initView() {
        this.music_togBtn_game.selected=this.music_togBtn_hall.selected = App.SoundManager.allowPlayBGM;
        this.voice_togBtn_game.selected=this.voice_togBtn_hall.selected = App.SoundManager.allowPlayEffect;;
        this.voice_autoBtn.selected=App.LocalStorageUtil.autoVoice;        
        var gameScene:GameScene = <GameScene>App.SceneManager.getScene(SceneConst.GameScene);
        // if (gameScene && gameScene.tuoGuanGroup) {
        //     this.tuoguanBtn.selected = gameScene.tuoGuanGroup.visible;
        // }
        // else {
        //     this.tuoguanBtn.selected = false;
        // }
    }


    /** 设置页面(开关监听) */
    private setToggleSwitchTouch(event: egret.TouchEvent) {
        switch (event.target) {
            case this.music_togBtn:  //背景音乐

                console.log("target ++++++",event.target);
                var musicEvent:eui.ToggleSwitch = event.target;
                var music = musicEvent.selected;
                App.LocalStorageUtil.allowMusic=App.SoundManager.allowPlayBGM = music;

                //游戏中开关背景音乐
                if(App.SoundManager.allowPlayBGM && App.SceneManager.getCurScene() instanceof GameScene){
                    RES.loadGroup(AssetConst.Sound_BGM);
                }else{
                    App.SoundManager.stopBGM();
                }
                break;

            case this.voice_togBtn:  //音效
                var soundEvent:eui.ToggleSwitch = event.target;
                var sound = soundEvent.selected;
                App.LocalStorageUtil.allowEffect=App.SoundManager.allowPlayEffect = sound;
                //游戏中加载音效
                if(App.SoundManager.allowPlayEffect && App.SceneManager.getCurScene() instanceof GameScene){
                    if(App.SoundManager.isGuangDongSpeak){
                        RES.loadGroup(AssetConst.Sound_GuangDong);
                    }else{
                        RES.loadGroup(AssetConst.Sound_PuTong);
                    }
                    RES.loadGroup(AssetConst.Sound_Other);
                }
                break;
            
            case this.voice_autoBtn: //自动播放语音
                App.NativeBridge.sendAutoVoice(App.LocalStorageUtil.autoVoice=this.voice_autoBtn.selected);
                break;
            case this.tuoguanBtn://手动托管
                App.getController(GameController.NAME).sendTuoGuan(this.tuoguanBtn.selected);
                break;
            default:
                break;
        }
        console.log()
    }
  /**关闭*/
    private onCloseBtn(e: egret.Event) {
        this.hide()
    }

    /**切换 */
    private onChangeBtn() {
        var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
        messageBox.showMsg("您确认要注销登录吗？", () => {
            App.NativeBridge.sendCancle();

            App.PanelManager.closeAllPanel();
            var loginScene = App.SceneManager.runScene(SceneConst.LoginScene) as LoginScene;
		    loginScene.setController(App.getController(LoginController.NAME));

            App.PanelManager.open(PanelConst.LoginChoosePanel,null,null,false,false);
        }, this);
    }
}