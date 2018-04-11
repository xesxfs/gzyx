class ActiveTip extends BasePanel {
	public constructor() {
		super();
		this.skinName = "ActiveTipSkin";
	}

	public circleImg: eui.Image;
	public goldLab: eui.Label;

	public init(num:number) {
		//光背景一直转动
		egret.Tween.get(this.circleImg, { loop: true }).to({ rotation: 360 }, 500);

		this.goldLab.text = "+" + num.toString();

		egret.setTimeout(this.onRemove, this, 6000);
	}

	protected onRemove() {
		egret.Tween.removeTweens(this.circleImg);
		App.PopUpManager.removePopUp(this);
	}
}