class CatchChickenPanel extends BasePanel{
	public constructor() {
		super();
		this.skinName = "CatchChickenSkin";
	}

	/**组件创建完毕*/
    protected childrenCreated() {
        
    }

	public update(result:any) {
		let data = ProtocolData.Rev2020;
		data = result;

		//显示中间的鸡牌
		let ji = CardFactory.getInstance().getHandCard(data.fangpaiji_mj, UserPosition.Down);
		ji.x = App.StageUtils.halfStageWidth;
		ji.y = App.StageUtils.halfStageHeight;
		this.addChild(ji);
		EffectUtils.showMax2Min(ji);

		let player = ProtocolData.player_result_info;
		for (let i = 0;i < data.players.length;i ++) {
			player = data.players[i];
			//玩家手中有几个鸡
			for (let j = 0;j < player.cur_fangpaiji_score;j++) {
				let pos = CardLogic.getInstance().changeSeat(player.seatid);
				let grp = this.getChildAt(pos) as eui.Group;
				let card = CardFactory.getInstance().getOutCard(data.fangpaiji_mj_next, pos);
				grp.addChild(card);
				EffectUtils.showMax2Min(card);
			}
		}

		//每个玩家有多少鸡牌
	}

    /**添加到场景中*/
    protected onEnable() {
        
    }

    /**从场景中移除*/
    protected onRemove() {
		
    }
}