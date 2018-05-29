class BindFriendPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "BindFriendSkin";
	}

	public submitBtn: how.Button;
	public cancelBtn: how.Button;
	public closeBtn: how.Button;
	public txtUid: eui.EditableText;

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.cancelBtn:
			case this.closeBtn:
				this.hide();
				break;
			case this.submitBtn:
				this.onSubmit();
				break;

			default:
				break;
		}
	}

	private onSubmit() {
		let uid = StringTool.trim(this.txtUid.text);
		if (uid == "") {
			Tips.info("请填写好友的UID");
			return;
		}

		(App.getController(HallController.NAME) as HallController).sendBindFriend(uid);
	}

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	/**从场景中移除*/
	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.txtUid.text = "";
	}
}