/**
 * 登录界面
 * @author chen
 * @date 2016/6/27
 */
class LoginScene extends BaseScene {
    /**控制模块*/
    protected ctrl: LoginController;
    public loginGrp: eui.Group;
    public wxBtn: how.Button;
    public accountBtn: how.Button;

    public constructor() {
        super();
        this.skinName = "LoginSceneSkin";
    }

    protected onEnable() {
        this.wxBtn.addEventListener("touchTap", this.onWXLogin, this);
        this.accountBtn.addEventListener("touchTap", this.onAccountLogin, this)
    }

    protected onRemove() {
        this.wxBtn.removeEventListener("touchTap", this.onWXLogin, this);
        this.accountBtn.removeEventListener("touchTap", this.onAccountLogin, this)
    }

    /**判断本机是否存在token */
    private isToken() {
        var refreshToken = egret.localStorage.getItem("refresh_token");
    }


    /**点击微信登录*/
    private onWXLogin(e: egret.TouchEvent) {

    }

    private onAccountLogin(e: egret.TouchEvent) {
        App.PanelManager.open(PanelConst.LoginPanel);
    }

    public showLogin() {
        this.loginGrp.alpha = 0;
        this.loginGrp.visible = true;
        this.loginGrp.scaleX = this.loginGrp.scaleY = 0.5;
        egret.Tween.get(this.loginGrp).to({ alpha: 1, scaleX:1, scaleY:1}, 100);
    }

}
