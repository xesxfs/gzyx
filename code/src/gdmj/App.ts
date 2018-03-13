/**
 * App主类
 * @author chen
 * @date 2016/7/7 

 */
class App extends BaseApp {
    /**调用Native震动*/
    public static EVENT_NATIVE_SHAKE: string = "EVENT_NATIVE_SHAKE";
    /**设置web微信分享*/
    public static EVENT_SET_WEB_WXSHARE: string = "EVENT_SET_WEB_WXSHARE";
    /**native微信分享*/
    public static EVENT_NATIVE_WXSHARE: string = "EVENT_NATIVE_WXSHARE";
    /**独立包标识 */
    private independentFlag: boolean;

    /**启动框架*/
    public startUp(): void {
        //调整适配模式
        if (App.DeviceUtils.IsWeb) {
            App.StageUtils.changeScaleMode();
            App.StageUtils.runBrowserAdapt();
        }

        //通知runtime加载页面已就绪,可以关闭runtime loading
        if (App.DeviceUtils.IsNative) {
            var json = { current: 10, total: 10 };
            var jsonStr = JSON.stringify(json);
            egret.ExternalInterface.call("customLoadingFlag", jsonStr);
        }

        //定义Native访问接口
        if (App.DeviceUtils.IsNative) {
            this.setInterfaces();
        }

        //注册Controller
        this.registerController(LoginController.NAME, new LoginController());
        this.registerController(HallController.NAME, new HallController());
        this.registerController(GameController.NAME, new GameController());

        //注册场景
        var scene: SceneManager = App.SceneManager;
        scene.register(SceneConst.LoginScene, LoginScene);      //登录界面
        scene.register(SceneConst.HallScene, HallScene);        //大厅界面
        scene.register(SceneConst.GameScene, GameScene);        //游戏界面

        //注册弹框
        var panel: PanelManager = App.PanelManager;

        panel.register(PanelConst.ResultPanel, ResultPanel);                        //结算面板
        panel.register(PanelConst.ResultPanel1, ResultPanel);                        //结算面板
        panel.register(PanelConst.SharePanel, SharePanel);                           //分享面板
        panel.register(PanelConst.MallPanel, MallPanel);                            //商城面板
        panel.register(PanelConst.PaymentPanel, PaymentPanel);                      //支付面板
        panel.register(PanelConst.PaymentMethod, PaymentMethod);                    //选择支付面板
        panel.register(PanelConst.BackpackPanel, BackpackPanel);                    //背包面板
        panel.register(PanelConst.FriendPanel, FriendPanel);                        //好友房列表
        panel.register(PanelConst.JoinRoomPanel, JoinRoomPanel);                    //加入房间
        panel.register(PanelConst.JoinNumber, JoinNumber, AssetConst.InputRoom);                          //输入加入房间
        panel.register(PanelConst.LookRlue, LookRlue);                              //游戏内查看规则
        panel.register(PanelConst.ModifyRlueT, ModifyRlueT);                        //游戏内修改规则
        panel.register(PanelConst.RecordPanel, RecordPanel);                        //记录面板
        panel.register(PanelConst.RecordDetailPanel, RecordDetailPanel);            //记录详情面板
        panel.register(PanelConst.RulePanel, RulePanelH, [AssetConst.Rule, AssetConst.Card]); //玩法说明面板
        panel.register(PanelConst.EmailPanel, EmailPanel);         //邮件面板
        panel.register(PanelConst.EmailTwoPanel, EmailTwoPanel);         //二级邮件面板
        panel.register(PanelConst.PreloadPanel, PreloadPanel);                     //加载
        panel.register(PanelConst.SetPanel, SetPanel, AssetConst.SetPanel);//设置
        panel.register(PanelConst.RecordPanel, RecordPanel);       //记录
        panel.register(PanelConst.RecordDetailPanel, RecordDetailPanel);       //记录
        panel.register(PanelConst.UserInfoPanel, UserInfoPanel);       //个人信息
        panel.register(PanelConst.GameResultPanel, GameResultPanel);       //结算
        panel.register(PanelConst.HuTypePanel, HuTypePanel);          //胡牌类型
        panel.register(PanelConst.TapePanel, TapePanel);          //录音界面
        panel.register(PanelConst.JieSanPanel, JieSanPanel);      //解散房间
        panel.register(PanelConst.SendjiesanPanel, SendjiesanPanel);//提示解散房间
        panel.register(PanelConst.GameRecordPanel, GameRecordPanel);//好友房记录
        panel.register(PanelConst.ModifyRuleSurePanel, ModifyRuleSurePanel);//关闭修改规则确认
        panel.register(PanelConst.SocketClosePanel, SocketClosePanel);//socket重连弹窗
        panel.register(PanelConst.InvitePanelT, InvitePanelT);//好友房邀请好友
        panel.register(PanelConst.LoginPanel, LoginPanel);//登录界面
        panel.register(PanelConst.ShareRecordPanel, ShareRecordPanel);//好友房分享界面
        panel.register(PanelConst.ShareResultPanel, ShareResultPanel);//结算分享界面
        panel.register(PanelConst.AllRecord, AllRecord);      //总结算面板
        panel.register(PanelConst.LoginChoosePanel, LoginChoosePanel);      //登录选择
        panel.register(PanelConst.BindPanel, BindPanel);      //绑定

        //监听事件
        this.addEvent(App.EVENT_NATIVE_SHAKE, this.nativeShake, this);
        this.addEvent(App.EVENT_SET_WEB_WXSHARE, this.setWebWxShare, this);
        this.addEvent(App.EVENT_NATIVE_WXSHARE, this.nativeWxShare, this);

        //显示登录界面
        this.sendEvent(LoginController.EVENT_SHOW_LOGIN);

        //监听断线事件
        this.addEvent(EventConst.SocketClose, this.onSocketClose, this);           //socket关闭

        //初始化用户本地设置
        App.GameConfig.initUserConfig();
    }

    //Native接口
    private setInterfaces() {
        //手机点击退出键
        egret.ExternalInterface.addCallback("quitApp", function (message: string) {
            console.log("message form native : " + message);
            var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
            messageBox.showMsg("是否关闭游戏");
            messageBox.ok = () => {
                egret.ExternalInterface.call("quitApp", "quitApp");
            }
        });

        //Native返回微信登录请求结果
        egret.ExternalInterface.addCallback("getCode", function (code: string) {
            TipsLog.hallInfo("egret get code: " + code);
            if (code) {
                //这里回调必须用异步函数
                egret.setTimeout(() => {
                    var loginController: LoginController = App.getController(LoginController.NAME);
                    loginController.sendLoginAppReq(code, "");
                }, this, 10);
            } else {
                TipsLog.hallInfo("code is null");
            }
        });
    }

    /**
     * Native分享
     * @isTimeline 是否分享到朋友圈
     */
    public nativeWxShare(isTimeline: boolean) {
        egret.ExternalInterface.call("wxShare", "http://gamemj.com/mj/index.php?pid=" + App.DataCenter.UserInfo.getMyUserVo().userID + "&deskCode=" + App.DataCenter.deskInfo.deskCode + "&deskId=" + App.DataCenter.deskInfo.deskID + "&gameID=" + App.serverSocket.gameID);
    }

    /**
     * Native震动
     * @shakeTime 震动时间，默认1500ms
     */
    public nativeShake(shakeTime: number = 1500) {
        egret.ExternalInterface.call("shake", shakeTime + "");
    }

    /**
     * H5分享，重置微信分享接口，传入桌子号和用户ID等
     * @userID 用户ID
     * @deskCode 桌子号
     * @replayCode 回放码
     */
    public setWebWxShare(userID: number, deskCode: number, replayCode: string, deskId: number) {
        var gameID: Game_ID = App.serverSocket.gameID;
        console.log("调用微信分享,deskCode=" + deskCode + " userID=" + userID + " replayCode=" + replayCode
            + " gameID=" + gameID);
        if (window['wxShare']) {
            window['wxShare'](userID, deskCode, replayCode, gameID, deskId);
        }
    }

    private onSocketClose() {
        App.PanelManager.open(PanelConst.SocketClosePanel, null, null, false);
    }

    /**
     * 获取控制模块
     * @ctrlName 控制模块名
     * @return 控制模块
     */
    public static getController(ctrlName: string) {
        return App.getInstance().getController(ctrlName);
    }

    /**数据中心*/
    public static get DataCenter(): DataCenter {
        return DataCenter.getInstance();
    }

    /**设备工具类*/
    public static get DeviceUtils(): DeviceUtils {
        return DeviceUtils.getInstance();
    }

    /**舞台工具类*/
    public static get StageUtils(): StageUtils {
        return StageUtils.getInstance();
    }

    /**资源管理类*/
    public static get ResUtils(): ResUtils {
        return ResUtils.getInstance();
    }

    /**图层管理类*/
    public static get LayerManager(): LayerManager {
        return LayerManager.getInstance();
    }

    /**声音管理*/
    public static get SoundManager(): SoundManager {
        return SoundManager.getInstance();
    }

    /**弹框管理类*/
    public static get PopUpManager(): PopUpManager {
        return PopUpManager.getInstance();
    }

    /**消息框管理类*/
    public static get MsgBoxManager(): MessageBoxManager {
        return MessageBoxManager.getInstance();
    }

    /**底部菜单管理类*/
    public static get BottomMenuManager(): BottomMenuManager {
        return BottomMenuManager.getInstance();
    }

    /**事件管理类*/
    public static get EventManager(): EventMananger {
        return EventMananger.getInstance();
    }

    /**关键词屏蔽*/
    public static get KeyWord(): KeyWord {
        return KeyWord.getInstance();
    }

    /**加载等待动画*/
    public static get LoadingLock(): LoadingLock {
        return LoadingLock.getInstance();
    }

    /**弹框管理类*/
    public static get PanelManager(): PanelManager {
        return PanelManager.getInstance();
    }

    /**场景管理类*/
    public static get SceneManager(): SceneManager {
        return SceneManager.getInstance();
    }

    /**游戏Socket*/
    public static get gameSocket(): ClientSocket {
        return SocketManager.getInstance().gameSocket;
    }

    /**调度Socket*/
    public static get serverSocket(): ClientSocket {
        return SocketManager.getInstance().serverSocket;
    }

    /**推送Socket*/
    public static get pushSocket(): ClientSocket {
        return SocketManager.getInstance().pushSocket;
    }

    /**原生通信类 */
    public static get NativeBridge(): NativeBridge {
        return NativeBridge.getInstance();
    }

    public static get LocalStorageUtil(): LocalStorageUtil {
        return LocalStorageUtil.getInstance();
    }

    public static get GameConfig(): GameCfg {
        return GameCfg.getInstance();
    }

    public get indepFlag(): boolean {
        return this.independentFlag;
    }

    public set indepFlag(flag: boolean) {
        this.independentFlag = flag;
    }
}
