class ClubRoomItem extends eui.ItemRenderer {
	public constructor() {
		super();
		this.skinName = "ClubRoomItemSkin";
	}

	protected childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch() {
		//点击房间进入游戏
		let ctrl = App.getController(HallController.NAME) as HallController;
		ctrl.sendAddRoom(this.data["password"]);	
	}
}