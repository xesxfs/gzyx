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
    public diceAnim: DiceAnim;
    public dinQueUI: DinQueSelectUI;

    public optionGroup: eui.Group;
    public chatBtn: eui.Button;
    public exitBtn: eui.Button;
    public setBtn: eui.Button;
    public roomLab: eui.Label;

    private chongjiMc: egret.MovieClip;




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
        this.setRoomNo(GameInfo.curRoomNo);
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
        json = GameInfo.reBuildData;
        GameInfo.curRoomNo = json.roomid;
        GameInfo.curGameType = json.game_flag;
        this.setRoomNo(GameInfo.curRoomNo);
        for (let i = 0; i < json.players.length; i++) {
            let player = ProtocolData.player_info4
            player = json.players[i];
            let user: UserVO = new UserVO();
            if (player.uid == App.DataCenter.UserInfo.getMyUserVo().userID) {
                user = App.DataCenter.UserInfo.getMyUserVo();
            }
            user.IP = player.login_ip;
            user.nickName = player.nick_name;
            user.seatID = player.seatid;
            user.gold = player.gold;
            user.coin = player.diamonds;
            user.headUrl = player.avater_url;
            user.sex = player.sex;
            user.state = player.status;
            user.userID = player.uid;
            App.DataCenter.UserInfo.addUser(user);
            this.headShowUI.updateUserHead(user);

            /***恢复手牌******/
            var cardList = player.hole_mjs;
            var pos = this.cardLogic.changeSeat(player.seatid);  //获取位置


            /***有14张牌 拿出一张放到摸牌位置 */
            if (cardList.length == 14) {
                this.takeCard(pos, cardList.shift());
            }

            for (var j = 0; j < cardList.length; j++) {
                this.cardShowUI.pushHandCard(cardList[j], pos);
            }
            this.cardShowUI.showHandCard(pos);
            /**************/


            /****恢复出牌 */
            var outCardList = player.out_mjs;
            this.cardShowUI.createOutCard(pos, outCardList);
            /*********** */
        }

    }

    protected onEnable() {
        this.initRes();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOptionTouch, this);
    }

    protected onRemove() {
        App.SoundManager.stopBGM();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOptionTouch, this);
    }

    public setRoomNo(roomNo: number) {
        this.roomLab.visible = false;
        if (GameInfo.curGameType == GAME_TYPE.RoomCardGame) {
            this.roomLab.visible = true;
            this.roomLab.text = "房号:" + GameInfo.curRoomNo.toString();
        }
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

    private initRes() {
        var resName = "hero_chongfengji"
        var data = RES.getRes(resName + "_mc_json");
        var img = RES.getRes(resName + "_tex_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, img);
        this.chongjiMc = new egret.MovieClip(mcFactory.generateMovieClipData(resName));

    }
    /**播放冲锋鸡动画 */
    public playChongFengJi() {
        if (this.chongjiMc) {
            this.chongjiMc.play();
            this.addChild(this.chongjiMc);
            setTimeout(() => {
                this.chongjiMc.stop();
                this.chongjiMc.parent && this.chongjiMc.parent.removeChild(this.chongjiMc);
            }, 1000);
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