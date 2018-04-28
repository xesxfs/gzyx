/**
 * 预加载面板
 * @author chenwei
 * @date 2016/07/14
 */
class PreloadPanel extends BasePanel {
    /**进度文本*/
    private percentLab: eui.Label;
    public animator:how.Animator;
    public constructor() {
        super();
        this.skinName = "PreloadPanelSkin";
    }

    protected onEnable() {
        this.setProgress(0);
        egret.setTimeout(()=>{ this.play(); }, this, 100)
    }

    public play () {
        this.animator.play(this.animator.defentAnimationName);
    }

    protected onRemove() {
        this.setProgress(0);
        this.animator.stop();
    }

    /**
     * 设置加载进度
     * @value 进度 0-100
     */
    public setProgress(value: number) {
        if (this.percentLab) {
            this.percentLab.text = value + "%";
        }
    }

}
