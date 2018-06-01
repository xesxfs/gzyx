class GameChatPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "GameChatPanelSkin";
	}

	public chatTab: eui.TabBar;
	public emojiLst: eui.List;
	public wzLst: eui.List;
	public sendBtn: how.Button;
	public txtChat: eui.EditableText;

	protected childrenCreated() {
		let emojiArr = [];
		for (var i = 1; i <= 27; i++) {
			let obj = { "emoji": "dou_lt_bq_" + i +"_png" };
			emojiArr.push(obj);
		}

		let wzArr = [
			{ "wz": "大家好，很高兴见到各位!" },
			{ "wz": "快点吧,我等到花儿都谢了!" },
			{ "wz": "不要走，决战到天亮!" },
			{ "wz": "你是帅哥还是美女啊?" },
			{ "wz": "君子报仇，十年不算晚!" },
			{ "wz": "不要意思，我有事要先走一会了!" },
			{ "wz": "家里是开银行的吧!" },
			{ "wz": "今天真高兴!" },
			{ "wz": "你的牌打的太好了!" },
			{ "wz": "你放炮，我不胡!" },
			{ "wz": "你手气真的太好了!" },
			{ "wz": "你太牛哦!" },
		];

		this.emojiLst.dataProvider = new eui.ArrayCollection(emojiArr);
		this.wzLst.dataProvider = new eui.ArrayCollection(wzArr);
	}

	private changeHandler(evt: egret.Event) {
		switch (evt.target) {
			case this.emojiLst:
				this.ctrl.sendChat(CHAT_TYPE.Face, this.emojiLst.selectedIndex + 1);
				break;
			case this.wzLst:
				this.ctrl.sendChat(CHAT_TYPE.Common, this.wzLst.selectedIndex);
				break;

			default:
				break;
		}

		this.hide();
	}

	private onTouch(evt:egret.TouchEvent) {
		switch (evt.target) {
			case this.sendBtn:
				let txt = StringTool.trim(this.txtChat.text);
				if (txt == "") {
					Tips.info("请输入聊天内容");
					return;
				}
				this.ctrl.sendChat(CHAT_TYPE.Text, txt);
			break;
		
			default:
				break;
		}
	}

	private get ctrl():GameController {
		return App.getController(GameController.NAME) as GameController
	}

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.emojiLst.addEventListener(egret.Event.CHANGE, this.changeHandler, this)
		this.wzLst.addEventListener(egret.Event.CHANGE, this.changeHandler, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	/**从场景中移除*/
	protected onRemove() {
		this.emojiLst.removeEventListener(egret.Event.CHANGE, this.changeHandler, this);
		this.wzLst.removeEventListener(egret.Event.CHANGE, this.changeHandler, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}
}