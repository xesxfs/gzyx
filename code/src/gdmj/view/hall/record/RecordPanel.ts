/**
 * 记录界面
 * @author huanglong
 * 2017/3/17
 */
class RecordPanel extends BasePanel {
	public backBtn:eui.Button;
    public recordList:eui.List;
    public nilLabHall:eui.Label;

	public constructor() {
		super();
        this.skinName = "RecordPanelSkin";
        this.recordList.useVirtualLayout = false;
	}

	/**添加到场景中*/
    protected onEnable() {
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.setData(this.recData);
    }

    /**从场景中移除*/
    protected onRemove() {
		this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    }

	/**设置数据 */
    public setData(data:any) {
        if (data.length > 0) {
            let ac = new eui.ArrayCollection();
            ac.source = data;
            this.recordList.dataProvider = ac;
            this.recordList.itemRenderer = RecordItem;
            this.nilLabHall.visible = false;
        }
        else {
            this.nilLabHall.visible = true;
        }
    }

	/**返回 */
	private back(){
		this.hide();
	}
}