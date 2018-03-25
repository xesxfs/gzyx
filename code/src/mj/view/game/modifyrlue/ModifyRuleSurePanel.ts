/**
 * 关闭修改规则确认界面
 * @author huanglong 
 * 2017-4-25
*/

class ModifyRuleSurePanel extends BasePanel {
    public jujueBtn:eui.Button;
    public okBtn:eui.Button;
    public closeBtn:eui.Button;


    public constructor() {
        super();
        this.skinName = "ModifyRuleSureSkin";
    }

    /**组件创建完毕*/
    protected childrenCreated() {
    }

    /**添加到场景中*/
    protected onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    }

    /**从场景中移除*/
    protected onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    }

    private okTouch() {
        App.PanelManager.closeAllPanel();
    }

    public close() {
        this.hide();
    }
}
