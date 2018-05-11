/**
 * 当前出牌指示
 * @author chen
 * @date 2016/7/21
 */
class OutFlagUI extends egret.Bitmap {
	private moveDist: number = -10;  //移动距离
	private bInitRes: boolean = false;

	public constructor() {
		super();

	}

	private initRes() {
		if (this.bInitRes == false) {
			this.bInitRes = true;
			this.bitmapData = RES.getRes("tin_jiant_png");
			console.log("bitmapData:", this.bitmapData);
		}
	}

	/**
	 * 指示器悬浮在指定的牌上方
	 * @param card 指定的牌
	 * @param doc 指示器父容器
	 */
	public show(card: Card, pos: UserPosition) {
		this.initRes();
		console.log("out flag ", pos);
		if (pos == UserPosition.R) {
			//			this.x = card.x + (card.width - this.width)/2 - card.width;
			this.x = card.x + (card.width - this.width) / 2;
			this.y = card.y - card.height + 5;
		} else if (pos == UserPosition.L) {
			this.x = card.x + (card.width - this.width) / 2;
			this.y = card.y - card.height + 5;
		} else {
			this.x = card.x + (card.width - this.width) / 2;
			this.y = card.y - card.height / 2;
		}
		this.start();
	}

	//开始上下移动的动画
	public start() {
		var yPos = this.y;
		egret.Tween.removeTweens(this);
		egret.Tween.get(this, { loop: true }).to({ y: yPos + this.moveDist }, 500).to({ y: yPos }, 500);
	}

	//停止移动动画
	public stop() {
		egret.Tween.removeTweens(this);
	}

	public hide() {
		this.stop();
		this.parent && this.parent.removeChild(this);
	}
}