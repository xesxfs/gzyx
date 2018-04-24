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

	protected childrenCreated() {
		this.bankGrp.mask = this.maskImg;
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
		(App.getController(HallController.NAME) as HallController).sendQuicklyGrabTicket();
	}

	public updateGrabTick() {
		let data = ProtocolHttp.rev_QuicklyGrabTicket.grab_info;
		this.grabLab.text = data["count"];
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
				
				break;

			default:
				break;
		}
	}

	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.clearEffect();
	}
}