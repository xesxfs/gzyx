class GameScene extends BaseScene {
    protected ctrl: GameController;       //游戏控制模块

    //--------------逻辑--------------
    public cardFactory: CardFactory;      //麻将牌工厂
    public cardLogic: CardLogic;          //麻将牌逻辑
    public cardShowUI: CardsShowUI;
    public headShowUI: HeadShowUI;
    public discShowUI: DiscShowUI;
    public outCardTipUI: OutCardTipUI;
    public touGuanShowUI: TuoGuanShowUI;
    public leftCardShowUI: LeftCardShowUI;
    public outFlagUI: OutFlagUI;
    private outFlagGroup: eui.Group;
    public selectActUI: SelectActUI;
    public diceAnim:DiceAnim;

    public optionGroup: eui.Group;
    public chatBtn: eui.Button;
    public exitBtn: eui.Button;
    public setBtn: eui.Button;
    public roomLab: eui.Label;






    public constructor() {
        super();
        this.skinName = "GameSceneSkin1";
    }

    /**组件初始化完成 */
    protected childrenCreated() {
        this.cardLogic = CardLogic.getInstance();
        this.cardFactory = CardFactory.getInstance();
        this.outFlagUI = new OutFlagUI();
        this.outFlagGroup.addChild(this.outFlagUI);
        console.log("childrenCreated");
        /***断线重连恢复数据 */
        if (GameInfo.isReConnection) {
            GameInfo.isReConnection = false;
            this.reBuildData();
        }
    }

    /***断线恢复数据 */
    private reBuildData() {
        let json = ProtocolData.Rev2021;
        for (let i = 0; i < json.players.length; i++) {
            let player = ProtocolData.player_info4
            player = json.players[i];
            let user = new UserVO();
            user.IP = player.login_ip;
            user.nickName = player.nick_name;
            user.seatID = player.seatid;
            user.gold = player.gold;
            user.coin = player.diamonds;
            user.headUrl = player.avater_url;
            user.sex = player.sex;
            user.state = player.status;
            App.DataCenter.UserInfo.addUser(user);
            this.headShowUI.updateUserHead(user);
        }
    }

    protected onEnable() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOptionTouch, this);
        this.roomLab.visible = false;
        if (GameInfo.curGameType == GAME_TYPE.RoomCardGame) {
            this.roomLab.visible = true;
            this.roomLab.text = "房号:" + GameInfo.curRoomNo.toString();
        }
    }

    protected onRemove() {
        App.SoundManager.stopBGM();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOptionTouch, this);
    }

    private onOptionTouch(e: egret.TouchEvent) {
        console.log(e.target)
        switch (e.target) {
            case this.exitBtn:
                if (GameInfo.curGameType == GAME_TYPE.RoomCardGame) {
                    App.MsgBoxManager.getBoxA().showMsg("解散房间不扣房卡，是否确定解散？", this.ctrl.sendWangExitGame, this.ctrl);
                } else {
                    App.MsgBoxManager.getBoxA().showMsg("你确定退出房间,退出房间后你将托管？", this.ctrl.sendQuiteGame, this.ctrl);
                }

                break;
            default:
                TipsLog.hallInfo("功能未实现！！")
        }

    }


    /*******************************************************************************
     ****************************UI Action start************************************/

    public takeCard(pos: UserPosition, cardValue: number) {
        this.cardShowUI.takeCard(pos, cardValue);
    }

    public outCard(pos: UserPosition, cardValue: number) {
        this.cardShowUI.dealOutAction(pos, cardValue);
    }

    public resetScene() {
        this.cardShowUI.reset();
        this.touGuanShowUI.hideTuoGuan();
        this.outFlagUI.hide();;
        this.discShowUI.hideAllLight();
    }


}