/**
 * 大厅界面
 * @author chenwei
 * @date 2016/6/28
 */
class HallScene extends BaseScene {
    /**场景控制类*/
    protected ctrl: HallController;

    public activeBtn: eui.Button;
    public mallBtn: eui.Button;
    public shareBtn: eui.Button;
    public bagBtn: eui.Button;
    public viewBtn: eui.Button;
    public signinBtn: eui.Button;
    public helpBtn: eui.Button;
    public mailBtn: eui.Button;
    public setBtn: eui.Button;
    public rankGameBtn: eui.Button;
    public goldGameBtn: eui.Button;
    public createBtn: eui.Button;
    public enterBtn: eui.Button;
    public personGroup: eui.Group;
    public nameLab: eui.Label;
    public addDiaBtn: eui.Button;
    public coinLab: eui.Label;
    public addGoldBtn: eui.Button;
    public goldLab: eui.Label;
    public rankingPnl: HallRankingPanel;

    public constructor() {
        super();
        this.skinName = "HallSceneSkin";
    }

    protected childrenCreated() {
        this.updateSelf()
        this.requestRanking();
        this.requestItemList();
    }

    private updateSelf() {
        let user = App.DataCenter.UserInfo.selfUser;
        this.nameLab.text = user.nickName;
        this.coinLab.text = user.coin.toString();
        this.goldLab.text = user.gold.toString();
    }

    /** 请求排行数据 */
    private requestRanking() {
        var httpsend = new HttpSender();
        var loginData = ProtocolHttp.send_Rank;

        httpsend.send(loginData, this.revRanking, this);
    }

    private revRanking(rev: any) {
        let ranking = ProtocolHttp.rev_Rank;
        ranking.data = rev.data;
        this.rankingPnl.update();
    }

    protected onEnable() {
        this.addLister();
    }
    protected onRemove() {

    }


    private addLister() {
        this.addEventListener("touchTap", this.onClick, this);
        this.personGroup.addEventListener("touchTap", this.onPersion, this);

        App.EventManager.addEvent(EventConst.UpdateGold, this.onUpdateGold, this);
        App.EventManager.addEvent(EventConst.UpdateDiamond, this.onUpdateDiamond, this);
    }

    //刷新金币信息
    private onUpdateGold(data: any) {
        App.DataCenter.UserInfo.selfUser.gold = data;
        this.goldLab.text = data;
    }

    //刷新钻石信息
    private onUpdateDiamond(data: any) {
        App.DataCenter.UserInfo.selfUser.coin = data;
        this.coinLab.text = data;
    }

    private onClick(e: egret.TouchEvent) {
        switch (e.target) {
            case this.activeBtn:
                this.requestActive();
                break;
            case this.mallBtn:
                this.requestDiamondsMall();
                break;
            case this.shareBtn:
                App.PanelManager.open(PanelConst.SharePanel)
                break;
            case this.bagBtn:
                this.requestBackpack();
                break;
            case this.viewBtn:
                break;
            case this.signinBtn:
                this.sendMonthlyCalendar();
                break;
            case this.setBtn:
                App.PanelManager.open(PanelConst.SetPanel)
                break;
            case this.mailBtn:
                this.requestMail();
                break;
            case this.helpBtn:
                App.PanelManager.open(PanelConst.RulePanel)
                break;
            case this.addGoldBtn:
                App.PanelManager.open(PanelConst.MallPanel)
                break;
            case this.addDiaBtn:
                App.PanelManager.open(PanelConst.MallPanel)
                break;
            case this.rankGameBtn:
                let data = ProtocolData.Send102;
                data.uid = App.DataCenter.UserInfo.selfUser.userID;
                this.ctrl.sendJoinRoom(data);
                break;
            case this.goldGameBtn:
                App.PanelManager.open(PanelConst.GoldPanel)
                break;
            case this.createBtn:
                App.PanelManager.open(PanelConst.CreateRoomPanel)
                break;
            case this.enterBtn:
                App.PanelManager.open(PanelConst.JoinRoomPanel)
                break;

        }
    }

    private onPersion() {
        App.PanelManager.open(PanelConst.UserInfoPanel);
    }

    private removeLiter() {
        this.removeEventListener("touchTap", this.onClick, this);
        this.personGroup.removeEventListener("touchTap", this.onPersion, this);
    }

    //获取商品列表
    private requestItemList() {
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

    // 请求活动列表
    private requestActive() {
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

    // 请求钻石商城列表
    private requestDiamondsMall() {
        var httpsend = new HttpSender();
        var mall = ProtocolHttp.send_DiamondsMall;
        httpsend.send(mall, this.revDiamondsMall, this);
    }

    private revDiamondsMall(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_DiamondsMall = rev.data;
            App.PanelManager.open(PanelConst.MallPanel);
        }
    }

    //请求背包数据
    private requestBackpack() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_ViewBag;
        request.param.uid = App.DataCenter.UserInfo.selfUser.userID;
        httpsend.send(request, this.revBackpack, this);
    }

    private revBackpack(rev: any) {
        if (rev.data) {
            ProtocolHttp.rev_ViewBag = rev.data;

            if (!ProtocolHttp.rev_ViewBag.item_list) ProtocolHttp.rev_ViewBag.item_list = [];
            if (!ProtocolHttp.rev_ViewBag.discount_list) ProtocolHttp.rev_ViewBag.discount_list = [];

            App.PanelManager.open(PanelConst.BackpackPanel);
        }
    }

    //查询邮件列表
    private requestMail() {
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
    private sendMonthlyCalendar() {
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

}

