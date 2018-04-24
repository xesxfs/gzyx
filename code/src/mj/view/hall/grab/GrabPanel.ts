class GrabPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "GrabPanelSkin";
	}

	public addDiaBtn: how.Button;
	public coinLab: eui.Label;
	public addGoldBtn: how.Button;
	public goldLab: eui.Label;
	public backBtn: eui.Button;

	protected onEnable() {
		this.setCenter();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.backBtn:
				this.hide();
				break;

			default:
				break;
		}
	}

	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}
}