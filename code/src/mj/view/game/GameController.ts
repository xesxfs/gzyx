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
        gameSocket.register(ProtocolHead.server_command.SERVER_ROOM_INFO_BC, this.revRoomInfo, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GAME_START_BC, this.revGameStart, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GET_ONE_MJ, this.revGetCard, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OUT_ONE_MJ, this.revOutCard, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_PASS, this.revPass, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_PENG, this.revPeng, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_ANGGANG, this.revAnGang, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_MINGGANG, this.revMingGang, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_FANG_GANG, this.revFangGang, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_ZIMOHU, this.revZMHu, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_FANG_PAO_HU, this.revPaoHu, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_QIANG_GANG_HU, this.revQiangGangHu, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GAME_READY_STAGE_BC, this.revNextGame, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GAME_END_BC, this.revGameOver, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_CHONG_FENG_JI_BC, this.revChongFengJi, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_ZHE_REN_JI_BC, this.revZRenJi, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OPERATE_CHECK_AFTER_GETIN_MJ, this.revAdjAction, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OPERATE_CHECK_OTHERS_PUTOUT_MJ, this.revPassiveAction, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_BEGIN_ROBOT_OP_BC, this.revTuoGuang, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_CANCEL_ROBOT_OP_SUCC_BC, this.revCancleTuoGuang, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GOLDROOM_LOGOUT_ROOM, this.revGoldRoomQuiteGame, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_READY_BC, this.revReady, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OPERATE_CHECK_QIANG_GANG_HU, this.revCheckQiangGan, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_OPERATE_CHECK_AFTER_PENG, this.revAfterPeng, this);

        gameSocket.register(ProtocolHead.server_command.SERVER_DINGQUE_STARGE_BC, this.revEnterDinQue, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_ALL_DIN_QUE_SUCC_BC, this.revDinQueSuccess, this);


        gameSocket.register(ProtocolHead.open_room_type_command.SERVER_DISSOLUTION_ROOM_RESULT_BC, this.revBCQiteGame, this);





    }

    public unRegisterSocket() {
        var socket: ClientSocket = App.gameSocket;
        // socket.unRegister(ProtocolHead.Rev100145);
    }

    public continueGame() {
        this.sendReady();
        this.gameScene.resetScene();
    }

    /***************************************接收数据****************************************** */

    private revRoomInfo(data) {
        let json = ProtocolData.Rev2002;
        json = data;
        GameInfo.playerNumber = json.player_num;
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
            App.DataCenter.UserInfo.addUser(user);
            this.gameScene.headShowUI.updateUserHead(user);
        }
    }

    private revGameStart(data) {
        let json = ProtocolData.Rev2003;
        json = data;
        this.gameScene.leftCardShowUI.setLeftCard(json.rest_mjs);
        let zhuangPos = CardLogic.getInstance().changeSeat(json.banker_seatid)
        this.gameScene.headShowUI.showZhuang(zhuangPos);
        this.gameScene.cardShowUI.createHandCard(json.players);
        this.gameScene.diceAnim.playAnimation(json.dice[0], json.dice[1]);
    }

    private revOutCard(data) {
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

    private revGetCard(data) {
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


    private revTuoGuang(data) {
        let json = ProtocolData.Rev2039;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        if (pos == UserPosition.Down) {
            this.gameScene.touGuanShowUI.showTuoGuan();
            this.gameScene.selectActUI.hide();
        }
    }

    private revCancleTuoGuang(data) {
        let json = ProtocolData.Rev2040;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        if (pos == UserPosition.Down) {
            this.gameScene.touGuanShowUI.hideTuoGuan();
        }
    }

    /***主动动作，玩家摸取麻将牌后，自己的可操作提示板 //自摸胡，亮牌，暗杠，蓄杠，过 */
    private revAdjAction(data) {
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
        }

    }
    /****被动动作，其它玩家出牌后的 点炮胡，碰，明杠，过 */
    private revPassiveAction(data) {
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

    private revPass(data) {
        let json = ProtocolData.Rev2011;
        json = data;
    }

    private revPeng(data) {
        let json = ProtocolData.Rev2012;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.cardShowUI.dealCPGAction(ACT_act.Act_Peng, pos, [json.mj], 0);
    }

    private revAnGang(data) {
        let json = ProtocolData.Rev2013;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.cardShowUI.dealCPGAction(ACT_act.Act_AnGang, pos, [json.mj], 0);
    }

    private revMingGang(data) {
        let json = ProtocolData.Rev2014;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.cardShowUI.dealCPGAction(ACT_act.Act_Gang, pos, [json.mj], 1);
    }

    private revFangGang(data) {
        let json = ProtocolData.Rev2015;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        this.gameScene.cardShowUI.dealCPGAction(ACT_act.Act_Gang, pos, [json.mj], 3);
    }

    private revZMHu(data) {
        let json = ProtocolData.Rev2016;
        json = data;
    }

    private revPaoHu(data) {
        let json = ProtocolData.Rev2017;
        json = data;
    }

    private revQiangGangHu(data) {
        let json = ProtocolData.Rev2018;
        json = data;
    }

    private revNextGame(data) {
        let json = ProtocolData.Rev2019;
        json = data;
    }

    private revGameOver(data) {
        console.log("+++++++++++++++++++++revGameOver---------------")
        let json = ProtocolData.Rev2020;
        json = data;
        (App.PanelManager.open(PanelConst.GameResultPanel) as GameResultPanel).update(json);
    }

    private revChongFengJi(data) {
        let json = ProtocolData.Rev2025;
        json = data;
        this.gameScene.playChongFengJi();
    }

    private revZRenJi(data) {
        let json = ProtocolData.Rev2025;
        json = data;
    }

    private revReady(data) {
        let json = ProtocolData.Rev2019;
        json = data;

        this.gameScene.showExit();  //准备阶段可以发起退出房间
    }

    /***广播解散房间（房卡游戏） */
    private revBCQiteGame(data) {
        let json = ProtocolData.Rev203;
        json = data;
        if (json.result == 1) {
            App.DataCenter.UserInfo.deleteAllUserExcptMe();
            App.PanelManager.closeAllPanel();

            if (json.ticket_id != 0 && json.roomid != 0) {
                this.sendDissolutionRoom(GameInfo.curRoomId);
            }
        }
    }

    /***所有玩家定却完成 */
    private revDinQueSuccess(data) {
        let json = ProtocolData.Rev2041;
        json = data;
    }

    /***进入定却 */
    private revEnterDinQue(data) {
        let json = ProtocolData.Rev2023;
        json = data;
        this.gameScene.dinQueUI.show();
    }
    /****定却广播 */
    private revBCDinQue(data) {
        let json = ProtocolData.Rev2024;
        json = data;
        if (json.seatid == UserPosition.Down) {
            this.gameScene.dinQueUI.hide();
            this.dq_val = json.dq_val;
            this.gameScene.cardShowUI.setDinQueFlag(this.dq_val);
        }
    }

    private revCheckQiangGan(data) {
        let json = ProtocolData.Rev2010;
        json = data;
    }

    private revAfterPeng(data) {
        let json = ProtocolData.Rev2009;
        json = data;
    }


    private revGoldRoomQuiteGame(data) {
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