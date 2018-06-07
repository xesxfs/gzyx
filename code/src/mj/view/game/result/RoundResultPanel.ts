class RoundResultPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "RoundResultPanelSkin"
	}
	public ksyxBtn: eui.Button;
	public closeBtn: eui.Button;
	public detailBtn: eui.Button;
	public detailData: any;


	protected childrenCreated() {
		this.closeBtn.addEventListener("touchTap", this.hide, this);
		this.ksyxBtn.addEventListener("touchTap", this.hide, this);
		this.detailBtn.addEventListener("touchTap", this.onDetailTap, this);
		for (let i = 0; i < 4; i++) {
			let item = this.getChildAt(i + 3) as RoundResultItem;
			item.visible = false;
		}
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