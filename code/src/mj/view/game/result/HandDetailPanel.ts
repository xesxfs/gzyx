class HandDetailPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "HandDetailPanelSkin";
	}

	protected childrenCreated() {
		this.addEventListener("touchTap", this.hide, this);
		for (let i = 0; i < 4; i++) {
			let item = this.getChildAt(i + 3);
			item.visible = false;
		}
	}

	protected onEnable(){
		this.setCenter();
	}


	public update(playInfos: any[]) {
		for (let i = 0; i < playInfos.length; i++) {
			let item = this.getChildAt(i + 3) as eui.Group;
			item.visible = true;
			let playInfo = ProtocolData.player_result_info
			playInfo = playInfos[i];
			let headImg = item.getChildAt(0) as eui.Image;
			let nickName = item.getChildAt(1) as eui.Label;
			let uidLab = item.getChildAt(2) as eui.Label;
			playInfo.avater_url && (headImg.source = playInfo.avater_url);
			nickName.text = playInfo.nick_name;
			uidLab.text = "ID:" + playInfo.uid;

			let cardGroup = item.getChildAt(3) as eui.Group;
			for (let i = 0; i < playInfo.hole_mjs.length; i++) {
				let value = playInfo.hole_mjs[i];
				let card = CardFactory.getInstance().getOutCard(value, UserPosition.Down);
				cardGroup.addChild(card);
				card.x = i * card.width + 10;
				card.y = (cardGroup.height - card.height);
			}



		}

	}


}