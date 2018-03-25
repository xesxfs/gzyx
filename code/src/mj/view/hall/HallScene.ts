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
    public addDiaBtn: eui.Button;
    public addGoldBtn: eui.Button;
    public rankList: eui.List;

    public constructor() {
        super();
        this.skinName = "HallSceneSkin";
    }

    protected childrenCreated() {

    }
    protected onEnable() {
        this.addLister();
    }
    protected onRemove() {

    }


    private addLister() {
        this.addEventListener("touchTap", this.onClick, this);
        this.personGroup.addEventListener("touchTap", this.onPersion, this);


    }

    private onClick(e: egret.TouchEvent) {
        switch (e.target) {
            case this.activeBtn:
                App.PanelManager.open(PanelConst.ActivePanel)
                this.ctrl.registerSocket();
                break;
            case this.mallBtn:
                App.PanelManager.open(PanelConst.MallPanel)
                break;
            case this.shareBtn:
                App.PanelManager.open(PanelConst.SharePanel)
                break;
            case this.bagBtn:
                App.PanelManager.open(PanelConst.BackpackPanel)
                break;
            case this.viewBtn:
                break;
            case this.signinBtn:
                App.PanelManager.open(PanelConst.SignPanel)
                break;
            case this.setBtn:
                App.PanelManager.open(PanelConst.SetPanel)
                break;
            case this.mailBtn:
                App.PanelManager.open(PanelConst.EmailPanel)
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
                data.uid=App.DataCenter.UserInfo.selfUser.userID;
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

