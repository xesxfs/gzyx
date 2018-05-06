class GameController extends BaseController {
    /**游戏模块名*/
    public static NAME: string = "GameController";
    /**显示游戏场景*/
    public static EVENT_SHOW_GAME_SCENE: string = "EVENT_SHOW_GAME_SCENE";
    /**游戏场景*/
    public gameScene: GameScene;

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

    }

    private revOutCard(data) {
        let json = ProtocolData.Rev2006;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        let cardValue = json.out_mj;
        this.gameScene.outCard(pos, cardValue);
        this.gameScene.outCardTipUI.showOutEffect(cardValue, pos);
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
    }

    private revZRenJi(data) {
        let json = ProtocolData.Rev2025;
        json = data;
    }

    private revReady(data) {
        let json = ProtocolData.Rev2019;
        json = data;
    }


    /***广播解散房间（房卡游戏） */
    private revBCQiteGame(data) {
        let json = ProtocolData.Rev203;
        json = data;
        if (json.result) {
            App.DataCenter.UserInfo.deleteAllUserExcptMe();
            App.PanelManager.closeAllPanel();
            this.sendEvent(HallController.EVENT_SHOW_HALL);
        }

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



}