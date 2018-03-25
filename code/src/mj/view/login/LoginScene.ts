/**
 * 登录界面
 * @author chen
 * @date 2016/6/27
 */
class LoginScene extends BaseScene {
    /**控制模块*/
    protected ctrl: LoginController;
    public wxBtn: eui.Button;
    public accountBtn: eui.Button;

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



}
