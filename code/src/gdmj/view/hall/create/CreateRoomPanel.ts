class CreateRoomPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "CreateRoomPanelSkin";
	}

	protected childrenCreated() {

	}

	//添加场景
	protected onEnable() {
		this.setCenter();
	}


	//删除场景
	protected onRemove() {

	}
}