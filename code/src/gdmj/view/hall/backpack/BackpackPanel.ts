/**
 * 背包界面
 * @author eyanlong 
 * @date 2017/2/22
 */
class BackpackPanel extends BasePanel{
	public hallGro:eui.Group;
	public mall_back:eui.Button;
	public backpackListHall:eui.List;
	public gameGro:eui.Group;
	public backpackListGame:eui.List;
	public nilLabHall:eui.Label;
	public nilLabGame:eui.Label;

	private backpackList:eui.List;

	public constructor() {
		super();
		this.skinName = "BackpackPanelSkin";
	}

	protected onEnable() {
        this.mall_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);

		if (this.gameBool) {
            this.hallGro.visible = false;
            this.gameGro.visible = true;
            this.backpackList = this.backpackListGame;
        }
        else {
            this.hallGro.visible = true;
            this.gameGro.visible = false;
            this.backpackList = this.backpackListHall;
        }
		this.setData(this.recData);
    }

    protected onRemove() {
        this.mall_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.gameBool = false;
    }

	public setData(list: Array<any>){

		if (list.length > 0) {
			let ac = new eui.ArrayCollection();
			if (this.gameBool) {
				for (var i = 0;i < list.length;i ++) {
					list[i].gameBool = true;
				}
			}
			ac.source = list;
			this.backpackList.dataProvider = ac;
			this.backpackList.itemRenderer = BackpackItem;
			this.nilLabHall.visible = false;
			this.nilLabGame.visible = false;
		}
		else {
			if (this.gameBool) {
				this.nilLabHall.visible = false;
				this.nilLabGame.visible = true;
			}
			else {
				this.nilLabHall.visible = true;
				this.nilLabGame.visible = false;
			}
		}
	}

	/**返回 */
	protected back(){
		this.hide();
	}

}