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
        gameSocket.register(ProtocolHead.server_command.SERVER_GOLDROOM_LOGOUT_ROOM, this.revQuiteGame, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GAME_END_BC, this.revEndResult, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_GAME_READY_STAGE_BC, this.revReady, this);

    }

    public unRegisterSocket() {
        var socket: ClientSocket = App.gameSocket;
        // socket.unRegister(ProtocolHead.Rev100145);
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
        let json = ProtocolData.Rev2020;
        json = data;

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

    private revEndResult(data) {
        let json = ProtocolData.Rev2020;
        json = data;

    }

    private revQuiteGame(data) {
        let json = ProtocolData.Rev2038;
        json = data;
        let pos = CardLogic.getInstance().changeSeat(json.seatid);
        if (pos == UserPosition.Down) {
            App.DataCenter.UserInfo.deleteAllUserExcptMe();
            this.sendEvent(HallController.EVENT_SHOW_HALL);
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

    // /**广播通知有玩家离开房间 */
    // private revOutRoom(data) {
    //     var json = ProtocolData.Rev100047;
    //     json = data;
    //     let myuid = App.DataCenter.UserInfo.getMyUserVo().userID;
    //     let seat = json.deskstation;
    //     let pos = CardLogic.getInstance().changeSeat(seat);

    //     if (json.userid == myuid) {
    //         this.onQuitGame();

    //     } else {
    //         //删除被踢人员的信息
    //         if (App.DataCenter.UserInfo.isExist(json.userid)) {
    //             App.DataCenter.UserInfo.deleteUser(json.userid);
    //         }
    //         //匹配房显示loading
    //         this.gameScene.setMatchLoading();
    //         //重置用户UI
    //         this.gameScene.resetUserUI(pos);

    //     }
    // }

    // /**接收准备*/
    // public revReady(data) {
    //     var json = ProtocolData.Rev100165;
    //     json = data;
    //     console.log("接收准备,位置:", CardLogic.getInstance().changeSeat(json.deskstation));
    //     var pos = CardLogic.getInstance().changeSeat(json.deskstation);
    //     var userVo: UserVO = App.DataCenter.UserInfo.getUser(json.userid);
    //     userVo && (userVo.setState(PLAYER_STATE.READY, true));

    //     this.gameScene.showReady(pos);
    //     if (pos == UserPosition.Down) {
    //         App.EventManager.sendEvent(EventConst.GameStateChange, GameState.Ready);
    //     }
    //     App.SoundManager.playEffect(SoundManager.ready);
    // }


    // /**接收 庄家 骰子 只保存*/
    // public revStartGame(data) {
    //     ProtocolData.Rev100806 = data;
    //     console.log("接收庄家,位置:", CardLogic.getInstance().changeSeat(ProtocolData.Rev100806.seatID));
    // }


    // /**游戏开始发牌每人13张*/
    // public revDealCard(data) {
    //     console.log("接收发牌:", data);
    //     this.gameScene.revDealCard(data);
    // }

    // /**接收玩家摸牌*/
    // public revGetCard(data) {
    //     //刚开始发牌等手牌显示再显示
    //     if (this.gameScene.gameState == GameState.DealCard) {
    //         this.gameScene.headShowUI.hideAllReady();
    //         this.gameScene.headShowUI.moveTo();
    //         egret.Tween.get(this).wait(3000).call(() => {
    //             this.gameScene.showHandCard();
    //             this.gameScene.revGetCard(data);
    //         });
    //     } else {
    //         this.gameScene.revGetCard(data);
    //     }
    // }

    // /**通知玩家叫牌*/
    // public revNoticeAct(data) {
    //     this.gameScene.revNoticeAct(data);
    // }

    // /**接收响应玩家操作*/
    // public revAct(data, bAnim: boolean) {
    //     this.gameScene.revAct(data);
    // }

    // /**接收托管*/
    // public revTuoGuan(data) {
    //     var json = ProtocolData.Rev180_7_0;
    //     json = data;
    //     var seatID = json.seatID;
    //     var pos = CardLogic.getInstance().changeSeat(seatID);
    //     var isTrship = json.isTrship;
    //     console.log("接收托管,位置:", pos, "托管:", isTrship);
    //     //托管
    //     if (isTrship == true) {
    //         if (pos == UserPosition.Down) {
    //             // this.gameScene.hideActUI();
    //         }
    //         // this.gameScene.showTuoGuan(pos);
    //         App.SoundManager.playEffect(SoundManager.tuoGuan);
    //         //取消托管
    //     } else {
    //         // this.gameScene.hideTuoGuan(pos);
    //         // if (pos == UserPosition.Down && this.gameScene.curActPlayer == UserPosition.Down) {
    //         //     this.gameScene.selectActUI.visible = true;
    //         // }
    //     }
    // }


    // /**游戏结束 180, 58, 0*/
    // public revGameOver(data) {
    //     this.gameScene.revGameOver(data);
    // }

    // /**接收游戏状态*/
    // public revGameState(data) {
    //     this.gameScene.revGameState(data);
    // }

    // /**接收退出匹配房返回 */
    // private revTCMatchRoom(data) {
    //     var json = ProtocolData.Rev100121;
    //     json = data;
    //     if (json.code == 200) {
    //         this.onQuitGame();
    //     }
    // }

    // /**接收退出好友房返回 */
    // private revTCFriendRoom(data) {
    //     var json = ProtocolData.Rev101002;
    //     json = data;
    //     if (json.code == 200) {
    //         this.onQuitGame();
    //     }
    // }

    // //接收解散房间返回
    // private revJieSanRoom(data) {
    //     var json = ProtocolData.Rev100151;
    //     json = data;
    //     if (json.code == 200) {
    //         App.PanelManager.close(PanelConst.SendjiesanPanel);
    //         if (data.info.is_dissolve == 1) {

    //         }
    //         if (this.gameScene.gameState == GameState.Playing || this.gameScene.gameState == GameState.DealCard || this.gameScene.gameState == GameState.GameOver || this.gameScene.gameState == GameState.Ready) {
    //             // if (this.gameScene.curPlayCount != this.gameScene.maxPlayCount) {
    //             TipsLog.gameInfo("等待其他玩家同意");
    //             App.PanelManager.open(PanelConst.JieSanPanel, null, null, false);
    //             let jiesanPanel = App.PanelManager.getPanel(PanelConst.JieSanPanel) as JieSanPanel;
    //             var s = ProtocolData.Rev100155;
    //             s.info.solveUserName = App.DataCenter.UserInfo.getMyUserVo().nickName;
    //             s.info.solveUserID = App.DataCenter.UserInfo.getMyUserVo().userID;
    //             s.info.deskno = App.DataCenter.UserInfo.getMyUserVo().seatID;
    //             jiesanPanel.btnGroup.visible = false;
    //             jiesanPanel.waitLabel.visible = true;
    //             jiesanPanel.updateUser(s);
    //             jiesanPanel.timerStart();
    //             // }
    //         }
    //     }
    // }

    // /*** 广播通知解散桌子 */
    // private revJiesanSuccess(data) {
    //     var json = ProtocolData.Rev100160;
    //     json = data;
    //     //退出房间tween被移除，延迟处理
    //     setTimeout(() => {
    //         TipsLog.hallInfo("房间已解散，自动返回大厅");
    //     }, 200);
    //     // this.isJieSan = true;
    //     if (json.code == 200) {
    //         if (json.info.overType == 1) {
    //             this.onQuitGame();

    //         }
    //     }
    // }

    // /****************************************end***************************************************/


    // ////////////////////////////////////////////////////////////////////////////

    // /**发送请求游戏状态*/
    // public sendGameState() {
    //     var json = ProtocolData.Send100150;
    //     json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
    //     let room_type = App.DataCenter.roomInfo.roomType;
    //     var hallController: HallController = App.getController(HallController.NAME);
    //     if (hallController.isReconnection) {
    //         json.room_name = "";
    //     } else {
    //         if (room_type == RoomType.FriendRoom) {
    //             json.room_name = "csmj_room_friend_1"
    //         } else if (room_type == RoomType.MatchRoom) {
    //             json.room_name = "csmj_room_match_1"
    //         }
    //     }
    //     App.gameSocket.send(ProtocolHead.Send100150, json);
    // }

    // /**
    //  * 玩家请求操作(吃、碰、杠、胡等) 
    //  * @act 玩家动作
    //  * @cardList 动作牌列表
    //  */
    // public sendAct(act: ACT_act, cardList = null) {
    //     var json = ProtocolData.Send100810;
    //     json.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
    //     json.act = act;
    //     json.cardList = cardList;
    //     App.gameSocket.send(ProtocolHead.Send100810, json);
    //     console.log("提交动作,act:", act, "cardList:", cardList);
    // }

    // /**发送准备 */
    // public sendReady() {
    //     var data = ProtocolData.Send100162;
    //     data.userid = App.DataCenter.UserInfo.getMyUserVo().userID,
    //         data.deviceID = "111"
    //     App.gameSocket.send(ProtocolHead.Send100162, data);
    // }


    // /**发送取消准备 */
    // public sendCancelReady() {
    //     App.gameSocket.send(ProtocolHead.Send100164);
    // }


    // /*** 好友房发送退出房间*/
    // public SendTCRoom() {
    //     let room_type = App.DataCenter.roomInfo.roomType;
    //     if (room_type == RoomType.FriendRoom) {
    //         this.sendJieSan();
    //     } else {
    //         let json = ProtocolData.Send100121;
    //         json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
    //         json.deviceID = "111";
    //         // if (this.gameScene.gameState == GameState.GameOver || this.gameScene.gameState == GameState.Free || this.gameScene.gameState == GameState.Ready) {
    //         App.gameSocket.send(ProtocolHead.Send100121, json);
    //         // }
    //         // else {
    //         //     TipsLog.gameInfo("请在游戏结束后退出房间");
    //         // }
    //     }
    // }

    // //发送解散房间
    // public sendJieSan() {
    //     let json = ProtocolData.Send100151;
    //     json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
    //     json.deviceID = "111";
    //     App.gameSocket.send(ProtocolHead.Send100151, json);
    // }


    // /**离开游戏*/
    // public onQuitGame() {
    //     //移除所有弹框
    //     App.PanelManager.closeAllPanel();
    //     App.MsgBoxManager.recycleAllBox();
    //     App.DataCenter.deskInfo.ownerID = 0;
    //     App.DataCenter.UserInfo.deleteAllUserExcptMe();
    //     var userVo: UserVO = App.DataCenter.UserInfo.getMyUserVo();
    //     userVo && (userVo.setState(PLAYER_STATE.READY, false));
    //     App.EventManager.sendEvent(HallController.EVENT_SHOW_HALL);
    // }

    //////////////////////////////////////////////////////////////////////////////
}