class ClubItem extends eui.ItemRenderer {
	constructor() {
		super();
		this.skinName = "ClubItemSkin";
	}

	public selectImg: eui.Image;

	protected childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch() {
		App.EventManager.sendEvent(EventConst.SelectedClub, this.data);
	}
}