/**
 * 大厅模块
 * @author chenkai
 * @date 2016/11/4
 */
class HallController extends BaseController {
    /**控制模块名*/
    public static NAME: string = "HallController";
    /**显示大厅*/
    public static EVENT_SHOW_HALL: string = "ShowHallScene";
    /**大厅*/
    private hallScene: HallScene;
    //当前房间
    private curRoomid;
    private curDeskId: number
    public isReconnection: boolean = false;

    private isLogin: boolean = false;
    private room_type: number;//房间类型
    public static NOTICE_DELAY: number = 15000; //刷新广播的时间

    public constructor() {
        super();
    }

    //注册时调用
    public onRegister() {
        this.addEvent(HallController.EVENT_SHOW_HALL, this.showHallScene, this);
        this.registerSocket();

        //启动定时器刷新广播
        egret.setInterval(this.sendQueryNotice, this, HallController.NOTICE_DELAY);
    }

    //移除注册时调用
    public onRemove() {

    }

    /**显示大厅*/
    private showHallScene() {
        this.hallScene = App.SceneManager.runScene(SceneConst.HallScene, this) as HallScene;

        this.requestRanking();
        this.requestItemList();
    }

    //注册socket
    public registerSocket() {
        var gameSocket: ClientSocket = App.gameSocket;
        gameSocket.register(ProtocolHead.server_command.SERVER_ENTER_ROOM_UC, this.revEnterRoom, this);
        gameSocket.register(ProtocolHead.open_room_type_command.CLIENT_OPEN_ROOM_REQ, this.revOpenRoom, this);
        gameSocket.register(ProtocolHead.open_room_type_command.CLIENT_JOIN_ROOM_REQ, this.revJoinRoom, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_REBIND_UC, this.revReBind, this);

        //socket连接错误事件
        this.addEvent(EventConst.SocketIOError, this.onSocketError, this);
    }

    /**socket连接成功*/
    private onSocketConnect(socket: ClientSocket) {
        console.log(" hall connenct success");
    }

    /**socket连接错误*/
    private onSocketError(socket: ClientSocket) {
        if (socket == App.gameSocket) {
            App.MsgBoxManager.recycleAllBox();
            var messageBox: MessageBox = App.MsgBoxManager.getBoxB();
            messageBox.showMsg("网络连接失败，请检查您的网络。");
        }
    }

    //***********************************************************************
    //------------------------ Socket通讯-------------------------------------
    //------------------------ Socket通讯-------------------------------------
    //------------------------ Socket通讯-------------------------------------
    //************************************************************************

    private revEnterRoom(data) {
        let json = ProtocolData.Rev2001;
        json = data;
        let myuser = App.DataCenter.UserInfo.selfUser;
        if (myuser.userID == json.uid) {
            myuser.seatID = json.seatid;
        }
        this.sendEvent(GameController.EVENT_SHOW_GAME_SCENE);

    }

    /****断线重连 */
    private revReBind(data) {
        let json = ProtocolData.Rev2021;
        json = data;

    }

    /******开房****** */
    public sendOpenRoom(data) {
        var gameSocket: ClientSocket = App.gameSocket;
        gameSocket.dataBuffer = data;
        this.addEvent(EventConst.SocketConnect, this.onOpenRoom, this);
        gameSocket.startConnect(App.DataCenter.ServerInfo.GAME_SERVER);

    }

    private onOpenRoom(socket: ClientSocket) {
        let data = socket.dataBuffer;
        socket.send(data);
    }

    private revOpenRoom(data) {

    }


    /**** 进入房间*/
    public sendJoinRoom(data) {
        var gameSocket: ClientSocket = App.gameSocket;
        gameSocket.dataBuffer = data;
        this.addEvent(EventConst.SocketConnect, this.onJoinRoom, this);
        gameSocket.startConnect(App.DataCenter.ServerInfo.GAME_SERVER);
    }

    private onJoinRoom(socket: ClientSocket) {
        let data = socket.dataBuffer;
        socket.send(data);
    }

    private revJoinRoom() {

    }


    //********************* 大厅功能HTTP 通信 **********************
    /** 请求排行数据 */
    public requestRanking() {
        var httpsend = new HttpSender();
        var loginData = ProtocolHttp.send_Rank;
        httpsend.send(loginData, this.revRanking, this);
    }

    private revRanking(rev: any) {
        let ranking = ProtocolHttp.rev_Rank;
        ranking.data = rev.data;

        let scene = App.SceneManager.getCurScene() as HallScene;
        scene.rankingPnl.update();
    }

    /** 获取基础商品列表 */
    public requestItemList() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_GetItemList;
        httpsend.send(request, this.revItemList, this);
    }

    private revItemList(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_GetItemList.item_list = rev.data.item_list;

            var arr = [];
            ProtocolHttp.rev_GetItemList.item_list.forEach((item) => {
                arr[item.id] = item;
            });

            App.DataCenter.BagInfo.itemList = arr;
        }
    }

    /** 请求活动列表 */
    public requestActive() {
        var httpsend = new HttpSender();
        var rechargeData = ProtocolHttp.send_RechargeTaskList;
        rechargeData.param.uid = App.DataCenter.UserInfo.selfUser.userID;
        httpsend.send(rechargeData, this.revActive, this);
    }

    private revActive(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_RechargeTaskList = rev.data;
            if (!ProtocolHttp.rev_RechargeTaskList.task_list) ProtocolHttp.rev_RechargeTaskList.task_list = [];
            App.PanelManager.open(PanelConst.ActivePanel);
        }
    }

    private _mallType = MallType.Diamond;   // 默认钻石
    /** 请求钻石商城列表 */
    public requestMall(type: MallType) {
        this._mallType = type;
        var httpsend = new HttpSender();
        var mall = ProtocolHttp.send_DiamondsMall;
        httpsend.send(mall, this.revDiamondsMall, this);
    }

    private revDiamondsMall(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_DiamondsMall = rev.data;
            let panel = App.PanelManager.open(PanelConst.MallPanel) as MallPanel;
            panel.update(this._mallType);
        }
    }

    public requstBuyGold(bid) {
        //钻石购买金币
        var httpsender = new HttpSender();
        var request = ProtocolHttp.send_BuyGold;
        request.param.buy_id = bid;
        httpsender.send(request, this.revBuyGold, this)
    }

    private revBuyGold(rev: any) {
        if (rev.data) {
            this.sendEvent(EventConst.UpdateGold, rev.data.cur_gold);
            this.sendEvent(EventConst.UpdateDiamond, rev.data.cur_diamonds);

            App.MsgBoxManager.getBoxB().showMsg("购买成功");
        }
    }

    /** 请求背包数据 */
    public requestBackpack() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_ViewBag;
        request.param.uid = App.DataCenter.UserInfo.selfUser.userID;
        httpsend.send(request, this.revBackpack, this);
    }

    private revBackpack(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_ViewBag = rev.data;

            if (ProtocolHttp.rev_ViewBag.item_list == null) ProtocolHttp.rev_ViewBag.item_list = [];
            if (ProtocolHttp.rev_ViewBag.discount_list == null) ProtocolHttp.rev_ViewBag.discount_list = [];

            App.PanelManager.open(PanelConst.BackpackPanel);
        }
    }

    /** 查询邮件列表 */
    public requestMail() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_MailList;
        httpsend.send(request, this.revMailList, this);
    }

    private revMailList(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_MailList.mail_list = rev.data.mail_list;
            App.PanelManager.open(PanelConst.EmailPanel);
        }
    }

    /** 获取签到日历信息 */
    public sendMonthlyCalendar() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_MonthlyCalendar;
        httpsend.send(request, this.revMonthlyCalendar, this);
    }

    private revMonthlyCalendar(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_MonthlyCalendar = rev.data;
            App.PanelManager.open(PanelConst.SignPanel);
        }
    }

    public sendGetLuckyDraw() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_GetLuckyDraw;
        httpsend.send(request, this.revGetLuckyDraw, this);
    }

    private revGetLuckyDraw(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_GetLuckyDraw = rev.data;
            let panel = App.PanelManager.getPanel(PanelConst.ActivePanel) as ActivePanel;
            panel
        }
    }

    /** 幸运大转盘抽奖 */
    public requestHandleLuckyDraw() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_HandleLuckyDraw;
        httpsend.send(request, this.revHandleLuckyDraw, this);
    }

    private revHandleLuckyDraw(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_HandleLuckyDraw = rev.data;
            let panel = App.PanelManager.getPanel(PanelConst.ActivePanel) as ActivePanel;
            panel.setGift();
        }
    }

    /** 获取金币场的房间列表 */
    public sendServerList() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_ServerList;
        httpsend.send(request, this.revServerList, this);
    }

    private revServerList(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_ServerList.server_list = rev.data.server_list;
            App.PanelManager.open(PanelConst.GoldPanel);
        }
    }

    /** 手动刷取浮动广播 */
    private sendQueryNotice() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_QueryNotice;
        request.param.period = HallController.NOTICE_DELAY;
        httpsend.send(request, this.revQueryNotice, this);
    }

    private revQueryNotice(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_QueryNotice.message_arr = rev.data.message_arr;
            this.sendEvent(EventConst.ShowNotice);
        }
    }

    /** 背包使用物品 */
    public sendUseItem(itemId) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_UseItem;
        request.param.item_id = itemId;
        request.param.uid = App.DataCenter.UserInfo.selfUser.userID;
        httpsend.send(request, this.revUseItem, this);
    }

    private revUseItem(rev: any) {
        if (rev.data) {
            App.EventManager.sendEvent(EventConst.UseItem, rev.data);
        }
    }

    /** 加入房间，拿到服务器id获取服务器信息 */
    public sendAddRoom(roomId: number) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_AddRoom;
        request.param.room_pwd = roomId;
        httpsend.send(request, this.revAddRoom, this);
    }

    private revAddRoom(rev: any) {
        if (rev.data) {

        }
    }

    /** 查询俱乐部列表 */
    public sendClubList() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_ClubList;
        httpsend.send(request, this.revClubList, this);
    }

    private revClubList(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_ClubList.club_list = rev.data;
            App.PanelManager.open(PanelConst.ClubPanel);
        }
    }

    /** 查询俱乐部下的所有房间 */
    public sendClubRoomList(clubId) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_ClubRoomList;
        request.param.club_id = clubId;
        httpsend.send(request, this.revClubRoomList, this);
    }

    private revClubRoomList(rev: any) {
        if (!rev.data) rev.data = [];
        ProtocolHttp.rev_ClubRoomList.room_list = rev.data;
        let panel = App.PanelManager.getPanel(PanelConst.ClubPanel) as ClubPanel;
    }

    /** 更改俱乐部名称 */
    public sendUpdateClubName(clubId: string, clubName: string) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_UpdateClubName;
        request.param.club_id = clubId;
        request.param.name = clubName;
        httpsend.send(request, this.revUpdateClubName, this);
    }

    private revUpdateClubName(rev: any) {
        if (rev.data) {

        }
    }

    /** 创建俱乐部 */
    public sendCreateClub(clubName: string) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_CreateClub;
        request.param.name = clubName;
        httpsend.send(request, this.revCreateClub, this);
    }

    private revCreateClub(rev: any) {
        if (rev.data) {

        }
    }

    /** 创建房间 */
    public sendCreateRoom(clubId, playerNum, useCards) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_CreateRoom;
        request.param.club_id = clubId;
        request.param.player_num = playerNum;
        request.param.use_cards = useCards;
        httpsend.send(request, this.revCreateRoom, this);
    }

    private revCreateRoom(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_CreateRoom = rev.data;
        }
    }

    /** 加入俱乐部房间 */
    public sendAddClubRoom(pwd) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_AddClubRoom;
        request.param.room_pwd = pwd;
        httpsend.send(request, this.revAddClubRoom, this);
    }

    private revAddClubRoom(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_AddClubRoom = rev.data;
        }
    }

    /** 处理加入俱乐部的请求 */
    public sendHandleRequest(clubId, status, userId) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_HandleRequest;
        request.param.club_id = clubId;
        request.param.status = status;
        request.param.user_id = userId;
        httpsend.send(request, this.revHandleRequest, this);
    }

    private revHandleRequest(rev: any) {
        if (rev.data) {

        }
    }

    /** 查看俱乐部申请请求 */
    public sendClubRequest(clubId) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_ClubRequest;
        request.param.club_id = clubId;
        httpsend.send(request, this.revClubRequest, this);
    }

    private revClubRequest(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_ClubRequest.apply_list = rev.data;
        }
    }

    /** 查看俱乐部的成员列表 */
    public sendClubMembers(clubId) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_ClubMembers;
        request.param.club_id = clubId;
        httpsend.send(request, this.revClubMembers, this);
    }

    private revClubMembers(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_ClubMembers.members = rev.data;
        }
    }

    /** 根据id查找俱乐部 */
    public sendCheckClub(clubId) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_CheckClub;
        request.param.club_id = clubId;
        httpsend.send(request, this.revCheckClub, this);
    }

    private revCheckClub(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_CheckClub = rev.data;
            (App.PanelManager.getPanel(PanelConst.ClubPanel) as ClubPanel).showClubInfo(rev.data);
        }
    }

    /** 解散俱乐部 */
    public sendDissolveClub(clubId) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_DissolveClub;
        request.param.club_id = clubId;
        httpsend.send(request, this.revDissolveClub, this);
    }

    private revDissolveClub(rev: any) {
        if (rev.data) {

        }
    }

    /** 解散房间 */
    public sendDissolutionRoom(roomId) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_DissolutionRoom;
        request.param.id = roomId;
        httpsend.send(request, this.revDissolutionRoom, this);
    }

    private revDissolutionRoom(rev: any) {
        if (rev.data) {

        }
    }

    /** 加入俱乐部 */
    public sendJoinInClub(clubId, desc) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_JoinInClub;
        request.param.club_id = clubId;
        request.param.desc = desc;
        httpsend.send(request, this.revJoinInClub, this);
    }

    private revJoinInClub(rev: any) {
        if (rev.data) {

        }
    }

    /** 退出俱乐部 */
    public sendExitClub(clubId, userId) {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_ExitClub;
        request.param.club_id = clubId;
        request.param.user_id = userId;
        httpsend.send(request, this.revExitClub, this);
    }

    private revExitClub(rev: any) {
        if (rev.data) {

        }
    }
}