/**
 * 大厅界面
 * @author chenwei
 * @date 2016/6/28
 */
class HallScene extends BaseScene {
    /**场景控制类*/
    protected ctrl: HallController;

    public activeBtn: how.Button;
    public mallBtn: how.Button;
    public shareBtn: how.Button;
    public bagBtn: how.Button;
    public signinBtn: how.Button;
    public clubBtn: how.Button;
    public setBtn: how.Button;
    public menuBtn: how.Button;
    public rankGameBtn: how.Button;
    public grabGameBtn: how.Button;
    public goldGameBtn: how.Button;
    public createBtn: how.Button;
    public enterBtn: how.Button;
    public personGroup: eui.Group;
    public nameLab: eui.Label;
    public headUrl: eui.Image;
    public maskImg: eui.Image;
    public addDiaBtn: how.Button;
    public coinLab: eui.Label;
    public addCardBtn: how.Button;
    public cardLab: eui.Label;
    public quickLab: eui.Label;
    public rankingPnl: HallRankingPanel;
    public menuGrp: eui.Group;
    public mailBtn: how.Button;
    public helpBtn: how.Button;

    public marquee: Marquee;

    public constructor() {
        super();
        this.skinName = "HallSceneSkin";
    }

    protected childrenCreated() {
        this.marquee = new Marquee();
        this.marquee.x = (App.StageUtils.stageWidth - this.marquee.width) / 2;
        this.marquee.y = 80;
        this.headUrl.mask = this.maskImg;

        this.addChild(this.marquee)
    }

    private updateSelf() {
        let user = App.DataCenter.UserInfo.selfUser;
        this.nameLab.text = user.nickName;
        this.coinLab.text = user.coin.toString();
        // this.goldLab.text = NumberTool.formatMoney(user.gold);
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
        // this.goldLab.text = NumberTool.formatMoney(data);
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

    public updateQuick(data: any) {
        this.quickLab.text = "快抢赛 " + data;
    }

    private onClick(e: egret.TouchEvent) {
        this.menuGrp.visible = false;

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
            // case this.addGoldBtn:
            //     (App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Gold);
            //     break;
            case this.addDiaBtn:
                (App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Diamond);
                break;
            case this.addCardBtn:
                (App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Ticket);
                break;
            case this.rankGameBtn:
                let data = ProtocolData.Send102;
                data.uid = App.DataCenter.UserInfo.selfUser.userID;

                ProtocolHttp.rev_ServerList.server_list.forEach((element) => {
                    if (element["server_flag"] == 2000001) {
                        // 排位赛
                        this.ctrl.sendJoinRoom(data, element["server_ip"] + ":" + element["websocket_port"]);
                        GameInfo.curGameType = GAME_TYPE.RankGame;
                    }
                })

                break;
            case this.goldGameBtn:
                // this.ctrl.sendServerList();
                App.PanelManager.open(PanelConst.GoldPanel);
                break;
            case this.grabGameBtn:
                // App.PanelManager.open(PanelConst.GrabPanel);
                this.ctrl.sendQuicklyGrab();
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
            case this.menuBtn:
                this.menuGrp.visible = !this.menuGrp.visible;
                break;
            default:

                break;

        }
    }

    private onPersion() {
        App.PanelManager.open(PanelConst.UserInfoPanel);
    }

    private removeLiter() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.personGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPersion, this);
    }
}

