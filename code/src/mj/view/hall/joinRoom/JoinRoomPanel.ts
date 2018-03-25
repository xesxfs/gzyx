/**
 * 加入房间界面
 * @author chen 
 * @date 2017/2/23
 */

class JoinRoomPanel extends BasePanel {

	public constructor() {
		super();
		this.skinName = "JoinRoomPanelSkin";
	}
	public roomIdGroup: eui.Group;


	protected onEnable() {
		this.setCenter();
	}

	protected onRemove() {

	}

	private join() {
		let ctrl = App.getController(HallController.NAME) as HallController;
		let data = ProtocolData.Send102;
		// data.roomid=this.getRoomId();
		ctrl.sendJoinRoom(data);
		this.hide();
	}

	private getRoomId():number {
		let roomId = 0;
		for (let i = 0; i < 6; i++) {
			let lab = this.roomIdGroup.getChildAt(i + 5) as eui.Label;
			let num = parseInt(lab.text);
			roomId += i * 10 * num;
		}
		return roomId;
	}


	/**返回 */
	protected back() {
		this.hide();
	}


}