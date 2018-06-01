class GameSetting extends BasePanel {
	public constructor() {
		super();
		this.skinName = "GameSettingSkin";
	}

	public soundHdr: eui.HSlider;
	public musicHdr: eui.HSlider;
	public closeBtn: how.Button;

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.closeBtn:
				this.hide();
				break;

			default:
				break;
		}
	}

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	/**从场景中移除*/
	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}
}