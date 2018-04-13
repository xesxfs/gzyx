class ClubMenu extends BaseUI {
	public constructor() {
		super();
		this.skinName = "ClubMenuSkin";
	}

	public rect: eui.Rect;
	public myClubGrp: eui.Group;
	public changeNameLab: eui.Label;
	public msgLab: eui.Label;
	public dissolveLab: eui.Label;
	public clubGrp: eui.Group;
	public createClubLab: eui.Label;
	public joinClubLab: eui.Label;
	public joinRoomLab: eui.Label;

	protected onEnable() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.changeNameLab:

				break;
			case this.msgLab:

				break;
			case this.dissolveLab:

				break;
			case this.createClubLab:
				(this.parent.parent as ClubPanel).showPanel(PanelType.createClub);
				break;
			case this.joinClubLab:
				(this.parent.parent as ClubPanel).showPanel(PanelType.joinClub);
				break;
			case this.joinRoomLab:

				break;

			default:
				break;
		}

		this.visible = false;
	}

	public showMenu(type: MenuType) {
		if (type == MenuType.myClub) {
			this.clubGrp.visible = false;
			this.myClubGrp.visible = true;
		} else {
			this.clubGrp.visible = true;
			this.myClubGrp.visible = false;
		}
		this.visible = true;
	}
}

enum MenuType {
	/** 操作自己的俱乐部 */
	myClub,
	/** 创建、加入俱乐部 */
	createClub
}