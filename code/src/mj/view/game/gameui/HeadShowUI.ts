

class HeadShowUI extends eui.Component {
	public constructor() {
		super();
	}
	public readyGroup: eui.Group;
	public headGroup: eui.Group;
	public chatTxtGroup: eui.Group;
	public chatEmojiGroup: eui.Group;

	public bMove: boolean = false;
	private headList: Array<HeadUI>;
	private emojiMcFactory: egret.MovieClipDataFactory;
	private emojis: egret.MovieClip[] = [];
	private chatShowTime: number = 2000;

	protected childrenCreated() {
		this.init();
	}

	private init() {
		this.headList = [];
		var resName = "chat_emoji"
		var data = RES.getRes(resName + "_json");
		var img = RES.getRes(resName + "_png");
		this.emojiMcFactory = new egret.MovieClipDataFactory(data, img);
		let mcData = this.emojiMcFactory.generateMovieClipData("emoji");

		let len = this.headGroup.numChildren;
		for (let i = 0; i < len; i++) {
			let head = this.headGroup.getChildAt(i) as HeadUI;
			this.headList.push(head);
		}

		for (let i = 0; i < 4; i++) {
			let mc = new egret.MovieClip(mcData);
			mc.frameRate = 8;
			this.emojis.push(mc);
		}
	}

	/** 设置更新头像信息*/
	public updateUserHead(user: UserVO) {
		let pos = CardLogic.getInstance().changeSeat(user.seatID);
		var headUI = this.headList[pos];
		headUI.update(user);
	}

	public showZhuang(pos: UserPosition) {
		for (let i = 0; i < 4; i++) {
			var headUI = this.headList[i];
			headUI.headzhuang.visible = false;
			if (pos == i) {
				headUI.headzhuang.visible = true;
			}
		}
	}

	/**隐藏玩家头像*/
	public hideHeadUI(pos: UserPosition) {
		var headUI: HeadUI = this.headList[pos];
		headUI.reset();
	}

	/**清理所有玩家头像UI*/
	public hideAllHeadUI() {
		var len = this.headList.length;
		var headUI: HeadUI;
		for (var i = 0; i < len; i++) {
			headUI = this.headList[i];
			headUI.reset();
		}
	}

	public showTxt(txt: string, pos: UserPosition) {
		let show = (this.chatTxtGroup.getChildAt(pos) as eui.Group).getChildAt(1) as eui.Label;
		/**加空格对齐 */
		show.text = txt + "  ";
		this.chatTxtGroup.getChildAt(pos).visible = true;
		egret.Tween.removeTweens(show);
		egret.Tween.get(show).wait(this.chatShowTime).call(() => { this.chatTxtGroup.getChildAt(pos).visible = false; });
	}

	public showEmoji(emoji: string, pos: UserPosition) {
		let mc = this.emojis[pos];
		mc.gotoAndPlay(emoji, 4);
		let show = this.chatEmojiGroup.getChildAt(pos) as eui.Group;
		show.addChild(mc);
		egret.setTimeout(this.emojiCallBack, this, this.chatShowTime, mc);

	}

	private emojiCallBack(mc: egret.MovieClip) {
		mc && mc.stop();
		mc.parent && mc.parent.removeChild(mc);
	}


	/**显示准备图标*/
	public showReady(pos: UserPosition) {
		let ready = this.readyGroup.getChildAt(pos);
		if (!ready.visible) {
			ready.visible = true;
			EffectUtils.showMax2Min(ready);
		}
	}

	/***隐藏准备图标*/
	public hideReady(pos: UserPosition) {

	}

	public hideAllReady() {
		for (let i = 0; i < this.readyGroup.numChildren; i++) {
			this.readyGroup.getChildAt(i).visible = false;
		}
	}

}
