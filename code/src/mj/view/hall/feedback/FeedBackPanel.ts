class FeedBackPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "FeedbackSkin";
	}

	public submitBtn: how.Button;
	public cancelBtn: how.Button;
	public closeBtn: how.Button;
	public titleTxt: eui.EditableText;
	public contentTxt: eui.EditableText;

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
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
		let title: string = StringTool.trim(this.titleTxt.text);
		if (title == "") {
			Tips.info("请输入标题");
			return;
		}
		let content: string = StringTool.trim(this.contentTxt.text);
		if (content == "") {
			Tips.info("请输入正文内容");
			return;
		}

		(App.getController(HallController.NAME) as HallController).sendCreateFeedback(title, content);
	}

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	/**从场景中移除*/
	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.contentTxt.text= "";
		this.titleTxt.text = "";
	}
}