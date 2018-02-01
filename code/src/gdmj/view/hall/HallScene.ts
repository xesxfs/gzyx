/**
 * 大厅界面
 * @author chenwei
 * @date 2016/6/28
 */
class HallScene extends BaseScene {
    /**场景控制类*/
    protected ctrl: HallController;
    private bFirstLogin: boolean = true;
    //游戏内容
    // private pageView:PageView;
    //    开台
    private openDeskBtn: eui.Button;
    //    二维码
    private QRCodeBtn: eui.Button;
    //      姓名
    private userNameLab: eui.Label;
    //      房间Id
    private roomIdLab: eui.Label;
    //    跑马灯
    private marquee: Marquee
    //    设置按钮
    //private setBtn :eui.Button;
//    修改房间
    private modifyDeskBtn:eui.Button;

    public friendMask1:eui.Image;
    public playMask1:eui.Image;
    public lightPlay1:eui.Image;
    public lightPlay2:eui.Image;
    public lightFriend1:eui.Image;
    public lightFriend2:eui.Image;
    public friendMask2:eui.Image;
    public playMask2:eui.Image;
  

     //鄂艳龙
    // //消息按钮
    private hall_playground: eui.Button;
    /**好友房列表*/
    private hall_friends_room: eui.Button;
    /**聊天记录房间号 */
    public deskCode: number;
    //算分按钮
    //private scoreBtn:eui.Button;
    //展开
    // private expandBtn:eui.Button;
    // //收缩
    // private shrinkBtn:eui.Button;

    // private topHeadGroup:eui.Group;

    // private bottomMenuGroup:eui.Group;

    //花瓣
    private flowerImg: eui.Image;
    private flowerImg1: eui.Image;

    private fullScreenGroup: eui.Group;

    private deskInfoGroup: eui.Group;

    private basePointLab: eui.Label;

    private bottomMenus: BottomMenus;
    public constructor() {
        super();
        this.skinName = "HallSceneSkin";
    }

    protected childrenCreated() {
        App.gameSocket.startConnect(App.DataCenter.ServerInfo.SERVER_URL, true);
        this.ctrl.getQrCode();

         this.lightPlay1.mask = this.playMask1;
         this.lightPlay2.mask = this.playMask2;
         this.lightFriend1.mask = this.friendMask1;
         this.lightFriend2.mask = this.friendMask2;
         this.lightPlay1.touchEnabled = false;
         this.lightPlay2.touchEnabled = false;
         this.lightFriend1.touchEnabled = false;
         this.lightFriend2.touchEnabled = false;
    }

    public chargeBase() {
        if (App.getInstance().indepFlag && !App.DataCenter.UserInfo.getMyUserVo().sex) {
            this.ctrl.getIconUrl();
        }
    }

    protected onEnable() {
        this.buttonLight(this.lightPlay1, this.lightPlay2);
        this.buttonLight(this.lightFriend1, this.lightFriend2);

        console.log("socketclose",App.DataCenter.socketClose);
        if(App.DataCenter.socketClose){
            App.DataCenter.socketClose=false;
            App.gameSocket.startConnect(App.DataCenter.ServerInfo.SERVER_URL,true); 
        }
        var bottomMenus: BottomMenus;
        if (App.getInstance().indepFlag) {
            bottomMenus = App.BottomMenuManager.getBoxD();
        }
        else {
            bottomMenus = App.BottomMenuManager.getBoxA();
        }
        bottomMenus.showMenu(this);
        bottomMenus.ok =this.onMenusTouch;
        
        // this.updateCurDeskUI();
        let user: UserVO = App.DataCenter.UserInfo.getMyUserVo();
        //推送服务器
        // App.pushSocket.startConnect(App.DataCenter.ServerInfo.PUSH_SERVER_URL);

        this.ctrl.registerSocket();
        if (user.isOvertime && !App.DataCenter.shareInfo.deskCode) {
            console.log("房间过期1");
            this.openReNew();
            //房间过期重置首次进入
            this.bFirstLogin = false;
            //this.sendSelfRoom();
        } else {
            //this.sendSelfRoom();
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSceneTouch, this);
        this.hall_friends_room.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendRoom, this);
        this.hall_playground.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendInMatchRoom, this);
        // this.chatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenusTouch, this);
        // this.feedBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenusTouch, this);
        // this.scoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onScoreBtnTouch,this);
        // this.expandBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFullScreen,this);
        // this.shrinkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFullScreen,this);
        // this.deskInfoGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDeskInfo,this);
        // egret.setTimeout(this.onDeskInfo,this,10000);
        egret.ExternalInterface.addCallback("purchase", function (message: string) {
            // var ctrl1 = new HallController();
            // ctrl1.verificationPay(message);
        });
        this.getMarquee();
        //加载资源  
        this.loadAsset();

        this.hallFlower();
        setTimeout(() => {
            this.hallFlower1();
        }, 500);


    }

    /**
     *  获取跑马灯
     */
    private getMarquee() {
        // this.ctrl.sendGetMsgMarquee();        
    }
    /**
     * 开始跑
     */
    public starMarquee() {
        this.marquee.startRolling();
    }
    protected onRemove() {
        //注销socket
        this.ctrl.unRegistSocket();
        egret.Tween.removeTweens(this.flowerImg);
        egret.Tween.removeTweens(this.flowerImg1);
        this.flowerImg.x = -50;
        this.flowerImg.y = 709;
        this.flowerImg1.x = 780;
        this.flowerImg1.y = 389;

       this.removeLight();
    }
    //跑马灯
    public pushMqruee(msg: string, c: number = 1) {
        this.marquee.push(msg, c)
    }

    public sendSelfRoom(code = null) {
        this.ctrl.registerSocket();
        if (this.bFirstLogin) {
            this.bFirstLogin = false;
            var code1 = App.DataCenter.shareInfo.deskCode;
            var desk = parseInt(App.DataCenter.shareInfo.deskId);
            this.ctrl.sendSelfRoom(code1, desk);
        } else {
            // this.ctrl.sendSelfRoom(code);        
            this.ctrl.sendInRoom1(code);
        }
    }

    /**点击场景UI*/
    private onSceneTouch(e: egret.TouchEvent) {

        let uer = App.DataCenter.UserInfo.getMyUserVo();

        switch (e.target) {
            case this.QRCodeBtn:

                if (uer.isOvertime) {
                    console.log("房间过期2");
                    App.PanelManager.open(PanelConst.ReNew)
                    return
                }
                App.PanelManager.open(PanelConst.QRCode);
                break;
            case this.modifyDeskBtn:

                if (uer.isOvertime) {
                    console.log("房间过期3");
                    App.PanelManager.open(PanelConst.ReNew)
                    return
                }
                if (App.DataCenter.gameState == GameState.Playing) {
                    TipsLog.hallInfo("游戏已正式开始,请结束后再修改房间信息")
                    return;
                }
                App.PanelManager.open(PanelConst.ExcRoom)
                break;
        }
    }

    // public setGameContent(g:BaseScene){   
    //     this.pageView.addPageContent(g);        

    // }

    /**点击底部菜单栏*/
    private onMenusTouch(bottomName: BottomName) {
        switch (bottomName) {
            case BottomName.mall:
                this.ctrl.sendShopListReq(1);
                break;
            case BottomName.knapsack:
                this.ctrl.getBackpack();
                break;
            case BottomName.share:
                App.PanelManager.open(PanelConst.SharePanel);
                break;
            case BottomName.email:
                this.ctrl.sendGetEmail();

                break;
            case BottomName.friends:
                var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
                messageBox.showMsg("确定退出游戏？", () => {
                    App.NativeBridge.sendToPengji();
                }, this);
                break;
            case BottomName.take:
                App.PanelManager.open(PanelConst.RulePanel);
                break;
            case BottomName.set:
                App.PanelManager.open(PanelConst.SetPanel);
                break;
            case BottomName.record:
                //App.PanelManager.open(PanelConst.RecordPanel);
                this.ctrl.sendRecord();
                break;
            case BottomName.me:
                //App.PanelManager.open(PanelConst.UserInfoPanel);
                this.ctrl.sendUserinfo();
                break;
            default:
                break;
        }
    }
    /**好友房列表 */
    private friendRoom() {
        App.PanelManager.open(PanelConst.FriendPanel);
    }


    /**
     * 发送进入好友房
     */
    public sendInFriendRoom(roomId = null) {
        // this.ctrl.registerSocket();
        let data = ProtocolData.Send102_4_0;
        data.deskCode = roomId;
        App.gameSocket.send(ProtocolHead.Send100110, data);

    }

    /**
     * 发送进入匹配房
     */
    public sendInMatchRoom() {
        // this.ctrl.registerSocket();
        App.LoadingLock.httpLock(()=>{
            TipsLog.hallInfo("请求超时，请稍候再试");
        });
        let data = ProtocolData.Send100120;
        data.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
        data.deviceID = "111";
        App.gameSocket.send(ProtocolHead.Send100120, data);

    }

    /**进入好友房 */
    public intoFriendRoom() {
        this.intoGameDesk(false, null, false, RoomType.FriendRoom);
    }

    /**进入匹配房 */
    public intoMatchRoom() {
        this.intoGameDesk(false, null, false, RoomType.MatchRoom);
    }


    /**进入聊天 */
    public inChat() {
        // var gameScene: GameScene = App.SceneManager.getScene(SceneConst.GameScene);
        // if (gameScene.isGag) {
        //     var minute = parseInt("" + gameScene.timeNumber / 60);
        //     var second = parseInt("" + gameScene.timeNumber % 60);
        //     var secondStr: string;
        //     if (second < 9) {
        //         secondStr = "0" + second;
        //     } else {
        //         secondStr = "" + second;
        //     }
        //     TipsLog.hallInfo("您已被房主禁言,暂无法使用聊天功能(" + minute + ":" + secondStr + ")");
        // } else {
        //     var deskInfo: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
        //     if (this.deskCode != deskInfo.deskCode) {
        //         this.deskCode = deskInfo.deskCode;
        //         // gameScene.clearChatRecord();
        //     }
        //     App.PanelManager.open(PanelConst.ChatPanel);
        // }
    }
    // /**更新当前桌子信息*/
    // public updateCurDeskUI() {
    //     // var deskVo: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
    //     // var user: UserVO = App.DataCenter.UserInfo.getMyUserVo();     

    //     // deskVo && (this.modifyDeskBtn.visible = ((user.userID == deskVo.ownerID)&&!user.isOvertime));       
    //     // this.userNameLab.text = deskVo ? decodeURIComponent(deskVo.deskName) :decodeURIComponent(user.excluroomName);
    //     // this.roomIdLab.text = deskVo?deskVo.deskCode.toString():user.excluroomCode.toString();       
    // }
    // public restPageView(){
    //     this.pageView.resetData();
    // }

    /**退出大厅*/
    private quitHall() {
        let msgBox = App.MsgBoxManager.getBoxA();
        msgBox.ok = () => {
            // App.gameSocket.close();
            // App.pushSocket.close();
            this.ctrl.sendEvent(LoginController.EVENT_SHOW_LOGIN);
        }
        msgBox.showMsg("是否确定退出登陆");
    }

    public openReNew() {
        App.PanelManager.open(PanelConst.ReNew, () => {
            this.ctrl.sendShopListReq(ShopType.ReNew);
        }, this);
    }

    //花
    private hallFlower() {

        var vcLocation = [];
        vcLocation.push(new egret.Point(273, 333));

        var vcLocation1 = [];
        vcLocation1.push(new egret.Point(-50, 709));

        var flowerLocation = [];
        flowerLocation.push(new egret.Point(551, 0));
        this.flowerImg.bitmapData = RES.getRes("hall_flower_png");
        this.flowerImg.anchorOffsetX = this.flowerImg.width / 2;
        this.flowerImg.anchorOffsetY = this.flowerImg.height / 2;

        // this.addChild(this.flowerImg);
        egret.Tween.get(this.flowerImg, { loop: true }).set({ x: 551, y: 0, alpha:1 })
            .to({ x: -50, y: 709, alpha: 0.4,rotation: 720}, 3000,egret.Ease.sineInOut).wait(1000);


    }

    //花
    private hallFlower1() {

        var vcLocation = [];
        vcLocation.push(new egret.Point(597, 681));

        var vcLocation1 = [];
        vcLocation1.push(new egret.Point(-50, 1192));

        var flowerLocation = [];
        flowerLocation.push(new egret.Point(780, 389));

        this.flowerImg1.bitmapData = RES.getRes("hall_flower_png");
        this.flowerImg1.anchorOffsetX = this.flowerImg1.width / 2;
        this.flowerImg1.anchorOffsetY = this.flowerImg1.height / 2;

        // this.addChild(this.flowerImg1);
        egret.Tween.get(this.flowerImg1, { loop: true }).set({ x: 780, y: 389 ,alpha: 0.4})
            .to({ x: -50, y: 1192, alpha: 1,rotation: 720 }, 3000,egret.Ease.sineInOut).wait(1000);


    }



    // public openDesk(){
    //     App.PanelManager.open(PanelConst.CreateRoomPanel,() => {
    //         this.ctrl.sendShopListReq(ShopType.OpenDesk);
    //     },this);
    // }

    /**进入游戏*/
    public intoGameDesk(bReplay: boolean = false, replayData?: any, bReconnect: boolean = false, roomType: number = 0) {
        var resArray;
        console.log("`````````````````````进入游戏,是否断线重连:", bReconnect, "是否回放:", bReplay);
        //if (bReconnect || bReplay) {
        resArray = [AssetConst.Invite, AssetConst.Game, AssetConst.Card];
        // } else {
        //     resArray = [AssetConst.Invite, AssetConst.Card];
        // }
        //背包选择场景对应的资源组
        //resArray.push(App.DataCenter.BagInfo.getSceneGroupName());

        //清空非游戏内面板
        App.PanelManager.closeAllPanel();

        //记录回放
        App.DataCenter.replayInfo.bReplay = bReplay;
        App.DataCenter.replayInfo.replayData = replayData;

        //加载游戏资源
        App.DataCenter.roomInfo.roomType = roomType;
        console.log("room" + roomType);
        var preloadPanel: PreloadPanel = App.PanelManager.open(PanelConst.PreloadPanel, null, this, true, true, true);
        App.ResUtils.loadGroup(resArray, this, this.loadGameComplete, this.loadGameProgress);
    }

    // public addPageView(){
    //     this.pageView.addOneContent();
    // }

    //加载游戏资源进度
    private loadGameProgress(e: RES.ResourceEvent) {
        //var preloadPanel: PreloadPanel = App.PanelManager.getPanel(PanelConst.PreloadPanel);
        //preloadPanel.setProgress(Math.round(e.itemsLoaded / e.itemsTotal * 100));
    }

    //加载游戏资源完成
    private loadGameComplete() {
        App.PanelManager.closeAllPanel();
        App.EventManager.sendEvent(GameController.EVENT_SHOW_GAME_SCENE);
    }

    //按钮动画
    private buttonLight(light1:eui.Image, light2:eui.Image) {
        this.light(light1);
        setTimeout(()=>{
            this.light(light2);
        }, 500);
    }

    private light(light:eui.Image) {
        egret.Tween.get(light, {loop:true})
        .set({x:-700})
        .to({x:0}, 800)
        .wait(2000)
    }

    private removeLight() {
        egret.Tween.removeTweens(this.lightPlay1);
        egret.Tween.removeTweens(this.lightPlay2);
        egret.Tween.removeTweens(this.lightFriend1);
        egret.Tween.removeTweens(this.lightFriend2);

        this.lightPlay1.x = this.lightPlay2.x = this.lightFriend1.x = this.lightFriend2.x = -700;
    }
    //加载资源
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
        //RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
    }

}

