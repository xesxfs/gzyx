class GoldPanel extends BasePanel {
	public backBtn: eui.Button;
	public roomBtn0: how.Button;
	public roomBtn1: how.Button;
	public roomBtn2: how.Button;
	public maskImg: eui.Image;
	public nameLab: eui.Label;
	public headImg: eui.Image;
	public coinLab: eui.Label;
	public coinBtn: how.Button;
	public goldLab: eui.Label;
	public goldBtn: how.Button;

	public constructor() {
		super();
		this.skinName = "GoldPanelSkin";
	}

	protected childrenCreated() {
		this.headImg.mask = this.maskImg;
		this.initData();
	}

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		App.EventManager.addEvent(EventConst.UpdateGold, this.onUpdateGold, this);
        App.EventManager.addEvent(EventConst.UpdateDiamond, this.onUpdateDiamond, this);
	}

	/**从场景中移除*/
	protected onRemove() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		App.EventManager.removeEvent(EventConst.UpdateGold, this.onUpdateGold, this);
        App.EventManager.removeEvent(EventConst.UpdateDiamond, this.onUpdateDiamond, this);
	}

	//刷新金币信息
    private onUpdateGold(data: any) {
        App.DataCenter.UserInfo.selfUser.gold = data;
        this.goldLab.text = NumberTool.formatMoney(data);
    }

    //刷新钻石信息
    private onUpdateDiamond(data: any) {
        App.DataCenter.UserInfo.selfUser.coin = data;
        this.coinLab.text = data;
    }

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.backBtn:
				this.hide();
				break;
			case this.roomBtn0:
				this.enterRoom(1);
				break;
			case this.roomBtn1:
				this.enterRoom(2);
				break;
			case this.roomBtn2:
				this.enterRoom(3);
				break;
			case this.goldBtn:
				(App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Gold);
				break;
			case this.coinBtn:
				(App.PanelManager.open(PanelConst.MallPanel) as MallPanel).showMall(MallType.Diamond);
				break;

			default:
				break;
		}
	}

	private enterRoom(n: number) {
		// 获取服务器信息
		let arr = ProtocolHttp.rev_ServerList.server_list;
		ProtocolHttp.server_info = arr[n];
		if (arr[n] && ProtocolHttp.server_info.status == 1) {
			let data = ProtocolData.Send102;
			data.uid = App.DataCenter.UserInfo.selfUser.userID;
			// data.roomid = 
			GameInfo.curGameType = GAME_TYPE.GoldGame;
			(App.getController(HallController.NAME) as HallController).sendJoinRoom(data, ProtocolHttp.server_info.server_ip + ":" + ProtocolHttp.server_info.websocket_port);
		} else {
			Tips.error("服务器已关闭");
		}
	}

	private initData() {
		let arr = ProtocolHttp.rev_ServerList.server_list;

		let room: eui.Button;
		let lbl: eui.Label;
		for (var i = 1; i <= 3; i++) {
			room = this["roomBtn" + (i - 1)] as eui.Button;
			lbl = room.getChildAt(6) as eui.Label;
			lbl.text = arr[i]["base_gold"];
			lbl = room.getChildAt(7) as eui.Label;
			lbl.text = arr[i]["player_num"] + "人";
			lbl = room.getChildAt(8) as eui.Label;
			lbl.text = this.goldRange(arr[i]["min_access"], arr[i]["max_access"]);
		}

		let user = App.DataCenter.UserInfo.selfUser;
		this.headImg.source = user.headUrl;
		this.nameLab.text = user.nickName;
		this.coinLab.text = user.coin.toString();
		this.goldLab.text = user.gold.toString();
	}

	private goldRange(min: number, max: number): string {
		return max == 0 ? NumberTool.formatMoney(min) + "以上" : NumberTool.formatMoney(min) + "-" + NumberTool.formatMoney(max);
	}
}