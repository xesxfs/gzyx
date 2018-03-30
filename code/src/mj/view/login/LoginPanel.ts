/**
 * 登录、注册
 * @author  
 * @date 2017/05/06
 */

class LoginPanel extends BasePanel {

    public loginGro: eui.Group;
    public closeLoginBtn: eui.Button;
    public phoneEdit: eui.EditableText;
    public passEdit: eui.EditableText;
    public registBtn: eui.Button;
    public LoginBtn: eui.Button;

    public registGro: eui.Group;
    public closeRegistBtn: eui.Button;
    public rgPhoneEdit: eui.EditableText;
    public rgPassEdit: eui.EditableText;
    public nickNameEdit: eui.EditableText;
    public okBtn: eui.Button;


    public constructor() {
        super();
        this.skinName = "LoginPanelSkin";
    }

    protected onEnable() {
        this.loginGro.visible = true;
        this.registGro.visible = !true;
        this.closeLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.closeRegistBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.LoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        this.registBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchRLGroup, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRegist, this);
    }

    /**注册登录切换 */
    private switchRLGroup() {
        this.loginGro.visible = false;
        this.registGro.visible = !false;
    }

    protected onRemove() {
        this.closeLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.closeRegistBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this.LoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        this.registBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.switchRLGroup, this);
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRegist, this);
    }


    /**点击登录 */
    private onLogin() {
        if (!this.phoneEdit.text || !this.passEdit.text) {
            TipsLog.hallInfo("账号或密码不能为空");
        }
        else {
            this.sendLogin();
        }
    }

    private sendLogin() {
        var httpsend = new HttpSender();
        var loginData = ProtocolHttp.send_z_login;
        var testAccount = this.phoneEdit.text;
        var testPassword = this.passEdit.text;
        loginData.param.user = testAccount
        loginData.param.password = testPassword;
        httpsend.send(loginData, this.revLogin, this);
    }

    private revLogin(data: any) {
        this.hide();
        let ctrl = App.getController(LoginController.NAME) as LoginController;
        ctrl.bLogin = true;

        let json = ProtocolHttp.rev_z_login;
        json = data;
        if (json.ret == 0) {
            let suser = App.DataCenter.UserInfo.selfUser;
            suser.userID = json.data.uid;
            suser.nickName = json.data.nick_name;
            suser.skey = json.data.skey;
            suser.headUrl = json.data.avater_url;
            suser.coin = json.data.diamonds;
            suser.gold = json.data.gold;
            suser.IP = json.data.login_ip;
            suser.sex = json.data.sex;
            App.DataCenter.UserInfo.addUser(suser);

        }
        ctrl.startLoadHall();

    }



    /**点击注册 */
    private onTouchRegist() {
        if (!this.phoneEdit.text) {
            TipsLog.hallInfo("手机号不能为空");
        }
        else if (!this.rgPassEdit.text) {
            TipsLog.hallInfo("密码不能为空");
        }
        else if (!this.nickNameEdit.text) {
            TipsLog.hallInfo("昵称不能为空");
        }
        else if (this.phoneEdit.text.length < 11) {
            TipsLog.hallInfo("请输入11位手机号");
        }
        else if (this.rgPassEdit.text.length < 6) {
            TipsLog.hallInfo("密码为6~16位数字或字母组合");
        }
        else {
            this.sendRegist();

        }
    }

    private sendRegist() {
        var httpsend = new HttpSender();
        var register = ProtocolHttp.send_z_regist;
        register.param.user = this.phoneEdit.text;
        register.param.password = this.passEdit.text;
        register.param.nick_name = this.nickNameEdit.text;
        httpsend.send(register, this.revLogin, this);
    }

    private revRegist() {

    }


}