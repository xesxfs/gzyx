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

	public numGroup: eui.Group;
	public resetBtn: how.Button;
	public deleteBtn: how.Button;
	public roomIdGroup: eui.Group;

	protected onEnable() {
		this.setCenter();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.resetBtn:
				this.resetRoomID();
				break;

			case this.deleteBtn:
				this.deleteRoomID();
				break;

			default:
				if (this._focus < 6) {
					let arr = evt.target.name.split("_");
					let lab;
					if (arr && arr[0] == "rNum") {
						lab = this.roomIdGroup.getChildAt(this._focus + 6) as eui.Label;
						lab.text = arr[1];
						this._focus++;
					}

					if (this._focus == 6) {
						// 查询服务器信息，请求进入游戏
						console.log("request");
						
					}
				}

				break;
		}
	}

	private _focus: number = 0;

	private resetRoomID() {
		for (let i = 6; i <= 11; i++) {
			let lab = this.roomIdGroup.getChildAt(i) as eui.Label;
			lab.text = "";
		}

		this._focus = 0;
	}

	private deleteRoomID() {
		if (this._focus > 0) {
			this._focus--;
			let lab = this.roomIdGroup.getChildAt(this._focus + 6) as eui.Label;
			lab.text = "";
		}
	}

	private join() {
		let ctrl = App.getController(HallController.NAME) as HallController;
		let data = ProtocolData.Send102;
		// data.roomid=this.getRoomId();
		ctrl.sendJoinRoom(data);
		this.hide();
	}

	private getRoomId(): number {
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