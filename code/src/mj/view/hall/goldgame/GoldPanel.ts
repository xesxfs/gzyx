class GoldPanel extends BasePanel {
	public backBtn: eui.Button;

	public constructor() {
		super();
		this.skinName = "GoldPanelSkin";
	}
	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.backBtn.addEventListener("touchTap", this.hide, this);
	}

	/**从场景中移除*/
	protected onRemove() {
		this.backBtn.removeEventListener("touchTap", this.hide, this);

	}
}