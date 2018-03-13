/**
 * 登录界面
 * @author chenwei
 * @date 2016/6/27
 */
class LoginScene extends BaseScene {
    /**控制模块*/
    protected ctrl: LoginController;

    private editText: eui.EditableText;

    public constructor() {
        super();
        this.skinName = "LoginSceneSkin";
    }

    protected onEnable() {
        App.NativeBridge.getBagType();
    }

    protected onRemove() {

    }

    /**判断本机是否存在token */
    private isToken() {
        var refreshToken = egret.localStorage.getItem("refresh_token");
    }


    /**点击微信登录*/
    private onWXLogin(e: egret.Event) {

        if (!this.editText) {
        }
        else {
            if (this.editText.text != "") {
                this.ctrl.sendDebugLoginReq(this.editText.text, App.DataCenter.debugInfo.password);
            }
        }
    }


}
