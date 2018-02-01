/**
 * 加入房间界面
 * @author eyanlong 
 * @date 2017/2/23
 */

class JoinRoomPanel extends BasePanel{
	/**返回按钮 */
	private joinRoom_close:eui.Button;
	public constructor() {
		super();
		this.skinName = "JoinRoomPanelSkin";
	}

	protected onEnable() {
        this.joinRoom_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);

		this.initUI();
    }

    protected onRemove() {
        this.joinRoom_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    }

	/**初始化界面 */
	protected initUI() {
		console.log("this.reRoomInfo::",this.recData);
	}

	/**返回 */
	protected back(){
		this.hide();
	}


}