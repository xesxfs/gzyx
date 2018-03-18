/**
 * 数据中心
 * @author chen
 * @date 2016/6/27
 */
class DataCenter extends SingleClass{
    /**用户信息*/
    public UserInfo:UserInfo;
    /**服务器信息*/
    public ServerInfo:ServerInfo;
    /**游戏信息*/
    public GameInfo:GameInfo;
    /**背包信息*/
    public BagInfo:BagInfo;
    /**签到信息*/
    public signInfo:SignInfo;
    /**福利信息*/
    public welfareInfo:WelfareInfo;
    /**调试信息*/
    public debugInfo:DebugInfo;
    /**回放信息*/
    public replayInfo:ReplayInfo;
    /**分享信息*/
    public shareInfo:ShareInfo;
    /**登录相关信息*/
    public wxInfo:WxInfo;
    /**桌子信息*/
    public deskInfo:DeskInfo;
    /**颜色信息*/
    public colorInfo:ColorInfo;
    /**金币场房间配置信息*/
    public goldRoomInfo:GoldRoomInfo;
    /**房间信息*/
    public roomInfo:RoomInfo;
    /**跑马灯信息*/
    public marqueeInfo:MarqueeInfo;
    /*游戏状态*/
    public gameState:GameState;
    /**socket是否被断开 */
    public socketClose:boolean = false;
    /**邀请标识 */
    public inviteFlag: string;
    /**二维码地址 */
    public qrCodeUrl:string;
    public secret: boolean = false;

    public constructor(){
        super();
        this.UserInfo = new UserInfo();
        this.ServerInfo = new ServerInfo();
        this.GameInfo = new GameInfo();        
        this.BagInfo = new BagInfo();   
        this.signInfo = new SignInfo();
        this.welfareInfo = new WelfareInfo();
        this.debugInfo = new DebugInfo();
        this.replayInfo = new ReplayInfo();
        this.shareInfo = new ShareInfo();
        this.wxInfo = new WxInfo();
        this.deskInfo = new DeskInfo();
        this.colorInfo = new ColorInfo();
        this.goldRoomInfo = new GoldRoomInfo();
        this.roomInfo = new RoomInfo();
        this.marqueeInfo = new MarqueeInfo();
        this.inviteFlag = "";
        this.secret = false;
    }
}
