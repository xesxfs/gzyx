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
    public readyBtn: eui.Button;


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
        GameInfo.curRoomNo = json.room_pwd;
        GameInfo.curGameType = json.game_flag;
        this.setRoomNo(GameInfo.curRoomNo);


        /***必须先找到自己的座位号，才能推导出其他玩家的相对位置 */
        for (let i = 0; i < json.players.length; i++) {
            let player = ProtocolData.player_info4
            player = json.players[i];
            if (player.uid == App.DataCenter.UserInfo.getMyUserVo().userID) {
                let user = App.DataCenter.UserInfo.getMyUserVo();
                user.seatID = player.seatid;
                break;
            }
        }


        for (let i = 0; i < json.players.length; i++) {
            let player = ProtocolData.player_info4
            player = json.players[i];
            let user: UserVO = new UserVO();
            if (player.uid == App.DataCenter.UserInfo.getMyUserVo().userID) {
                user = App.DataCenter.UserInfo.getMyUserVo();
                this.ctrl.dq_val = player.dq_val;
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

            /***已经开始游戏 */
            if (user.state > 1) {
                /***恢复手牌******/
                var cardList = player.hole_mjs;
                var pos = this.cardLogic.changeSeat(player.seatid);

                /***拿出一张放到摸牌位置 */
                if (json.cur_seat == player.seatid) {
                    this.takeCard(pos, cardList.shift());
                }
                for (var j = 0; j < cardList.length; j++) {
                    this.cardShowUI.pushHandCard(cardList[j], pos);
                }
                this.cardShowUI.showHandCard(pos);
                /**************/

                /****恢复出牌***/
                var outCardList = player.out_mjs;
                this.cardShowUI.createOutCard(pos, outCardList);
                /*********** */

            }

        }

        /***自己出牌设置定缺 */
        if (json.cur_seat == App.DataCenter.UserInfo.getMyUserVo().seatID) {
            this.cardShowUI.setDinQueFlag(this.ctrl.dq_val);
        }

    }

    protected onEnable() {
        this.initRes();
        this.readyBtn.addEventListener("touchTap", this.ctrl.sendReady, this);
        this.optionGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOptionTouch, this);
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
                //开房类型可以发起解散房间, 再发起http退出房间
                //排位赛金币赛可以退出房间
                if (GameInfo.curGameType == GAME_TYPE.RoomCardGame) {
                    App.MsgBoxManager.getBoxA().showMsg("游戏未进行时解散房间不扣房卡，是否确定解散？", this.ctrl.sendWangExitGame, this.ctrl);
                } else {
                    App.MsgBoxManager.getBoxA().showMsg("是否退出金币场，退出将由\n机器人代打，本局结束前\n不允许进入其他房间", this.ctrl.sendQuiteGame, this.ctrl);
                }

                break;
            case this.chatBtn:
                this.headShowUI.showTxt("helllllllllll", UserPosition.Down);
                this.headShowUI.showTxt("helllllllllll", UserPosition.L);
                this.headShowUI.showTxt("helllllllllll", UserPosition.R);
                this.headShowUI.showTxt("helllllllllll", UserPosition.Up);


                this.headShowUI.showEmoji("emoji_1", UserPosition.Down);
                this.headShowUI.showEmoji("emoji_2", UserPosition.L);
                this.headShowUI.showEmoji("emoji_3", UserPosition.R);
                this.headShowUI.showEmoji("emoji_4", UserPosition.Up);


                break;
            default:
            // TipsLog.hallInfo("功能未实现！！")
        }
    }

    private initRes() {
        var resName = "hero_chongfengji"
        var data = RES.getRes(resName + "_json");
        var img = RES.getRes(resName + "_png");
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
            }, 3000);
        }
    }

    public showExit() {
        this.exitBtn.visible = true;
    }

    public showChat(pos: UserPosition, type: number, tag: number, msg: string) {
        try {

            if (type == 2) {
                this.headShowUI.showEmoji("emoji_" + tag.toString(), pos);
            } else if (type == 1) {
                this.headShowUI.showTxt(App.DataCenter.GameInfo.Chat_Msg[tag], pos);
            } else if (type == 3) {
                this.headShowUI.showTxt(msg, pos);
            }

        } catch (e) {
            console.warn("聊天出现未知异常！！！");
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