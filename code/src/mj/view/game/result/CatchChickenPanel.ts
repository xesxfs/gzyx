class CatchChickenPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "CatchChickenSkin";
	}
	public zhuaImg: eui.Image;
	public jiImg: eui.Image;

	/**组件创建完毕*/
	protected childrenCreated() {

	}

	public update(result: any) {
		let data = ProtocolData.Rev2020;
		data = result;

		EffectUtils.showMax2Min(this.zhuaImg);
		egret.setTimeout(() => { EffectUtils.showMax2Min(this.jiImg) }, this, 1000);
		egret.setTimeout(() => {
			this.zhuaImg.visible = this.jiImg.visible = false;
			//显示中间的鸡牌
			let ji = CardFactory.getInstance().getHandCard(data.fangpaiji_mj, UserPosition.Down);
			(this.getChildAt(4) as eui.Group).addChild(ji);
			EffectUtils.showMax2Min(ji);
		}, this, 2000);

		let player = ProtocolData.player_result_info;
		for (let i = 0; i < data.players.length; i++) {
			player = data.players[i];
			let delay = 0;
			//玩家手中有几个鸡
			for (let j = 0; j < player.cur_fangpaiji_score; j++) {
				delay += 1000;
				egret.setTimeout(() => {
					let pos = CardLogic.getInstance().changeSeat(player.seatid);
					let grp = this.getChildAt(pos) as eui.Group;
					let card = CardFactory.getInstance().getOutCard(data.fangpaiji_mj_next, pos);
					grp.addChild(card);
					EffectUtils.showMax2Min(card);
				}, this, 3000 + delay);
			}
		}
	}

	/**添加到场景中*/
	protected onEnable() {
		this.zhuaImg.visible = this.jiImg.visible = false;
	}

	/**从场景中移除*/
	protected onRemove() {
		for (let i = 0; i < this.numChildren; i++) {
			if (this.getChildAt(i) instanceof eui.Group) {
				let grp = this.getChildAt(i) as eui.Group;
				for (let j = 0; i < grp.numChildren; i++) {
					let card = grp.getChildAt(0) as Card;
					card.recycle();
				}
			}
		}
	}
}