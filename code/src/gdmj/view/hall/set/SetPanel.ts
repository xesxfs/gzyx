/**
 * @author chen
 * 
 * 2016-12-29
 */

class SetPanel extends BasePanel{

    public constructor() {
        super();
        this.skinName = "SetPanelSkin"
    }

   protected childrenCreated() {
    }

    /** 添加到场景*/
    protected onEnable() {
        this.setCenter();
    }

    /** 从场景中移除*/
    protected onRemove() {

    }

    /**设置界面值 */
    private initView() {
      
    }

  /**关闭*/
    private onCloseBtn(e: egret.Event) {
        this.hide()
    }

}