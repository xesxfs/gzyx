class GameScene extends BaseScene {
    protected ctrl: GameController;       //游戏控制模块

    //--------------逻辑--------------
    public cardFactory: CardFactory;      //麻将牌工厂
    public cardLogic: CardLogic;          //麻将牌逻辑

    /*** 玩家人数 */
    private playerNum: number = 4;

    /**游戏状态 */
    public gameState: GameState;

    /*******************游戏组件**************************/

    public swapCardUI: SwapCardUI;
    public cardShowUI: CardsShowUI;
    public actShowUI: ActShowUI;
    public headShowUI: HeadShowUI;
    public outCardTipUI: OutCardTipUI;
    public discShowUI: DiscShowUI;
    public topTitleShowUI: TopTitleShowUI;
    public matchLoadingUI: MatchLoadingUI;
    public scoreShowUI: ScoreShowUI;
    public froomInfoShowUI: FriendRoomShowUI;
    public leftCardUI: LeftCardShowUI;
    public tuoguanShowUI: TuoGuanShowUI;
    public swapCardGroup: eui.Group;

    /*****************************************************/


    private autoReadyTimer: DateTimer = new DateTimer(1000);//自动准备计时器
    public readyTime: number = 2;          //自动准备时间

    public constructor() {
        super();
        this.skinName = "GameSceneSkin1";
    }

    /**组件初始化完成 */
    protected childrenCreated() {
        this.cardLogic = CardLogic.getInstance();
        this.cardFactory = CardFactory.getInstance();
        console.log("childrenCreated");
    }

    protected onEnable() {
        this.actShowUI.addEventListener("actAction", this.actAction, this);
        this.cardShowUI.addEventListener("cardAction", this.cardAction, this);
        this.setBottomMenu();
        this.resetScene();
        this.setMatchLoading();
        this.updateAllHeadUI();

        this.setRoomInfo();
        this.ctrl.registerSocket();
        this.getGameState();
        this.startReadyTimer(this.readyTime);
        this.showSwapCard();
        console.log("onEnable");
    }

    protected onRemove() {
        App.SoundManager.stopBGM();
    }

    /*******************************************************************************
     ****************************UI Action start************************************/


    /**cardAction*/
    private cardAction(e: egret.Event) {
        var data = e.data;
        this.sendAct(data[0], data[1]);
    }


    /**actShowUI*/
    private actAction(e: egret.Event) {
        var data = e.data;
        this.sendAct(data[0], data[1]);
    }

    /******************************************************************************
     ****************************UI　Action end************************************/




    /******************************************************************************
     ****************************牌逻辑处理****************************************/


    /***显示手牌**/
    public showHandCard() {
        console.log("显示手牌");
        for (var i = 0; i < this.playerNum; i++) {
            this.cardShowUI.showHandCard(i);
        }
    }


    /**接收发牌 并保存 不显示**/
    public revDealCard(data) {
        console.log("接收发牌");
        this.gameState = GameState.DealCard;
        this.cardShowUI.createHandCard(data);
        /***第一局，需要滚骰子**/
        var diceList = ProtocolData.Rev100806.dice1;
        if (diceList == null) {
            // this.gameState = GameState.Playing;
            // this.showZhuang();
        } else {
            // this.playDiceAnim();
        }
    }


    /**玩家摸牌*/
    public revGetCard(data) {
        console.log("玩家摸牌")
        this.gameState = GameState.Playing;
        var json = ProtocolData.Rev180_53_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var cardValue = json.cardList[0];
        this.cardShowUI.takeCard(pos, cardValue);
        // this.showLight(pos);
        // this.reduceLeftCard();
        // this.startOutTimer(this.outTime);
        //其他动作处理
        if (json.state != 0) {
            //自己摸牌,可能触发出牌,暗杠,明杠,胡
            if (pos == UserPosition.Down) {
                console.log("玩家摸牌：", cardValue, " 状态:", json.state)
                if (this.cardLogic.checkActState(json.state, ACT_state.Act_NormalDo)) {
                    this.cardShowUI.noticeOutCard();
                }
                var actList = this.cardLogic.anylzyeActState(json.state);
                this.actShowUI.showSelectAct(actList, this.cardShowUI.getHandleCard(UserPosition.Down), cardValue, this.cardShowUI.CPGList[UserPosition.Down], 1);
            }

        }
    }


    /***通知玩家叫牌  (能不能吃、碰、点杠、点炮) ***/
    public revNoticeAct(data) {
        console.log("通知玩家叫牌")
        var json = ProtocolData.Rev180_55_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        console.log("通知玩家叫牌,位置:", pos, "牌值:", json.card, "状态:", json.state);
        if (pos == UserPosition.Down) {    //通知的是自己，则显示操作面板         
            var actList = this.cardLogic.anylzyeActState(json.state);
            this.actShowUI.showSelectAct(actList, this.cardShowUI.getHandleCard(UserPosition.Down), json.card, this.cardShowUI.CPGList[UserPosition.Down]);
        }
        // this.startOutTimer(this.actTime);
    }


    /**
     * 响应玩家操作 (其他玩家吃、碰等，广播给另外3玩家) 180, 56, 0
     * @data 操作数据
     * @bAnim 是否播放动画、声音
     */
    public revAct(data, bAnim: boolean = true) {
        console.log("响应玩家操作")
        var json = ProtocolData.Rev180_56_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        var cardValue = json.cardList[0];
        var cardList = json.cardList;
        var act: ACT_act = json.act;
        var actParam = json.actParam;
        var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(json.seatID);
        this.actShowUI.hideSelectAct();

        //因为没有自摸字段，这里判断是否自摸
        if (act == ACT_act.Act_Hu) {
            //     if (this.curGetCard && (pos == this.curGetCard.userPos)) {
            //         App.SoundManager.playAct(ACT_act.Act_zimo, userVo.sex);
            //     } else {
            //         App.SoundManager.playAct(ACT_act.Act_Hu, userVo.sex);
            //     }
        } else {
            //     App.SoundManager.playAct(act, userVo.sex);
        }

        //console.log("接收动作,位置:",pos,"动作:",act,"data:",json);
        switch (act) {
            case ACT_act.Act_NormalDo: //出牌位置
                bAnim && App.SoundManager.playOutCard(cardValue, userVo.sex);
                this.cardShowUI.dealOutAction(pos, cardValue);
                // this.hideAllActTip();
                // this.hideAllOutEffect();
                // bAnim && this.showOutEffect(cardValue, pos);
                break;
            case ACT_act.Act_Pass:    //过
                break;
            case ACT_act.Act_Hu:      //胡
                // this.showActTip(act, pos);
                break;
            case ACT_act.Act_Peng:    //碰牌
            case ACT_act.Act_Chi:     //吃牌
            case ACT_act.Act_Gang:    //杠
            case ACT_act.Act_AnGang:  //暗杠
                // this.showLight(pos);
                // this.startOutTimer(this.outTime);
                //this.offHandCard(pos, 1);//偏移手牌
                // this.eatHandler(act, pos, cardList, actParam);
                this.cardShowUI.dealCPGAction(act, pos, cardList, actParam)
                // bAnim && this.showActTip(act, pos);
                // if (pos == UserPosition.Down) {
                //     this.bAllowOutCard = true;
                // }
                break;
        }


    }

    /**通知玩家出牌  已经没有用**/
    public revNoticeOutCard(data) {
        console.log("通知玩家出牌");
        var json = ProtocolData.Rev180_57_0;
        json = data;
        var pos = this.cardLogic.changeSeat(json.seatID);
        if (pos == UserPosition.Down) {
            this.cardShowUI.noticeOutCard()
        }
    }

    /***广播玩家叫牌 **/
    public revNoticeJiao() {
        console.log("广播玩家叫牌");
    }

    /**接收牌局信息*/
    public revRecordInfo(data) {
        console.log("接收牌局信息");
        var json = ProtocolData.Rev180_62_0;
        json = data;
    }

    /***获取游戏状态**/
    private getGameState() {
        console.log("请求获取游戏状态");
        //暂时屏蔽超时退回大厅回调
        //App.LoadingLock.lock(this.quitToHall,this);
        App.LoadingLock.lock(null, this);
        this.ctrl.sendGameState();
    }

    /***接收游戏状态**/
    public revGameState(data) {
        App.LoadingLock.unlock();
        var json = ProtocolData.Rev100803;
        json = data;
        var deskStatus = json.deskStatus;
        var gameSeatInfo = json.gameSeatInfo;
        var lastCardNum = json.lastCardNum;
        let count = json.curPlayCount;
        //游戏中就把当前局数加1
        if (deskStatus == GS_GAME_STATION.GS_GAME_PLAYING) {
            count += 1;
        }
        var curPlayCount = count;
        var maxPlayCount = json.maxPlayCount;
        //baoc游戏规则
        // ProtocolData.gameConfig = json.gameConfig;
        /***玩家信息 */
        this.saveGameSeatInfo(gameSeatInfo);
        this.setAllUserReady();
        /***剩余牌数 */
        this.leftCardUI.setLeftCard(json.lastCardNum);
        /***局数*/
        this.topTitleShowUI.setJuShu(curPlayCount, maxPlayCount);

        switch (deskStatus) {
            case GS_GAME_STATION.GS_WAIT_SETGAME:  //等待设置游戏
                this.gameState = GameState.Free;
                break;
            case GS_GAME_STATION.GS_WAIT_ARGEE:    //等待玩家同意游戏
                // if (this.curPlayCount > 0) {
                //     this.gameState = GameState.GameOver;
                // } else {
                //     this.gameState = GameState.Free;
                // }
                // this.gsWaitAgree(data);
                break;
            case GS_GAME_STATION.GS_GAME_PLAYING:  //游戏中 
                this.gameState = GameState.Playing;
                this.gsGamePlaying(data);
                break;
            case GS_GAME_STATION.GS_GAME_FINSHED:  //游戏结束
                this.gameState = GameState.GameOver;
                break;
        }

    }

    /***断线游戏中,恢复游戏场景**/
    private gsGamePlaying(data) {
        var json = ProtocolData.Rev100803;
        json = data;
        var deskStatus = json.deskStatus;
        this.gameState = GameState.Playing;
        App.DataCenter.gameState = GameState.Playing;
        this.headShowUI.moveTo();
        this.froomInfoShowUI.hide();
        this.hideAllReady();
        this.resumeDesk(data);

    }
    /***恢复桌子场景**/
    private resumeDesk(data) {
        var json = ProtocolData.Rev100803;
        json = data;
        var bankerSeat = json.bankerSeat;
        var gameSeatInfo = json.gameSeatInfo;
        var curCanDoAct = json.curCanDoAct;//游戏动作状态
        // this.curActCard = json.pre_op_card;//最后一张打出的牌       
        var pre_speaker_seat = json.pre_speaker_seat; // 最后一个出牌的人
        var lastpos;
        if (pre_speaker_seat != -1) {
            var speakSeat = (pre_speaker_seat + 1) % 4; //最后一个出牌人的下家
            lastpos = CardLogic.getInstance().changeSeat(speakSeat);//当前出牌人pos     
        }

        var seatInfoLen = gameSeatInfo.length;
        for (var i = 0; i < seatInfoLen; i++) {
            var seatInfo = ProtocolData.GameSeatInfo;
            seatInfo = gameSeatInfo[i];
            var seatID = seatInfo.seatID;
            var pos = this.cardLogic.changeSeat(seatID);

            //吃牌
            var chiCards = seatInfo.chiCards;
            if (chiCards != null) {

                var chiCardLen = chiCards.length;
                var chiNum = chiCardLen / 3;
                for (var j = 0; j < chiNum; j++) {
                    var chiList = [chiCards[j * 3], chiCards[j * 3 + 1], chiCards[j * 3 + 2]]
                    ArrayTool.sortArr(chiList); //排序
                    this.cardShowUI.pushCPG(pos, ACT_act.Act_Chi, chiList)
                }
            }
            //碰牌
            var pengCards = seatInfo.pengCards;
            if (pengCards != null) {
                var pengCardLen = pengCards.length;
                for (var j = 0; j < pengCardLen; j++) {
                    var cardValue = pengCards[j];
                    var pengList = [cardValue, cardValue, cardValue];
                    this.cardShowUI.pushCPG(pos, ACT_act.Act_Peng, pengList)
                }
            }
            //杠牌
            var gangCards = seatInfo.gangCards;
            if (gangCards != null) {
                var gangCardLen = gangCards.length;
                for (var j = 0; j < gangCardLen; j++) {
                    var cardValue = gangCards[j];
                    var gangList = [cardValue, cardValue, cardValue, cardValue];
                    this.cardShowUI.pushCPG(pos, ACT_act.Act_Gang, gangList)
                }
            }

            //暗杠
            var anGangCards = seatInfo.anGangCards;
            if (anGangCards != null) {
                var anGangCardLen = anGangCards.length;
                for (var j = 0; j < anGangCardLen; j++) {
                    var cardValue = anGangCards[j];
                    var anGangList = [cardValue, cardValue, cardValue, cardValue];
                    this.cardShowUI.pushCPG(pos, ACT_act.Act_AnGang, anGangList)
                }
            }
            //出牌
            var playOutCards = seatInfo.playOutCards;
            if (playOutCards != null) {
                var outCardLen = playOutCards.length;
                for (j = 0; j < outCardLen; j++) {
                    this.cardShowUI.addCard2Out(pos, playOutCards[j]);
                }
            }
            //手牌
            var handCards = seatInfo.handCards;
            if (handCards != null) {
                var handCardLen = handCards.length;
                for (var j = 0; j < handCardLen; j++) {
                    var cardValue = handCards[j];
                    this.cardShowUI.pushHandCard(cardValue, pos);
                }

                if (handCardLen % 3 == 2) {
                    lastpos = pos;
                    if (pos == UserPosition.Down) {
                        let findValue = this.cardShowUI.findAndRmHandCard(seatInfo.last_card);
                        this.cardShowUI.takeCard(pos, findValue);

                    } else {
                        this.cardShowUI.removeHandCardByList(pos, [seatInfo.last_card]);
                        this.cardShowUI.takeCard(pos, seatInfo.last_card);
                    }
                }
            }
            this.cardShowUI.showHandCard(pos);
        }

        //设置庄家
        // this.zhuangPos = this.cardLogic.changeSeat(bankerSeat);
        // this.zhuangSeat = bankerSeat;
        var actList = this.cardLogic.anylzyeActState(curCanDoAct);
        let actType = 0;
        if (lastpos == UserPosition.Down) {
            this.cardShowUI.noticeOutCard()
            actType = 1;
            this.actShowUI.showSelectAct(actList, this.cardShowUI.getHandleCard(UserPosition.Down),json.pre_op_card, this.cardShowUI.CPGList[UserPosition.Down], actType);
        } else {
            this.actShowUI.showSelectAct(actList, this.cardShowUI.getHandleCard(UserPosition.Down), json.pre_op_card, this.cardShowUI.CPGList[UserPosition.Down], actType);
        }

        this.discShowUI.showLight(lastpos);
        this.discShowUI.startOutTimer();
        // this.showZhuangFlag(this.zhuangPos);
        //显示圆盘
        this.showDisc();
        //隐藏当前出牌指示
        // this.outFlag.hide();
    }


    //保存游戏位置信息中的用户id等数据 (由于进入房间之前，就已经传递了用户信息，这里重复传送不保存)
    private saveGameSeatInfo(gameSeatInfo) {
        var len = gameSeatInfo.length;
        for (var i = 0; i < len; i++) {
            var seatInfo = ProtocolData.GameSeatInfo;
            seatInfo = gameSeatInfo[i];
            var userVo: UserVO = App.DataCenter.UserInfo.getUser(seatInfo.userID);
            if (userVo == null) {
                userVo = new UserVO();
                userVo.userID = seatInfo.userID;
                App.DataCenter.UserInfo.addUser(userVo);
            }
            userVo.seatID = seatInfo.seatID;
            userVo.state = seatInfo.status;
            userVo.point = seatInfo.point;

        }
    }

    /***接收新换的牌*/
    public revSwapCard(data) {
        console.log("新换得的牌:", json);
        var json = ProtocolData.Rev100822;
        json = data;
    }

    /** 广播杠立刻结算*/
    public revGangResult(data) {
        var json = ProtocolData.Rev180_61_0;
        json = data;
    }
    /***游戏结束***/
    public revGameOver(data) {
        console.log("游戏结束");
        ProtocolData.Rev180_58_0 = data;
        var json = ProtocolData.Rev180_58_0;
    }

    /***玩家请求操作(出,吃、碰、杠、胡等) */
    public sendAct(act: ACT_act, cardList = null) {
        this.ctrl.sendAct(act, cardList);
    }


    /******************************************************************************
     ****************************牌逻辑结束****************************************/

    /**
     * 匹配场loading 设置
     */
    public setMatchLoading() {
        if (App.DataCenter.roomInfo.roomType != RoomType.MatchRoom) {
            return;
        }
        let len = App.DataCenter.UserInfo.getUserNum();
        if (len >= 4) {
            this.matchLoadingUI.stopMatching();
        } else {
            this.matchLoadingUI.startMatching();
        }
    }


    /***显示换牌**/
    public showSwapCard() {
        if (App.DataCenter.debugInfo.isDebug || App.DataCenter.secret) {
            this.swapCardUI || (this.swapCardUI = new SwapCardUI());
            this.swapCardUI.init(this);
        }
    }

    /**发送退出游戏*/
    public quitToHall() {
        // this.ctrl.onQuitGame();
    }


    /***加载资源**/
    private loadAsset() {
        //加载游戏其他资源
        App.ResUtils.loadGroupQuiet(AssetConst.Game, 5); //游戏
        App.ResUtils.loadGroupQuiet(AssetConst.Result, 4); //结算

        //加载打牌语音
        if (App.SoundManager.allowPlayEffect) {
            if (App.SoundManager.isGuangDongSpeak) {
                App.ResUtils.loadGroupQuiet(AssetConst.Sound_GuangDong);
            } else {
                App.ResUtils.loadGroupQuiet(AssetConst.Sound_PuTong);
            }
            App.ResUtils.loadGroupQuiet(AssetConst.Sound_Other);
        }
        //加载背景音乐
        if (App.SoundManager.allowPlayBGM) {
            App.ResUtils.loadGroupQuiet(AssetConst.Sound_BGM, 2);
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
    }

    /**加载资源完成**/
    private onGroupComplete(event: RES.ResourceEvent) {
        if (event.groupName == AssetConst.Sound_BGM) {
            App.SoundManager.playBGM(SoundManager.bgm);
        } else if (event.groupName == AssetConst.Card) {
            this.showSwapCard();
        }
    }

    //********************************************************************/
    public resetScene() {
        this.hideTuoGuan();
        this.hideDisc();
        this.hideFriendInfo();
        this.hideLeftCard();
        this.hideMatchLoading();
        this.hideAllReady();
    }

    public resetGame() {

    }

    public hideDisc() {
        this.discShowUI.hide();
    }

    public showDisc() {
        this.discShowUI.show();
    }

    public hideLeftCard() {
        this.leftCardUI.hide();
    }

    public showLeftCard() {
        this.leftCardUI.show();
    }

    public hideFriendInfo() {
        this.froomInfoShowUI.hide();
    }

    public showFriendInfo() {
        this.froomInfoShowUI.show();
    }

    public hideMatchLoading() {
        this.matchLoadingUI.hideMatching();
    }

    public showMatchLoading() {
        this.matchLoadingUI.showMatching();
    }

    public hideTuoGuan() {
        this.tuoguanShowUI.hideTuoGuan();
    }

    public showTuoGuan() {
        this.tuoguanShowUI.showTuoGuan();
    }

    public showReady(pos: UserPosition) {
        this.headShowUI.showReady(pos);
    }

    public hideReady(pos: UserPosition) {
        this.headShowUI.hideReady(pos);
    }
    /**************************************************************** */



    public userJoin(user: UserVO) {
        //匹配房显示loading     
        this.setMatchLoading();
        this.updateHeadUI(user);
    }

    /***更新所有头像 */
    public updateAllHeadUI() {
        let userList = App.DataCenter.UserInfo.userList;
        for (let key in userList) {
            let user = <UserVO>userList[key];
            user.checkState
            user.userPos = this.cardLogic.changeSeat(user.seatID);
            this.headShowUI.updateUserHead(user.userPos, user.seatID, user.userID, user.headUrl, user.nickName, user.point);
        }
    }
    /****更新头像 */
    public updateHeadUI(user: UserVO) {
        user.userPos = this.cardLogic.changeSeat(user.seatID);
        this.headShowUI.updateUserHead(user.userPos, user.seatID, user.userID, user.headUrl, user.nickName, user.point);
    }

    /**设置已进入房间玩家准备状态**/
    public setAllUserReady() {
        var userList = App.DataCenter.UserInfo.userList;
        for (var key in userList) {
            var userVo: UserVO = userList[key];
            if (userVo.checkState(PLAYER_STATE.READY)) {
                this.showReady(userVo.userPos);
            } else {
                this.hideReady(userVo.userPos);
            }
        }
    }

    public hideHeadUI(pos: UserPosition) {
        this.headShowUI.hideHeadUI(pos);
    }

    public hideAllReady() {
        this.headShowUI.hideAllReady()
    }

    public resetUserUI(pos: UserPosition) {
        this.hideHeadUI(pos);
        this.hideReady(pos);
    }



    ///////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    /**开始自动准备倒计时***/
    public startReadyTimer(time) {
        this.autoReadyTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onAutoReadyTime, this);
        this.autoReadyTimer.repeatCount = time;
        this.autoReadyTimer.reset();
        this.autoReadyTimer.start();
    }

    /**停止自动准备倒计时***/
    private stopReadyTimer() {
        this.autoReadyTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onAutoReadyTime, this);
        this.autoReadyTimer.stop();
    }

    /***计时结束自动准备***/
    private onAutoReadyTime() {
        this.stopReadyTimer();
        this.autoReady();
    }

    /***自动准备***/
    private autoReady() {
        this.sendReady();
    }
    /***发送准备***/
    private sendReady() {
        this.ctrl.sendReady();
    }

    /////////////////////////////////////////////////////////////////////////////////

    /**设置房间信息 */
    private setRoomInfo() {
        let roomInfo = App.DataCenter.roomInfo;
        let deskInfo = App.DataCenter.deskInfo
        if (roomInfo.roomType == RoomType.FriendRoom) {
            this.froomInfoShowUI.setDeskNo(deskInfo.deskID)
            this.froomInfoShowUI.show();
            this.topTitleShowUI.setDeskNum(deskInfo.deskID);
            this.topTitleShowUI.showFriendTitle();
        } else {
            this.topTitleShowUI.showMatchTitle();

        }
    }
    /**设置底部菜单 */
    public setBottomMenu() {
        let bSkin = (App.DataCenter.roomInfo.roomType == RoomType.FriendRoom)
        var bottomMenus: BottomMenus;
        if (bSkin) {
            bottomMenus = App.BottomMenuManager.getBoxB();
        } else {
            bottomMenus = App.BottomMenuManager.getBoxC();
        }
        bottomMenus.showMenu(this);
        bottomMenus.ok = (bottomName) => {
            this.onMenusTouch(bottomName);
        }
    }

    /**点击底部菜单栏*/
    private onMenusTouch(bottomName: BottomName) {
        switch (bottomName) {
            case BottomName.mall:
                //this.ctrl.sendShopListReq(1);
                break;
            case BottomName.knapsack:
                //this.ctrl.getBackpack();
                break;
            case BottomName.set:
                App.PanelManager.open(PanelConst.SetPanel, null, this, true, true, null, true);
                break;
            case BottomName.record:
                //this.ctrl.send101004();
                break;
            case BottomName.tc:
                this.ctrl.SendTCRoom();
                break;
            case BottomName.talk:
                App.PanelManager.open(PanelConst.TapePanel);
                break;
            case BottomName.take:
                App.PanelManager.open(PanelConst.RulePanel, null, this, true, true, null, true);
                break;
            default:
                break;
        }
    }

}