// 大厅金币排行榜显示
class HallRankingPanel extends BasePanel {
	public constructor() {
		super();
	}

	protected childrenCreated() {
		this.rankLst.itemRenderer = RankingItem;
	}

	public rankLst: eui.List;

	public update() {
		let data = ProtocolHttp.rev_Rank.data
		//没头像的替换默认头像
		for (let index in data) {
			if (data[index]["avater_url"] == "") data[index]["avater_url"] = "img_default_png"
		}
		this.rankLst.dataProvider = new eui.ArrayCollection(data);
	}
}

// 排行榜列表item
class RankingItem extends eui.ItemRenderer {
	constructor() {
		super();
		this.skinName = "RankingItemSkin"
	}

	public maskImg: eui.Image;
	public headImg: eui.Image;
	public iconImg: eui.Image;
	public numLab: eui.Label;

	protected dataChanged(): void {
		super.dataChanged();

		let num = this.itemIndex + 1;
		if (num <= 3) {
			// 显示排名图标
			this.iconImg.source = "img_rank" + num + "_png";
			this.iconImg.visible = true;
		} else {
			//显示排名数字
			this.numLab.text = num.toString();
			this.numLab.visible = true;
		}
	}

	protected childrenCreated() {
		//设置头像遮罩
		this.headImg.mask = this.maskImg;
	}
}