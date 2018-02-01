/**
 * 游客绑定
 * @author huanglong 
 * @date 2017/06/16
 */

class BindPanel extends BasePanel{

    public registGro:eui.Group;
    public phoneEdit:eui.EditableText;
    public verifyEdit:eui.EditableText;
    public passEditZS:eui.EditableText;
    public passEditZU:eui.EditableText;
    public registBtn:eui.Button;
    public getVerify:eui.Button;
    public closeBtn:eui.Button;

	public constructor() {
		super();
		this.skinName = "BindPanelSkin";
	}

	protected onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.registBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRegist, this);
        this.getVerify.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getRegistCode, this);
    }

    protected onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.registBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRegist, this);
        this.getVerify.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getRegistCode, this);
    }
    
    private back() {
        this.hide();
    }

    /**获取注册验证码 */
    private getRegistCode() {
        var phoneText = this.phoneEdit.text;

        if (phoneText && phoneText.length == 11) {
            TipsLog.hallInfo("验证码已发送，请耐心等待");
            var data = {
                phone: phoneText
            }
            App.NativeBridge.sendRegistCode(data);
        }
        else {
            TipsLog.hallInfo("请输入正确的手机号");
        }
    }

    /**点击注册 */
    private onTouchRegist() {
        if (!this.phoneEdit.text) {
            TipsLog.hallInfo("手机号不能为空");
        }
        else if (!this.verifyEdit.text) {
            TipsLog.hallInfo("验证码不能为空");
        }
        else if (!this.passEditZS.text) {
            TipsLog.hallInfo("密码不能为空");
        }
        else if (!this.passEditZU.text) {
            TipsLog.hallInfo("确认密码不能为空");
        }
        else if (this.phoneEdit.text.length < 11) {
            TipsLog.hallInfo("请输入11位手机号");
        }
        else if (this.passEditZS.text.length < 6) {
            TipsLog.hallInfo("密码为6~16位数字或字母组合");
        }
        else if (this.passEditZS.text != this.passEditZU.text) {
            TipsLog.hallInfo("密码和确认密码不一致");
        }
        else {
            var data = {
                phone: this.phoneEdit.text,
                password: this.passEditZS.text,
                verificationcode: this.verifyEdit.text
            }
            App.NativeBridge.sendBind(data);
        }
    }
}