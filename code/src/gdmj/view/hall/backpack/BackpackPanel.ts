/**
 * 背包界面
 * @author chen 
 * @date 2017/2/22
 */
class BackpackPanel extends BasePanel{


	public constructor() {
		super();
		this.skinName = "BackpackPanelSkin";
	}

	protected onEnable() {
		this.setCenter();
      
    }

    protected onRemove() {
   
    }

	public setData(list: Array<any>){

	}

	/**返回 */
	protected back(){
		this.hide();
	}

}