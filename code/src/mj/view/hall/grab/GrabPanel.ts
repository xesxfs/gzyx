class GrabPanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "GrabPanelSkin";
	}

	public addDiaBtn: how.Button;
	public coinLab: eui.Label;
	public addGrabBtn: how.Button;
	public grabLab: eui.Label;
	public backBtn: how.Button;
	public baner0: eui.Image;
	public baner1: eui.Image;
	public maskImg: eui.Image;
	public prevBtn: how.Button;
	public nextBtn: how.Button;
	public icon0: eui.Image;
	public icon1: eui.Image;
	public commodityLst: eui.List;
	public bankGrp: eui.Group;
	public recordGrp: eui.Group;

	protected childrenCreated() {
		this.bankGrp.mask = this.maskImg;
		this.recordLab.mask = this.maskRet;
		this.commodityLst.itemRenderer = GrabItem;
	}

	protected onEnable() {
		this.setCenter();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.initEffect();
		this.initData();
	}

	private _delay: number;
	private initEffect() {
		this._delay = egret.setInterval(this.moveBaner, this, 4000);
	}

	private moveBaner() {
		this.prevBtn.enabled = this.nextBtn.enabled = false;
		if (this.bankGrp.x == 0) {
			egret.Tween.get(this.bankGrp).to({ x: -671 }, 800, egret.Ease.backOut).call(() => {
				this.icon0.source = "lbt_otherd_png";
				this.icon1.source = "lbt_curd_png";
				this.prevBtn.enabled = this.nextBtn.enabled = true;
			});
		} else {
			egret.Tween.get(this.bankGrp).to({ x: 0 }, 800, egret.Ease.backOut).call(() => {
				this.icon0.source = "lbt_curd_png";
				this.icon1.source = "lbt_otherd_png";
				this.prevBtn.enabled = this.nextBtn.enabled = true;
			});
		}
	}

	private clearEffect() {
		egret.clearInterval(this._delay);
		this._delay = null;
		this.bankGrp.x = 0;
	}

	public initData() {
		let data = ProtocolHttp.rev_QuicklyGrab.match_infos;
		this.commodityLst.dataProvider = new eui.ArrayCollection(data);
		this.coinLab.text = App.DataCenter.UserInfo.selfUser.coin.toString();
		this.grabLab.text = "0";

		this.ctrl.sendQuicklyGrabTicket();
		this.ctrl.sendQuicklyGrabRecord();
	}

	public updateGrabTick() {
		let data = ProtocolHttp.rev_QuicklyGrabTicket.grab_info;
		this.grabLab.text = data["count"];
	}

	public recordLab: eui.Label;
	public maskRet: eui.Rect;
	private _recordDelay: number;
	public updateGrabRecord() {
		this.recordLab.y = this.maskRet.height / 2;
		let data = ProtocolHttp.rev_QuicklyGrabRecord.grab_record;
		let record = <Array<egret.ITextElement>>[];
		var contentTextStyleJson = { "size": 18, "textColor": 0xF7EE79, "fontFamily": "微软雅黑" }
		data.forEach(element => {
			record.push({ text: element["nickname"] + "抢到了\n" + element["match_name"] + " \n", style: contentTextStyleJson });
		});
		this.recordLab.textFlow = record;
		this.recordLab.alpha = 0;

		egret.Tween.get(this.recordLab).to({ alpha: 1 }, 1000);
		this._recordDelay = egret.setInterval(this.recordMove, this, 1500);
	}

	private recordMove() {
		if (this.recordLab.y <= -this.recordLab.height) {
			this.recordLab.y = this.maskRet.height;
		}
		// this.recordLab.y -= 10;
		egret.Tween.get(this.recordLab).to({ y: this.recordLab.y - 56 }, 800);
	}

	private clearMove() {
		egret.clearInterval(this._recordDelay);
		this._recordDelay = null;
		this.recordLab.textFlow = null;
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.backBtn:
				this.hide();
				break;
			case this.prevBtn:
			case this.nextBtn:
				this.moveBaner();
				break;
			case this.addDiaBtn:
				(App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Diamond);
				break;
			case this.addGrabBtn:
				this.buyGrab();
				break;

			default:
				break;
		}
	}

	/** 钻石购买快抢赛次数 */
	private buyGrab() {
		let grabInfo = ProtocolHttp.rev_QuicklyGrabTicket.grab_info;
		if (grabInfo["next_recharge"] == -1) {
			Tips.info("今日已经不能购买了");
			return;
		}
		let msg = "今日第" + grabInfo["charge_count"] + "次购买快抢赛次数，本次购买消耗" + grabInfo["next_recharge"] + "钻石，确定购买吗？";

		App.MsgBoxManager.getBoxA().showMsg(msg, () => {
			this.ctrl.sendExchangeTicket();
		}, this);
	}

	private get ctrl(): HallController {
		return App.getController(HallController.NAME) as HallController;
	}

	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.clearEffect();
		this.clearMove();
		egret.Tween.removeTweens(this.recordLab);
	}
}