/**
 * 加入房间界面
 * @author chen 
 * @date 2017/2/23
 */

class JoinRoomPanel extends BasePanel{

	public constructor() {
		super();
		this.skinName = "JoinRoomPanelSkin";
	}

	protected onEnable() {
		this.setCenter();
    }

    protected onRemove() {
     
    }


	/**返回 */
	protected back(){
		this.hide();
	}


}