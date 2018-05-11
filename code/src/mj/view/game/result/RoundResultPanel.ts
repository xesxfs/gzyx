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
			let playInfo = ProtocolData.player_result_info
			playInfo = playInfos[i];
			item.setHead(playInfo.avater_url);
			item.uidLab.text = playInfo.uid.toString();
			item.nickNameLab.text = playInfo.nick_name;
			item.scoreLab.text = playInfo.score.toString();
			item.card_typeImg.source = playInfo.card_type.toString() + "_png";
			/**赢家 */
			if (playInfo.cur_end_flag == 2) {
				item.end_typeImg.source = "end_type" + data.end_type.toString() + "_png"
			} else {
				item.end_typeImg.visible = false;
			}
			let fj = new eui.Label("翻牌鸡         " + playInfo.fangpaiji_num + "  分");
			let gj = new eui.Label("固定鸡         " + playInfo.gudingji_num_out + "  分");
			let cj = new eui.Label("冲锋鸡         " + playInfo.chongfengji_num + "  分");

			let labs: eui.Label[] = [fj, gj, cj];
			for (let i = 0; i < labs.length; i++) {
				labs[i].x = 17
				labs[i].y = 200 + i * labs[i].height + 18;
				item.addChild(labs[i]);
			}


		}
	}
}