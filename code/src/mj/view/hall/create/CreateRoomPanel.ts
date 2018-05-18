class CreateRoomPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "CreateRoomPanelSkin";

	}
	public fourRadBtn: eui.RadioButton;
	public okBtn: eui.Button;
	public num4RabBtn: eui.RadioButton;
	public num3RabBtn: eui.RadioButton;
	public num2RabBtn: eui.RadioButton;

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
		GameInfo.curGameType = GAME_TYPE.RoomCardGame;
		ctrl.sendOpenRoom(data);
		this.hide();

	}
	public cardLab: eui.Label;
	public eightRadBtn: eui.RadioButton;

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.okBtn:
				this.createRoom();
				break;
			case this.fourRadBtn:
				this.cardLab.text = "3张房卡"
				break;
			case this.eightRadBtn:
				this.cardLab.text = "5张房卡"
				break;
			default:
				break;
		}
	}

	private createRoom() {
		let num = 0;
		if (this.num2RabBtn.selected) num = 2;
		if (this.num3RabBtn.selected) num = 3;
		if (this.num4RabBtn.selected) num = 4;
		GameInfo.curGameType = GAME_TYPE.RoomCardGame;
		let ctrl = App.getController(HallController.NAME) as HallController;
		ctrl.sendCreateRoom(this._clubId, num, this.fourRadBtn.selected ? 4 : 8, 1);

		this.hide();
	}

	//删除场景
	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this._clubId = null;
	}
}