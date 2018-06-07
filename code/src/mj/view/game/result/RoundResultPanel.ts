class RoundResultPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "RoundResultPanelSkin"
	}
	public ksyxBtn: eui.Button;
	public closeBtn: eui.Button;
	public detailBtn: eui.Button;
	public detailData: any;

	protected onEnable() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

		for (let i = 0; i < 4; i++) {
			let item = this.getChildAt(i + 3) as RoundResultItem;
			item.visible = false;
		}
	}

	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.closeBtn:
			case this.ksyxBtn:
				App.EventManager.sendEvent(EventConst.ContinueGame);
				this.hide();
				break;
			case this.detailBtn:
				this.onDetailTap();
				break;

			default:
				break;
		}
	}

	protected childrenCreated() {

	}

	private onDetailTap() {
		this.detailData && (App.PanelManager.open(PanelConst.HandDetailPanel) as HandDetailPanel).update(this.detailData);
	}

	public update(mResultData: any) {
		let data = ProtocolData.Rev2020;
		data = mResultData;
		let playInfos = data.players;
		this.detailData = playInfos;
		for (let i = 0; i < playInfos.length; i++) {
			let item = this.getChildAt(i + 3) as RoundResultItem;
			item.visible = true;
			item.update(playInfos[i], data.base_gold);
		}
	}
}