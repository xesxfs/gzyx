class GameController extends BaseController {
    /**游戏模块名*/
    public static NAME: string = "GameController";
    /**显示游戏场景*/
    public static EVENT_SHOW_GAME_SCENE: string = "EVENT_SHOW_GAME_SCENE";
    /**游戏场景*/
    public gameScene: GameScene;
    /***定缺值1，3，5 万 条 筒 */
    public dq_val: number = 0;

    public constructor() {
        super();
    }

    /**注册模块时调用*/
    public onRegister() {
        this.addEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
        this.registerSocket();
    }

    /**显示游戏*/
    private showGameScene() {
        this.gameScene = <GameScene>App.SceneManager.runScene(SceneConst.GameScene, this);
    }
    /***注销模块时调用*/
    public onRemove() {
        this.removeEvent(GameController.EVENT_SHOW_GAME_SCENE, this.showGameScene, this);
    }

    /**** 注册socket*/
    public registerSocket() {
        var gameSocket: ClientSocket = App.gameSocket;

        gameSocket.register(ProtocolHead.open_room_command.SERVER_DISSOLUTION_ROOM_REQ_BC, this.rev201, this);
        gameSocket.register(ProtocolHead.open_room_command.SERVER_DISSOLUTION_ROOM_CONFIRM_BC, this.rev202, this);
        gameSocket.register(ProtocolHead.open_room_command.SERVER_DISSOLUTION_ROOM_RESULT_BC, this.rev203, this);
        gameSocket.register(ProtocolHead.open_room_command.SERVER_GAME_ALL_END_BC, this.rev204, this);

        gameSocket.register(ProtocolHead.server_command.SERVER_ROOM_INFO_BC, this.rev2002, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GAME_START_BC, this.rev2003, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GET_ONE_MJ, this.rev2005, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OUT_ONE_MJ, this.rev2006, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_PASS, this.rev2011, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_PENG, this.rev2012, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_ANGGANG, this.rev2013, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_MINGGANG, this.rev2014, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_FANG_GANG, this.rev2015, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_ZIMOHU, this.rev2016, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_FANG_PAO_HU, this.rev2017, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_QIANG_GANG_HU, this.rev2018, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GAME_READY_STAGE_BC, this.rev2019, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GAME_END_BC, this.rev2020, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_CHONG_FENG_JI_BC, this.rev2025, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_ZHE_REN_JI_BC, this.rev2027, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OPERATE_CHECK_AFTER_GETIN_MJ, this.rev2007, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OPERATE_CHECK_OTHERS_PUTOUT_MJ, this.rev2008, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_BEGIN_ROBOT_OP_BC, this.rev2039, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_CANCEL_ROBOT_OP_SUCC_BC, this.rev2040, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GOLDROOM_LOGOUT_ROOM, this.rev2038, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_READY_BC, this.rev2004, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OPERATE_CHECK_QIANG_GANG_HU, this.rev2010, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OPERATE_CHECK_AFTER_PENG, this.rev2009, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_DINGQUE_STARGE_BC, this.rev2023, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_DINGQUE_SUCC_BC, this.rev2024, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_ALL_DIN_QUE_SUCC_BC, this.rev2041, this);

        gameSocket.register(ProtocolHead.system_command.SERVER_NOLMAL_CHAT_BC, this.rev4, this);
    }

    public unRegisterSocket() {
        var gameSocket: ClientSocket = App.gameSocket;
        gameSocket.unRegister(ProtocolHead.open_room_command.SERVER_DISSOLUTION_ROOM_REQ_BC);
        gameSocket.unRegister(ProtocolHead.open_room_command.SERVER_DISSOLUTION_ROOM_CONFIRM_BC);
        gameSocket.unRegister(ProtocolHead.open_room_command.SERVER_DISSOLUTION_ROOM_RESULT_BC);
        gameSocket.unRegister(ProtocolHead.open_room_command.SERVER_GAME_ALL_END_BC);

        gameSocket.unRegister(ProtocolHead.server_command.SERVER_ROOM_INFO_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_GAME_START_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_GET_ONE_MJ);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_OUT_ONE_MJ);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_PASS);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_PENG);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_ANGGANG);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_MINGGANG);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_FANG_GANG);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_ZIMOHU);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_FANG_PAO_HU);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_QIANG_GANG_HU);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_GAME_READY_STAGE_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_GAME_END_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_CHONG_FENG_JI_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_ZHE_REN_JI_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_OPERATE_CHECK_AFTER_GETIN_MJ);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_OPERATE_CHECK_OTHERS_PUTOUT_MJ);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_BEGIN_ROBOT_OP_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_CANCEL_ROBOT_OP_SUCC_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_GOLDROOM_LOGOUT_ROOM);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_READY_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_OPERATE_CHECK_QIANG_GANG_HU);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_OPERATE_CHECK_AFTER_PENG);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_DINGQUE_STARGE_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_DINGQUE_SUCC_BC);
        gameSocket.unRegister(ProtocolHead.server_command.SERVER_ALL_DIN_QUE_SUCC_BC);

        gameSocket.unRegister(ProtocolHead.system_command.SERVER_NOLMAL_CHAT_BC);
    }

    public continueGame() {
        this.sendReady();
        this.gameScene.resetScene();
    }

    /***************************************接收数据****************************************** */
    /** 房间信息 */
    private rev2002(data) {
        let json = ProtocolData.Rev2002;
        json = data;
        GameInfo.playerNumber = json.player_num;
        GameInfo.state = json.status;
        let playerInfo = json.players;
        for (let i = 0; i < playerInfo.length; i++) {
            let player = ProtocolData.player_info2;
            player = playerInfo[i];
            let user = new UserVO();
            user.IP = player.login_ip;
            user.nickName = player.nick_name;
            user.seatID = player.seatid;
            user.gold = player.gold;
            user.coin = player.diamonds;
            user.headUrl = player.avater_url;
            user.sex = player.sex;
            user.state = player.status;
            let pos = CardLogic.getInstance().changeSeat(user.seatID);
            !!user.state && this.gameScene.headShowUI.showReady(pos);
            if (user.userID == App.DataCenter.UserInfo.getMyUserVo().userID) {
                this.gameScene.readyBtn.visible = !!user.state;
                !!user.state && this.gameScene.showExit();
            }
            App.DataCenter.UserInfo.addUser(user);
            this.gameScene.headShowUI.updateUserHead(user);

        }
    }

    /** 开始游戏了 */
    private rev2003(data) {
        GameInfo.state = GameState.Playing;
        this.gameScene.resetScene();
        let json = ProtocolData.Rev2003;
        json = data;
        this.gameScene.leftCardShowUI.setLeftCard(json.rest_mjs);
        let zhuangPos = CardLogic.getInstance().changeSeat(json.banker_seatid)
        this.gameScene.headShowUI.showZhuang(zhuangPos);
        this.gameScene.cardShowUI.createHandCard(json.players);
        this.gameScene.diceAnim.playAnimation(json.dice[0], json.dice[1]);
        this.gameScene.headShowUI.hideAllReady();
    }

    /** 玩家出牌广播 */
    private rev2006(data) {
        let json = ProtocolData.Rev2006;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        let cardValue = json.out_mj;
        this.gameScene.outCard(pos, cardValue);
        this.gameScene.outCardTipUI.showOutEffect(cardValue, pos);
        if (pos == UserPosition.Down) {
            if (this.dq_val > 0) {
                this.gameScene.cardShowUI.resetDinQueFlag();
            }
        }
    }

    /** 玩家摸牌广播 */
    private rev2005(data) {
        let json = ProtocolData.Rev2005;
        json = data;
        this.gameScene.leftCardShowUI.setLeftCard(json.rest_mjs);
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        let cardValue = json.mj;
        this.gameScene.takeCard(pos, cardValue);
        this.gameScene.discShowUI.showLight(pos);
        this.gameScene.selectActUI.hide();
        if (pos == UserPosition.Down) {
            if (this.dq_val > 0) {
                this.gameScene.cardShowUI.setDinQueFlag(this.dq_val);
            }
        }
    }

    /** 玩家自动开启托管广播 */
    private rev2039(data) {
        let json = ProtocolData.Rev2039;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        if (pos == UserPosition.Down) {
            this.gameScene.touGuanShowUI.showTuoGuan();
            this.gameScene.selectActUI.hide();
        }
    }

    /** 取消托管操作 */
    private rev2040(data) {
        let json = ProtocolData.Rev2040;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        if (pos == UserPosition.Down) {
            this.gameScene.touGuanShowUI.hideTuoGuan();
        }
    }

    /***主动动作，玩家摸取麻将牌后，自己的可操作提示板 //自摸胡，亮牌，暗杠，蓄杠，过 */
    private rev2007(data) {
        let json = ProtocolData.Rev2007;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        if (pos == UserPosition.Down) {
            let actList = [];
            json.ming_gang_flag ? (actList.push(ACT_act.Act_Gang)) : "";
            json.an_gang_flag ? (actList.push(ACT_act.Act_AnGang)) : "";
            json.zi_mo_hu_flag ? (actList.push(ACT_act.Act_Hu)) : "";
            actList.push(ACT_act.Act_Pass);
            if (actList.length > 1) {
                this.gameScene.selectActUI.updateInfo(actList, json.getin_mj);
                this.gameScene.selectActUI.show();
            }

            // if (json.getin_mj) {
            //     this.gameScene.cardShowUI.findAndRmHandCard(json.getin_mj);
            //     this.gameScene.cardShowUI.takeCard(pos, json.getin_mj);
            // }

        }

    }

    /** 被动动作，其它玩家出牌后的 点炮胡，碰，明杠，过 */
    private rev2008(data) {
        let json = ProtocolData.Rev2008;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        if (pos == UserPosition.Down) {
            let actList = [];
            json.fang_gang_flag ? (actList.push(ACT_act.Act_Gang)) : "";
            json.fang_pao_hu_flag ? (actList.push(ACT_act.Act_Hu)) : "";
            json.peng_flag ? (actList.push(ACT_act.Act_Peng)) : "";
            actList.push(ACT_act.Act_Pass);
            if (actList.length > 1) {
                this.gameScene.selectActUI.updateInfo(actList);
                this.gameScene.selectActUI.show();
            }
        }
    }

    /** PASS别人打的牌 */
    private rev2011(data) {
        let json = ProtocolData.Rev2011;
        json = data;
    }

    /** 碰 */
    private rev2012(data) {
        let json = ProtocolData.Rev2012;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.cardShowUI.dealCPGAction(ACT_act.Act_Peng, pos, [json.mj], 0);
    }

    /** 暗杠 */
    private rev2013(data) {
        let json = ProtocolData.Rev2013;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.cardShowUI.dealCPGAction(ACT_act.Act_AnGang, pos, [json.mj], 0);
    }

    /** 明杠 */
    private rev2014(data) {
        let json = ProtocolData.Rev2014;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.cardShowUI.dealCPGAction(ACT_act.Act_Gang, pos, [json.mj], 1);
    }

    /** 放杠 */
    private rev2015(data) {
        let json = ProtocolData.Rev2015;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.cardShowUI.dealCPGAction(ACT_act.Act_Gang, pos, [json.mj], 3);
    }

    /** 自摸胡 */
    private rev2016(data) {
        let json = ProtocolData.Rev2016;
        json = data;
    }

    /** 接炮胡 */
    private rev2017(data) {
        let json = ProtocolData.Rev2017;
        json = data;
    }

    /** 玩家抢杠胡 */
    private rev2018(data) {
        let json = ProtocolData.Rev2018;
        json = data;
    }

    /** 游戏进入下一局开始准备阶段 */
    private rev2019(data) {
        let json = ProtocolData.Rev2019;
        json = data;
        this.gameScene.readyBtn.visible = true;
        GameInfo.state = GameState.Ready;
    }

    /***单局结算 游戏结束结算广播 */
    private rev2020(data) {
        console.log("+++++++++++++++++++++RoundOver---------------")
        let json = ProtocolData.Rev2020;
        json = data;

        let delay = 0;
        //播放抓鸡动画
        if (json.fangpaiji_mj != 0) {
            delay = 5000;
            (App.PanelManager.open(PanelConst.CatchChicken) as CatchChickenPanel).update(json);
        }

        // //5s后显示结算信息
        egret.setTimeout(() => {
            App.PanelManager.close(PanelConst.CatchChicken);
            (App.PanelManager.open(PanelConst.RoundResultPanel) as RoundResultPanel).update(json);
        }, this, delay)
    }

    /** 冲锋鸡广播 */
    private rev2025(data) {
        let json = ProtocolData.Rev2025;
        json = data;
        this.gameScene.playChongFengJi();
    }

    /** 责任鸡广播 */
    private rev2027(data) {
        let json = ProtocolData.Rev2025;
        json = data;
        this.gameScene.playZRJi();
    }

    /** 广播玩家游戏准备 */
    private rev2004(data) {
        let json = ProtocolData.Rev2004;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.headShowUI.showReady(pos);
        if (json.uid == App.DataCenter.UserInfo.getMyUserVo().userID) {
            //准备阶段可以发起退出房间
            this.gameScene.showExit();
            this.gameScene.readyBtn.visible = false;
        }

    }

    /***广播解散房间（房卡游戏） */
    private rev203(data) {
        let json = ProtocolData.Rev203;
        json = data;
        if (json.result == 1) {
            App.DataCenter.UserInfo.deleteAllUserExcptMe();
            App.PanelManager.closeAllPanel();

            // 请求http解散请求
            if (json.ticket_id != 0 && json.roomid != 0) {
                this.sendDissolutionRoom(GameInfo.curRoomId);
            }
        }
    }

    /** 结束整个大牌局 */
    private rev204(data) {
        let json = ProtocolData.Rev204;
        json = data;
    }

    /** 常用语聊天应答 */
    private rev4(data) {
        let json = ProtocolData.Rev4;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.showChat(pos, json.type, json.tag, json.message);
    }

    /*** 广播某玩家的解散房间请求 */
    private rev201(data) {
        let json = ProtocolData.Rev201;
        json = data;
        if (json.init_uid != App.DataCenter.UserInfo.getMyUserVo().userID) {
            App.MsgBoxManager.getBoxA().showMsg("玩家:" + json.init_nick_name + " 发起退出房间，你是否同意", () => { this.sendAggretExitGame(1) }, () => { this.sendAggretExitGame(0) })
        }
    }

    /*** 广播某玩家是否同意解散房间 */
    private rev202(data) {
        let json = ProtocolData.Rev202;
        json = data;
        let msg = "玩家：" + json.nick_name + json.confirm ? "  同意" : "不同意" + "退出房间";
        Tips.info(msg);
    }

    /****房卡模式,房间结算 **/
    private revRoomBalance(data) {
        let json = ProtocolData.Rev204;
        json = data;
        (App.PanelManager.open(PanelConst.GameResultPanel) as GameResultPanel).update(json);
    }

    /*** 所有玩家定却完成 */
    private rev2041(data) {
        let json = ProtocolData.Rev2041;
        json = data;
    }

    /*** 进入定缺阶段广播	只在开房场的2-3人局生效 */
    private rev2023(data) {
        let json = ProtocolData.Rev2023;
        json = data;
        this.gameScene.dinQueUI.show();
    }

    /** 发送定缺成功广播 */
    private rev2024(data) {
        let json = ProtocolData.Rev2024;
        json = data;
        let seatid = CardLogic.getInstance().changeSeat(json.seatid);
        if (seatid == UserPosition.Down) {
            this.gameScene.dinQueUI.hide();
            this.dq_val = json.dq_val;
            this.gameScene.cardShowUI.setDinQueFlag(this.dq_val);
        }
    }

    /** 玩家明杠时-其他玩家可否抢杠胡操作板 */
    private rev2010(data) {
        let json = ProtocolData.Rev2010;
        json = data;
    }

    /** 玩家碰牌后-操作板提示自己可否暗杠 */
    private rev2009(data) {
        let json = ProtocolData.Rev2009;
        json = data;
    }

    /** 退出房间 */
    private rev2038(data) {
        let json = ProtocolData.Rev2038;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        if (pos == UserPosition.Down) {
            App.DataCenter.UserInfo.deleteAllUserExcptMe();
            this.sendEvent(HallController.EVENT_SHOW_HALL);
            App.PanelManager.closeAllPanel();
        } else {
            this.gameScene.headShowUI.hideHeadUI(pos);
            App.DataCenter.UserInfo.deleteUser(json.uid);
        }

    }

    /*-------------------------------------发送websocket请求----------------------------------------- */

    public sendReady() {
        let json = ProtocolData.Send1001;
        App.gameSocket.send(json);
    }

    public sendPeng() {
        let json = ProtocolData.Send1002;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        App.gameSocket.send(json);
    }

    public sendAnGang(cardValue: number) {
        let json = ProtocolData.Send1003;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        json.angang_mj = cardValue;
        App.gameSocket.send(json);
    }

    public sendMingGang(cardValue: number) {
        let json = ProtocolData.Send1004;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        json.ming_gang_mj = cardValue;
        App.gameSocket.send(json);

    }

    public sendFangGang() {
        let json = ProtocolData.Send1005;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        App.gameSocket.send(json);
    }

    public sendOutCard(cardValue: number) {
        let data = ProtocolData.Send1006;
        data.out_mj = cardValue;
        data.uid = App.DataCenter.UserInfo.selfUser.userID;
        App.gameSocket.send(data);
    }

    public sendPass() {
        let json = ProtocolData.Send1007;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        App.gameSocket.send(json);
    }

    public sendPass2() {
        let json = ProtocolData.Send1008;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        App.gameSocket.send(json);
    }

    public sendDinQue(dq_val: number) {
        let json = ProtocolData.Send1012;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        json.dq_val = dq_val;
        App.gameSocket.send(json);
    }

    public sendZMHu() {
        let json = ProtocolData.Send1009;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        App.gameSocket.send(json);

    }

    public sendFangPaoHu() {
        let json = ProtocolData.Send1010;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        App.gameSocket.send(json);
    }


    public sendQGangHu() {
        let json = ProtocolData.Send1011;
        json.uid = App.DataCenter.UserInfo.selfUser.userID;
        json.opt = 1;
        App.gameSocket.send(json);
    }


    public sendCancleTuoGuang() {
        let data = ProtocolData.Send1052;
        App.gameSocket.send(data);
    }

    public sendQuiteGame() {
        let data = ProtocolData.Send1051;
        App.gameSocket.send(data);
    }

    public sendWangExitGame() {
        let data = ProtocolData.Send103;
        App.gameSocket.send(data);
    }

    /***1.同意 0.不同意  */
    public sendAggretExitGame(confirm: number) {
        let data = ProtocolData.Send104;
        data.confirm = confirm
        App.gameSocket.send(data);
    }

    /**type 1、2.是预设的头像或消息 3.是用户自定义消息      tag	ype=1、2时的预设内容     message	type=3时的自定义消息*/
    public sendChat(type: number = 1, tag: number = 0, msg?: string) {
        let data = ProtocolData.Send3;
        data.type = type;
        data.tag = tag;
        data.message = msg;
        App.gameSocket.send(data);
    }


    public sendDissolutionRoom(roomId: number) {
        var httpsend = new HttpSender();
        var disRoomData = ProtocolHttp.send_DissolutionRoom;
        disRoomData.param.id = roomId;
        httpsend.send(disRoomData, this.revDisslutionRoom, this);
    }

    private revDisslutionRoom(rev: any) {
        this.sendEvent(HallController.EVENT_SHOW_HALL);
    }
}