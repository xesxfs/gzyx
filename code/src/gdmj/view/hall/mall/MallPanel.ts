/**
 * 商城界面
 * @author eyanlong 
 * @date 2017/2/21
 */

class MallPanel extends BasePanel{

    public hallGro:eui.Group;
    public mall_back:eui.Button;
    public mallListHall:eui.List;
    public gameGro:eui.Group;
    public mallListGame:eui.List;

    private mallList:eui.List;

	public constructor() {
		super();
		this.skinName = "MallPanelSkin";
	}

	protected onEnable() {
        this.mall_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);

        if (this.gameBool) {
            this.hallGro.visible = false;
            this.gameGro.visible = true;
            this.mallList = this.mallListGame;
        }
        else {
            this.hallGro.visible = true;
            this.gameGro.visible = false;
            this.mallList = this.mallListHall;
        }

        this.setData(this.recData);
    }

    protected onRemove() {
        this.mall_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.gameBool = false;
    }

	/**设置数据 */
    private setData(list: Array<any>) {
        let ac = new eui.ArrayCollection();
        let arr = [];
        for(var i = 0; i < list.length; i++) {
			let dataObj = new MallItemData();
			dataObj.setData(list[i]);

            arr.push(dataObj);
        }
        ac.source = arr;
        this.mallList.dataProvider = ac;
        this.mallList.itemRenderer = MallItem;
    }

	/**返回 */
	protected back(){
		this.hide();
	}
}