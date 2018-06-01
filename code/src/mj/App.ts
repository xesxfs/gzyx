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

        panel.register(PanelConst.RoundResultPanel, RoundResultPanel);                        //结算面板
        panel.register(PanelConst.SharePanel, SharePanel);                           //分享面板
        panel.register(PanelConst.MallPanel, MallPanel, AssetConst.Mall);                            //商城面板
        panel.register(PanelConst.PaymentPanel, PaymentPanel);                      //支付面板
        panel.register(PanelConst.PaymentMethod, PaymentMethod);                    //选择支付面板
        panel.register(PanelConst.BackpackPanel, BackpackPanel);                    //背包面板
        panel.register(PanelConst.FriendPanel, FriendPanel);                        //好友房列表
        panel.register(PanelConst.JoinRoomPanel, JoinRoomPanel);                    //加入房间
        panel.register(PanelConst.LookRlue, LookRlue);                              //游戏内查看规则
        panel.register(PanelConst.ModifyRlueT, ModifyRlueT);                        //游戏内修改规则
        panel.register(PanelConst.SignPanel, SignInPanel);                        //游戏内修改规则

        panel.register(PanelConst.RulePanel, RulePanel); //玩法说明面板
        panel.register(PanelConst.EmailPanel, EmailPanel);         //邮件面板
        panel.register(PanelConst.HandDetailPanel, HandDetailPanel);         //手牌详情

        panel.register(PanelConst.PreloadPanel, PreloadPanel);                     //加载
        panel.register(PanelConst.SetPanel, SetPanel);//设置
        panel.register(PanelConst.ActivePanel, ActivePanel);//活动
        panel.register(PanelConst.CreateRoomPanel, CreateRoomPanel);//创建房间
        panel.register(PanelConst.UserInfoPanel, UserInfoPanel);       //个人信息
        panel.register(PanelConst.GameResultPanel, GameResultPanel);       //结算
        panel.register(PanelConst.GoldPanel, GoldPanel);          //金币场
        panel.register(PanelConst.TapePanel, TapePanel);          //录音界面
        panel.register(PanelConst.JieSanPanel, JieSanPanel);      //解散房间
        panel.register(PanelConst.SendjiesanPanel, SendjiesanPanel);//提示解散房间
        panel.register(PanelConst.GameRecordPanel, GameRecordPanel);//好友房记录
        panel.register(PanelConst.ModifyRuleSurePanel, ModifyRuleSurePanel);//关闭修改规则确认
        panel.register(PanelConst.SocketClosePanel, SocketClosePanel);//socket重连弹窗
        panel.register(PanelConst.InvitePanelT, InvitePanelT);//好友房邀请好友
        panel.register(PanelConst.LoginPanel, LoginPanel);//登录界面

        panel.register(PanelConst.ProfilePhotoPanel, ProfilePhotoPanel);//选择头像

        panel.register(PanelConst.ShareResultPanel, ShareResultPanel);//结算分享界面
        panel.register(PanelConst.AllRecord, AllRecord);      //总结算面板
        panel.register(PanelConst.LoginChoosePanel, LoginChoosePanel);      //登录选择
        panel.register(PanelConst.BindPanel, BindPanel);      //绑定
        panel.register(PanelConst.ClubPanel, ClubPanel, AssetConst.Club);
        panel.register(PanelConst.GrabPanel, GrabPanel, AssetConst.Grab);
        panel.register(PanelConst.NewFeedBackPanel, FeedBackPanel);
        panel.register(PanelConst.BindFriendPanel, BindFriendPanel);
        panel.register(PanelConst.GameSet, GameSetting);
        panel.register(PanelConst.ChatPanel, GameChatPanel);
        panel.register(PanelConst.CatchChicken, CatchChickenPanel);


        //显示登录界面
        this.sendEvent(LoginController.EVENT_SHOW_LOGIN);

        //监听断线事件
        this.addEvent(EventConst.SocketClose, this.onSocketClose, this);           //socket关闭

        //初始化用户本地设置
        App.GameConfig.initUserConfig();
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
