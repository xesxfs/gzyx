class ClubRename extends BasePanel {
	public constructor() {
		super();
		this.skinName = "ClubRenameSkin";
	}
	public closeBtn: eui.Button;
	public okBtn: how.Button;
	public nameTxt: eui.EditableText;

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.closeBtn:
				this.hide();
				break;
			case this.okBtn:
				this.clubRename();
				break;

			default:
				break;
		}
	}

	private clubRename() {
		let cName = StringTool.trim(this.nameTxt.text);
		if (cName == "") {
			Tips.error("请输入俱乐部名称...")
			return;
		}

		(App.PanelManager.getPanel(PanelConst.ClubPanel) as ClubPanel).updateClubRname(cName);
		this.hide();
	}

	/**从场景中移除*/
	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}
}