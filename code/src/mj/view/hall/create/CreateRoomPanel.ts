class CreateRoomPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "CreateRoomPanelSkin";
	}
	public fourRadBtn: eui.RadioButton;
	public okBtn: eui.Button;


	protected childrenCreated() {

	}

	//添加场景
	protected onEnable() {
		this.setCenter();
		this.okBtn.addEventListener("touchTap", this.onOkBtn, this);
	}

	private onOkBtn(e: egret.TouchEvent) {
		let ctrl = App.getController(HallController.NAME) as HallController;
		let data = ProtocolData.Send101
		data.player_num = 3;
		data.board_choose = this.fourRadBtn.selected ? 4 : 8;
		data.uid=App.DataCenter.UserInfo.selfUser.userID;
		ctrl.sendOpenRoom(data);
		this.hide();

	}


	//删除场景
	protected onRemove() {

	}
}