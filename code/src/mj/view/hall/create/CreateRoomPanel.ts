class CreateRoomPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "CreateRoomPanelSkin";

	}
	public fourRadBtn: eui.RadioButton;
	public okBtn: eui.Button;

	private _clubId: number;
	protected childrenCreated() {

	}

	public initData(clubId) {
		this._clubId = clubId;
	}

	//添加场景
	protected onEnable() {
		this.setCenter();
		// this.okBtn.addEventListener("touchTap", this.onOkBtn, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onOkBtn(e: egret.TouchEvent) {
		let ctrl = App.getController(HallController.NAME) as HallController;
		let data = ProtocolData.Send101
		// data.player_num = 3;
		// data.board_choose = this.fourRadBtn.selected ? 4 : 8;
		data.uid = App.DataCenter.UserInfo.selfUser.userID;
		ctrl.sendOpenRoom(data);
		this.hide();

	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.okBtn:
				this.createRoom();
				break;
			default:
				break;
		}
	}

	private createRoom() {
		let ctrl = App.getController(HallController.NAME) as HallController;
		ctrl.sendCreateRoom(this._clubId, this.fourRadBtn.selected ? 4 : 8, 1);
	}

	//删除场景
	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this._clubId = null;
	}
}