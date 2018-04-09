/**
 * 商城界面
 * @author chen 
 * @date 2017/2/21
 */

class MallPanel extends BasePanel {
	public mallTab: eui.TabBar;
	public mallLst: eui.List;
	public mallType: MallType;
	public closeBtn: eui.Button;

	public constructor() {
		super();
		this.skinName = "MallPanelSkin";
	}

	protected childrenCreated() {
		this.mallLst.itemRenderer = MallItem;
		this.mallTab.addEventListener(egret.Event.CHANGE, this.tabChange, this);
	}

	private tabChange() {
		switch (this.mallTab.selectedIndex) {
			case 0:
				//钻石商城
				this.mallLst.dataProvider = new eui.ArrayCollection(ProtocolHttp.rev_DiamondsMall.diamonds_mall);
				break;
			case 1:
				//金币商城
				this.mallLst.dataProvider = new eui.ArrayCollection(ProtocolHttp.rev_GoldMall.gold_mall);
				break;

			default:
				break;
		}
	}

	private updateDiamond() {
		let diamonds = ProtocolHttp.rev_DiamondsMall.diamonds_mall;
		//钻石商品列表
		for (var i = 0; i < diamonds.length; i++) {
			diamonds[i]["num"] = diamonds[i]["diamonds"] + "钻石";
			diamonds[i]["price"] = "￥ " + diamonds[i]["rmb"];
			diamonds[i]["icon"] = "diamond" + (i + 1) + "_png";
		}

		if (this.mallType == MallType.Diamond) {
			this.mallLst.dataProvider = new eui.ArrayCollection(diamonds);
			this.mallTab.selectedIndex = MallType.Diamond;
		}
	}

	// 请求金币商城列表
	private requestGoldMall() {
		var httpsend = new HttpSender();
		var request = ProtocolHttp.send_GoldMall;
		httpsend.send(request, this.revGoldMall, this);
	}

	private revGoldMall(rev: any) {
		if (rev.data) {
			ProtocolHttp.rev_GoldMall = rev.data;

			let golds = ProtocolHttp.rev_GoldMall.gold_mall;
			for (var i = 0; i < golds.length; i++) {
				golds[i]["num"] = golds[i]["gold"] + "金币";
				golds[i]["price"] = golds[i]["price"];
				golds[i]["icon"] = "Gold" + (i + 1) + "_png";
				golds[i]["isG"] = true;
			}

			if (this.mallType == MallType.Gold) {
				this.mallLst.dataProvider = new eui.ArrayCollection(ProtocolHttp.rev_GoldMall.gold_mall);
				this.mallTab.selectedIndex = MallType.Gold;
			}
		}
	}

	protected onEnable() {
		this.setCenter();

		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
	}

	public update(type) {
		this.mallType = type;

		this.updateDiamond();
		this.requestGoldMall();
	}

	protected onRemove() {
		this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
	}
}

enum MallType {
	Diamond,
	Gold,
}