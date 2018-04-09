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

    private updateSelf() {
        let user = App.DataCenter.UserInfo.selfUser;
        this.nameLab.text = user.nickName;
        this.coinLab.text = user.coin.toString();
        this.goldLab.text = user.gold.toString();
    }

    protected onEnable() {
        this.addLister();
        this.updateSelf();
    }

    protected onRemove() {
        this.removeEventListener("touchTap", this.onClick, this);
        this.personGroup.removeEventListener("touchTap", this.onPersion, this);
        App.EventManager.removeEvent(EventConst.UpdateGold, this.onUpdateGold, this);
        App.EventManager.removeEvent(EventConst.UpdateDiamond, this.onUpdateDiamond, this);
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
                this.ctrl.requestActive();
                break;
            case this.mallBtn:
                this.ctrl.requestMall(MallType.Diamond);
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
                this.ctrl.requestMall(MallType.Gold);
                break;
            case this.addDiaBtn:
                this.ctrl.requestMall(MallType.Diamond);
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
}

