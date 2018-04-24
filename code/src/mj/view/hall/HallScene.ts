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
    public clubBtn: eui.Button;
    public addCardBtn: how.Button;
    public cardLab: eui.Label;
    public headUrl: eui.Image;

    public rankingPnl: HallRankingPanel;
    public marquee: Marquee;

    public constructor() {
        super();
        this.skinName = "HallSceneSkin";
    }

    protected childrenCreated() {
        this.marquee = new Marquee();
        this.marquee.x = (App.StageUtils.stageWidth - this.marquee.width) / 2;
        this.marquee.y = 80;

        this.addChild(this.marquee)
    }

    private updateSelf() {
        let user = App.DataCenter.UserInfo.selfUser;
        this.nameLab.text = user.nickName;
        this.coinLab.text = user.coin.toString();
        this.goldLab.text = user.gold.toString();
        this.cardLab.text = user.roomCard.toString();
        this.headUrl.source = user.headUrl;
    }

    protected onEnable() {
        this.addLister();
        this.updateSelf();
    }

    protected onRemove() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.personGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPersion, this);
        App.EventManager.removeEvent(EventConst.UpdateGold, this.onUpdateGold, this);
        App.EventManager.removeEvent(EventConst.UpdateDiamond, this.onUpdateDiamond, this);
        App.EventManager.removeEvent(EventConst.ShowNotice, this.onShowNotice, this);
        App.EventManager.removeEvent(EventConst.UpdateCard, this.onUpdateCard, this);
    }

    private addLister() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.personGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPersion, this);
        App.EventManager.addEvent(EventConst.UpdateGold, this.onUpdateGold, this);
        App.EventManager.addEvent(EventConst.UpdateDiamond, this.onUpdateDiamond, this);
        App.EventManager.addEvent(EventConst.ShowNotice, this.onShowNotice, this);
        App.EventManager.addEvent(EventConst.UpdateCard, this.onUpdateCard, this);
    }

    // 广告轮播
    private onShowNotice() {
        ProtocolHttp.rev_QueryNotice.message_arr.forEach((msg) => {
            this.marquee.push(msg);
        });
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

    private onUpdateCard(data: any) {
        App.DataCenter.UserInfo.selfUser.roomCard = data;
        this.cardLab.text = data;
    }

    private onClick(e: egret.TouchEvent) {
        switch (e.target) {
            case this.activeBtn:
                this.ctrl.requestActive();
                break;
            case this.mallBtn:
                (App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Diamond);
                break;
            case this.shareBtn:
                App.PanelManager.open(PanelConst.SharePanel)
                break;
            case this.bagBtn:
                this.ctrl.requestBackpack();
                break;
            case this.viewBtn:
                break;
            case this.signinBtn:
                this.ctrl.sendMonthlyCalendar();
                break;
            case this.setBtn:
                App.PanelManager.open(PanelConst.SetPanel)
                break;
            case this.mailBtn:
                this.ctrl.requestMail();
                break;
            case this.helpBtn:
                App.PanelManager.open(PanelConst.RulePanel)
                break;
            case this.addGoldBtn:
                (App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Gold);
                break;
            case this.addDiaBtn:
                (App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Diamond);
                break;
            case this.addCardBtn:
                (App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Ticket);
                break;
            case this.rankGameBtn:
                this.joinRankRoom();
                break;
            case this.goldGameBtn:
                // this.ctrl.sendServerList();
                App.PanelManager.open(PanelConst.GoldPanel);
                break;
            case this.createBtn:
                App.PanelManager.open(PanelConst.CreateRoomPanel);
                break;
            case this.enterBtn:
                App.PanelManager.open(PanelConst.JoinRoomPanel)
                break;
            case this.clubBtn:
                this.ctrl.sendClubList();
                break;

        }
    }

    private joinRankRoom() {
        let data = ProtocolData.Send102;
        data.uid = App.DataCenter.UserInfo.selfUser.userID;
        this.ctrl.sendJoinRoom(data, App.DataCenter.ServerInfo.GAME_SERVER + ":" + App.DataCenter.ServerInfo.GAME_PORT);
    }

    private onPersion() {
        App.PanelManager.open(PanelConst.UserInfoPanel);
    }

    private removeLiter() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.personGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPersion, this);
    }
}

