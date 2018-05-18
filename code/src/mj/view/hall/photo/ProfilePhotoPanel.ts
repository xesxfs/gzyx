class ProfilePhotoPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "ProfilePhotoSkin"
	}
	public photoGroup: eui.Group;
	public closeBtn: how.Button;


	protected onEnable() {
		this.setCenter();
		this.photoGroup.addEventListener("touchTap", this.onSelectPhoto, this);
		this.closeBtn.addEventListener("touchTap", this.hide, this);
	}

	private onSelectPhoto(e: egret.TouchEvent) {
		if (e.target instanceof eui.Image) {
			this.photoGroup.getChildIndex(e.target);
		}
	}

}