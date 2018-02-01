/**
 * 登录方式界面
 * @author huanglong 
 * @date 2017/06/15
 */

class LoginChoosePanel extends BasePanel{

    public wxBtn:eui.Button;
    public elseBtn:eui.Button;
    public imBtn:eui.Button;

	public constructor() {
		super();
		this.skinName = "LoginChoosePanelSkin";
	}

	protected onEnable() {
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.elseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.imBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    protected onRemove() {
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.elseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.imBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(e:egret.TouchEvent) {
        switch(e.target) {
            case this.wxBtn:
                var data = {
                    type: "wxLogin",
                    data: {
                        gameid: "10004",
                    }
                }
                App.NativeBridge.sendLoginType(data);
                break;
            case this.elseBtn:
                var data = {
                    type: "visitorLogin",
                    data: {
                        gameid: "10004",
                    }
                }
                App.NativeBridge.sendLoginType(data);
                break;
            case this.imBtn:
                //登录界面
                App.PanelManager.open(PanelConst.LoginPanel);
                break;
            default:
                break;
        }
    }
}