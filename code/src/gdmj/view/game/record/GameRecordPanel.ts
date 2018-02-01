/**
 * 好友房记录
 * @author huanglong
 * 2017/4/25
 */
class GameRecordPanel extends BasePanel {
	public gameRecordList:eui.List;
    public nilLab:eui.Label;
    public bgImg:eui.Image;

	public constructor() {
		super();
        this.skinName = "GameRecordPanelSkin";
	}

	/**添加到场景中*/
    protected onEnable() {
        if (this.recData.length < 1) {
            this.nilLab.visible = true;
        }
        else {
            this.nilLab.visible = false;
        }
        this.setData(this.recData);
    }

    /**从场景中移除*/
    protected onRemove() {
        this.recData = [];
    }

	/**设置数据 */
    public setData(data:any) {
        console.log("_++++++++++++",data);
        data.sort((a,b)=>{
            return b.current_play_count - a.current_play_count;
        });
        let ac = new eui.ArrayCollection();
        ac.source = data;
        this.gameRecordList.dataProvider = ac;
        this.gameRecordList.itemRenderer = GameRecordItem;
    }

	/**返回 */
	private back(){
		this.hide();
	}
}