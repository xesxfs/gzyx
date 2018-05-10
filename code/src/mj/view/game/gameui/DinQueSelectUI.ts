class DinQueSelectUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	public tiaoBtn: eui.Button;
	public tongBtn: eui.Button;
	public wanBtn: eui.Button;


	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.hide();
	}

	private onTouchTap(e: egret.TouchEvent) {
		let dqValue = -1;
		switch (e.target) {
			case this.wanBtn:
				dqValue = 1;
				break;
			case this.tiaoBtn:
				dqValue = 3;
				break;
			case this.tongBtn:
				dqValue = 5;
				break;
		}
		if (dqValue >= 0) {
			(App.getController(GameController.NAME) as GameController).sendDinQue(dqValue);
			this.hide();
		}
	}

	public show() {
		this.visible = true;
	}

	public hide() {
		this.visible = false;
	}

}