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
	}

	private tabChange() {
		this.mallLst.dataProvider = new eui.ArrayCollection([]);
		switch (this.mallTab.selectedIndex) {
			case MallType.Diamond:
				//钻石商城
				if (ProtocolHttp.rev_DiamondsMall.diamonds_mall.length > 0) {
					this.mallLst.dataProvider = new eui.ArrayCollection(ProtocolHttp.rev_DiamondsMall.diamonds_mall);
				} else {
					this.showMall(MallType.Diamond);
				}
				
				break;
			case MallType.Gold:
				//金币商城
				if (ProtocolHttp.rev_GoldMall.gold_mall.length > 0) {
					this.mallLst.dataProvider = new eui.ArrayCollection(ProtocolHttp.rev_GoldMall.gold_mall);
				} else {
					this.showMall(MallType.Gold);
				}
				break;
			case MallType.Ticket:
				if (ProtocolHttp.rev_TicketMall.ticket_mall.length > 0) {
					this.mallLst.dataProvider = new eui.ArrayCollection(ProtocolHttp.rev_TicketMall.ticket_mall);
				} else {
					this.showMall(MallType.Ticket);
				}
				break;

			default:
				break;
		}
	}

	public updateDiamond() {
		let diamonds = ProtocolHttp.rev_DiamondsMall.diamonds_mall;
		//钻石商品列表
		for (var i = 0; i < diamonds.length; i++) {
			diamonds[i]["num"] = diamonds[i]["diamonds"] + "钻石";
			diamonds[i]["price"] = "￥ " + diamonds[i]["rmb"];
			diamonds[i]["icon"] = "diamond" + (i + 1) + "_png";
			diamonds[i]["type"] = MallType.Diamond;
		}

		this.mallLst.dataProvider = new eui.ArrayCollection(diamonds);
		this.mallTab.selectedIndex = MallType.Diamond;
	}

	public updateGold() {
		let golds = ProtocolHttp.rev_GoldMall.gold_mall;
		for (var i = 0; i < golds.length; i++) {
			golds[i]["num"] = golds[i]["gold"] + "金币";
			golds[i]["price"] = golds[i]["price"];
			golds[i]["icon"] = "Gold" + (i + 1) + "_png";
			golds[i]["type"] = MallType.Gold;
		}

		this.mallLst.dataProvider = new eui.ArrayCollection(golds);
		this.mallTab.selectedIndex = MallType.Gold;
	}

	public updateTicket() {
		let tickets = ProtocolHttp.rev_TicketMall.ticket_mall;
		for (var i = 0; i < tickets.length; i++) {
			tickets[i]["num"] = tickets[i]["num"] + "张房卡";
			tickets[i]["icon"] = "fk" + (i + 1) + "_png";
			tickets[i]["type"] = MallType.Ticket;
		}
		this.mallLst.dataProvider = new eui.ArrayCollection(tickets);
		this.mallTab.selectedIndex = MallType.Ticket;
	}

	protected onEnable() {
		this.setCenter();

		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		this.mallTab.addEventListener(egret.Event.CHANGE, this.tabChange, this);
	}

	public showMall(type) {
		this.mallType = type;
		let ctrl = App.getController(HallController.NAME) as HallController;
		switch (type) {
			case MallType.Diamond:
				ctrl.sendDiamondsMall();
				break;
			case MallType.Gold:
				ctrl.sendGoldMall();
				break;
			case MallType.Ticket:
				ctrl.sendTicketMall();
				break;

			default:
				break;
		}
	}

	protected onRemove() {
		this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		this.mallTab.removeEventListener(egret.Event.CHANGE, this.tabChange, this);

		this.mallLst.dataProvider = new eui.ArrayCollection([]);
	}
}

enum MallType {
	Diamond,
	Gold,
	Ticket
}