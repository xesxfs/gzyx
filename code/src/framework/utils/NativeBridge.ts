/**
 * 原生通信
 * @author huanglong
 * 2017-03-23
 */

class NativeBridge extends SingleClass{
    private gameId:string;

    public constructor() {
        super();
        this.addNativeListener();

        this.gameId = "10004";
    }

    /**
     * 添加原生消息监听
     */
    public addNativeListener() {
        //登录
        egret.ExternalInterface.addCallback("applyLogin", this.listenLogin);
        //退出
        egret.ExternalInterface.addCallback("QUIT_GAME_NTE", this.listenQuit);
        //获取本地图片
        egret.ExternalInterface.addCallback("IMImage", this.listenIMImage);
        //支付结果
        egret.ExternalInterface.addCallback("PayResult", this.listenPayResult);
        //录音发送结果
        egret.ExternalInterface.addCallback("sendTapeSuccess", this.listenTapeResult);
        //资源状态返回
        egret.ExternalInterface.addCallback("loadResState", this.listeResState);
        //录音权限返回
        egret.ExternalInterface.addCallback("IMRecord", this.listenTapePermission);
        //包类型返回
        egret.ExternalInterface.addCallback("chargeBag", this.listenBagType);
        //是否有本地登录数据
        egret.ExternalInterface.addCallback("isToken", this.listenLocalLogin);
        //监听IM接口返回异常
        egret.ExternalInterface.addCallback("backNet", this.listenIMError);
    }

    private listenLogin(message: string) {
        setTimeout(()=>{
            var data = JSON.parse(message);

            if (Number(data.ret)) {
                var info = data.info;
                if (info.isInvite != "NO") {
                    App.DataCenter.inviteFlag = info.roomId;
                }
                (<LoginController>App.getController(LoginController.NAME)).sendImLoginReq(info.token, info.uid.toString());
            }
            else {
                App.NativeBridge.sendCloseStart();
                var messagebox:MessageBox = App.MsgBoxManager.getBoxA();
                messagebox.showMsg("获取登录信息错误,是否重新获取？",()=>{
                    App.NativeBridge.getLogin();
                },this,()=>{
                    App.NativeBridge.sendToPengji();
                });
            }
            
        }, 100, this);
    }

    private listenQuit(message: string) {
        setTimeout(()=>{
            console.log("退出NET消息："+message);
        }, 100);
    }

    private listenIMImage(message: string) {
        setTimeout(()=>{
            var data = JSON.parse(message);
            (<eui.Image>(<egret.DisplayObjectContainer>App.SceneManager.getCurScene().getChildAt(0)).getChildAt(0)).source = data;
        }, 100);
    }

    private listenPayResult(message: string) {
        setTimeout(()=>{
            var data = JSON.parse(message);

            App.LoadingLock.unlock();

            if (Number(data) == 1) {
                TipsLog.hallInfo("支付成功");
            }
            else {
                TipsLog.hallInfo("支付失败");
            }
        }, 100);
    }

    private listenTapeResult(message: string) {
        setTimeout(()=>{
            var data = JSON.parse(message);
            if (Number(data) == 1) {
                TipsLog.gameInfo("录音发送成功");
            }
            else {
                TipsLog.gameInfo("录音发送失败");
            }
        }, 100);
    }

    private listeResState(message: string) {
        setTimeout(()=>{
            var data = JSON.parse(message);
        }, 100);
    }

    private listenTapePermission(message: string) {
        setTimeout(()=>{
            var data = JSON.parse(message);
            if (Number(data) == 1) {
            }
            else {
                var tapeP:TapePanel = App.PanelManager.getPanel(PanelConst.TapePanel);
                tapeP.overTape();
            }
        }, 100);
    }

    private listenBagType(message: string) {
        setTimeout(()=>{
            var data = JSON.parse(message);
            if (data && Number(data) == 1) {
                App.getInstance().indepFlag = true;
                App.NativeBridge.getLocalLogin();
            }
            else {
                App.NativeBridge.getLogin();
            }
        }, 100);
    }

    private listenLocalLogin(message: string) {
        setTimeout(()=>{
            var data = JSON.parse(message);
            if (data && Number(data) == 1) {
                console.log("auto login");
            }
            else {
                console.log("choose login");
                //登录选择界面
                App.PanelManager.open(PanelConst.LoginChoosePanel,null,null,false,false);
            }
        }, 100);
    }

    private listenIMError(message: string) {
        setTimeout(()=>{
            console.log("local imError +++++++++++++：");
            var data = JSON.parse(message);
            console.log(JSON.stringify(data));
            if (!data.ret) {
                TipsLog.hallInfo(data.info.desc);
            }
            else if (data.type == "register") {
               
            }
            else if (data.type == "findPassword") {
                if(data.ret) {
                    TipsLog.hallInfo("找回成功");
                    (<LoginPanel>App.PanelManager.getPanel(PanelConst.LoginPanel)).back();
                }
            }
            else if (data.type == "userBindingPhone") {
                if(data.ret) {
                    TipsLog.hallInfo("绑定成功");
                    App.getInstance().indepFlag = false;
                    (<LoginPanel>App.PanelManager.getPanel(PanelConst.BindPanel)).hide();
                }
            }
            else if (data.type == "IMPay") {
                App.LoadingLock.unlock();
                if(data.ret) {
                    TipsLog.hallInfo("购买成功");
                }
                else {
                    TipsLog.hallInfo("购买失败");
                }
            }
        }, 100);
    }
    /**----------------------------ETN-------------------------------- */
    /**
     * 获取包类型
     */
    public getBagType() {
        console.log(("++++++++++++getBagType"));
        var data = {
        }
        egret.ExternalInterface.call("chargeBag", JSON.stringify(data));
    }

    /**
     * 是否存在登录信息
     */
    public getLocalLogin() {
        console.log(("++++++++++++getLocalLogin"));
        var data = {
        }
        egret.ExternalInterface.call("isToken", JSON.stringify(data));
    }

    /**
     * 请求登录信息
     */
    public getLogin() {
        console.log("+++++++++++getLogin");
        var data = {
            gameId: "10004"
        }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("applyLogin", JSON.stringify(data));
    }

    /**
     * 是否登录成功
     */
    public sendLogin(success: boolean) {
        var data = {
            success: success
        }
        if (success) {
            var dataT = {
                gameId: "10004"
            }
            dataT.gameId = this.gameId;
            egret.ExternalInterface.call("isLogin", JSON.stringify(dataT));
        }
        else {
            egret.ExternalInterface.call("closeGame", JSON.stringify(data));
        }
    }

    /**
     * 点击朋际
     */
    public sendToPengji() {
        var data = {
            gameId: "10004"
        }
        data.gameId = this.gameId;
        App.SoundManager.stopAllSound();
        egret.ExternalInterface.call("closeGame", JSON.stringify(data));
    }

    /**
     * 原生加载界面关闭
     */
    public sendCloseStart() {
        egret.ExternalInterface.call("closeStartView", "");
    }

    /**
     * 邀请好友
     */
    public sendInviteFriend(data) {
        // var data = {
        //     roomId: "0",
        //     gameId: "10004",
        //     title: "名字",
        //     invite: "0",
        //     rule: [],
        //     gameName: "广东麻将"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("IMInvite", JSON.stringify(data));
    }

    /**
     * 开始录音
     */
    public sendTapeBegin() {
        egret.ExternalInterface.call("beginTape", "");
    }

    /**
     * 结束录音
     */
    public sendTageEnd(data) {
        /**
         * 参数说明
         * "cancle" 录音时间不足，或者上滑取消录音，该录音不发送
         * "normal" 正常录音，需要发送
         */
        // var data = {
        //     state: "cancle"
        // }
        egret.ExternalInterface.call("endTape", JSON.stringify(data));
    }

    /**
     * 图片请求
     */
    public sendIMImage() {
        var data = {
        }
        egret.ExternalInterface.call("IMImage", JSON.stringify(data));
    }

    /**
     * 普通分享
     */
    public sendNormalShare(data) {
        // var data = {
        //     gameId:"10004",
        //     share:"0",
        //     gameName:"长沙麻将",
        //     description:"长沙麻将,好玩到爆"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("ShareUrl", JSON.stringify(data)); 
    }

    /**
     * 图片分享
     */
    public sendImageShare(data) {
        // var data = {
        //     gameId:"10004",
        //     share:"0",
        //     imageB64:"sdfasdfdf5a4564564",
        //     gameName:"长沙麻将"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("ShareImage", JSON.stringify(data));
    }

    /**
     * 支付
     */
    public sendPay(data) {
        // var data = {
        //     subject: "长沙麻将",      商品标题
        //     amount: 1,               金额
        //     pay_type: 0,             支付类型
        //     process_type: 0,         操作类型
        //     order_id: ""             订单号
        //     app_id: "1"              游戏ID
        //     goodsid: 1               物品ID
        // }
        console.log("sendPay+++++");
        console.log(JSON.stringify(data));
        egret.ExternalInterface.call("IMPay", JSON.stringify(data));
    }

    /**
     * 登录聊天室
     */
    public sendJoinRoom(data) {
        // var data = {
        //     roomId: "0"
        // }
        egret.ExternalInterface.call("joinRoom", JSON.stringify(data));
    }

    /**
     * 退出
     */
    public sendQuitRoom() {
        // var data = {
        //     roomId: "0"
        // }
        egret.ExternalInterface.call("quitRoom", "");
    }

    /**
     * 自动播放语音-开关
     */
    public sendAutoVoice(flag: boolean) {
        if (flag) {
            egret.ExternalInterface.call("autoVoiceOn", "");
        }
        else {
            egret.ExternalInterface.call("autoVoiceOff", "");
        }
    }

    /**
     * 获取资源状态
     */
    public sendResourceState() {
        egret.ExternalInterface.call("loadResState", "");
    }

    /**
     * 发送下载进度
     */
    public sendLoadProgress() {
        var data = {
            progress: "0"
        }
        egret.ExternalInterface.call("loadProgress", "");
    }

    /**
     * 发送登录方式
     */
    public sendLoginType(data) {
        // var data = {
        //     type: "login",
        //     data: {
        //         gameId: "10004",
        //         phone: "15818543240",
        //         passwd: "123456"
        //     }
        // }
        data.data.gameId = this.gameId;
        egret.ExternalInterface.call("login", JSON.stringify(data));
    }

    /**
     * 获取注册验证码
     */
    public sendRegistCode(data) {
        // var data = {
        //     gameId: "10004",
        //     phone: "15818543240"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("sendVerificationCode", JSON.stringify(data));
    }

    /**
     * 发送注册信息
     */
    public sendRegistInfo(data) {
        // var data = {
        //     gameid: "10004",
        //     phone: "111111",
        //     password: "1234556",
        //     verificationcode: "1234"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("register", JSON.stringify(data));
    }

    /**
     * 获取找回密码验证码
     */
    public sendFindCode(data) {
        // var data = {
        //     gameId: "10004",
        //     phone: "15818543240"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("sendVerificationCodeForModify", JSON.stringify(data));
    }

    /**
     * 找回密码
     */
    public sendFind(data) {
        // var data = {
        //     gameId: "10004",
        //     phone: "15818543240"
        //     verificationcode: "1234"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("findPassword", JSON.stringify(data));
    }

    /**
     * 注销账号
     */
    public sendCancle() {
        var data = {};
        egret.ExternalInterface.call("cancel", JSON.stringify(data));
    }

    /**
     * 绑定账号
     */
    public sendBind(data) {
        // var data = {
        //     gameid: "10004",
        //     phone: "111111",
        //     password: "1234556",
        //     verificationcode: "1234"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("userBindingPhone", JSON.stringify(data));
    }

    /**
     * 提交个人信息
     */
    public sendBaseInfo(data) {
        // var data = {
        //     nickname: "111",
        //     sex: 1,
        //     icon: "111"
        // }
        data.gameId = this.gameId;
        egret.ExternalInterface.call("updateBaseInfo", JSON.stringify(data));
    }
}