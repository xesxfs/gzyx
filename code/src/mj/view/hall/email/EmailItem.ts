/**
 *	邮件item
 * @author eyanlong
 *  2017/02/23
 */
class EmailItem extends eui.ItemRenderer {
	public titleBtn:eui.ToggleButton;

	public constructor() {
		super();
		this.skinName = "EmailItemSkin";
	}

	public dataChanged(): void {

	}

	protected childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(e: egret.TouchEvent) {
		this.titleBtn.selected = true;
		App.EventManager.sendEvent(EventConst.ShowMail, this.data);
	}
}
