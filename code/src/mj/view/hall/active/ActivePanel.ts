class ActivePanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "ActivePanelSkin";
	}
	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
	}

	/**从场景中移除*/
	protected onRemove() {

	}
}