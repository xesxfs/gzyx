/**
 * 商城界面
 * @author chen 
 * @date 2017/2/21
 */

class MallPanel extends BasePanel{



	public constructor() {
		super();
		this.skinName = "MallPanelSkin";
	}

	protected onEnable() {
      this.setCenter();
    }

    protected onRemove() {
   
    }

	/**设置数据 */
    private setData(list: Array<any>) {
      
    }

	/**返回 */
	protected back(){
		this.hide();
	}
}