/**
 * @author chen
 * 
 * 2016-12-29
 */

class SetPanel extends BasePanel {
    public nameLab: eui.Label;
    public changeBtn: eui.Button;
    public clearBtn: eui.Button;
    public soundHdr: eui.HSlider;
    public musicHdr: eui.HSlider;
    public closeBtn: eui.Button;


    public constructor() {
        super();
        this.skinName = "SetPanelSkin"
    }

    private onTouch(evt: egret.TouchEvent) {
        switch (evt.target) {
            case this.closeBtn:
                this.hide();
                break;
            case this.changeBtn:
                this.hide();
                App.SceneManager.runScene(SceneConst.LoginScene);
                break;
            case this.clearBtn:

                break;

            default:
                break;
        }
    }

    /** 添加到场景*/
    protected onEnable() {
        this.setCenter();
        this.init();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    /** 从场景中移除*/
    protected onRemove() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    /**设置界面值 */
    private init() {
        this.nameLab.text = App.DataCenter.UserInfo.selfUser.nickName;
    }
}