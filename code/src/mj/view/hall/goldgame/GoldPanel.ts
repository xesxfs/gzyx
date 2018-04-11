class GoldPanel extends BasePanel {
	public backBtn: eui.Button;
	public roomBtn0: how.Button;
	public baseLab0: eui.Label;
	public numLab0: eui.Label;
	public goldLab0: eui.Label;
	public roomBtn1: how.Button;
	public baseLab1: eui.Label;
	public numLab1: eui.Label;
	public goldLab1: eui.Label;
	public roomBtn2: how.Button;
	public baseLab2: eui.Label;
	public numLab2: eui.Label;
	public goldLab2: eui.Label;

	public constructor() {
		super();
		this.skinName = "GoldPanelSkin";
	}

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.initData();
	}

	/**从场景中移除*/
	protected onRemove() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
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

			default:
				break;
		}
	}

	private enterRoom(n: number) {
		// 获取服务器信息
		let arr = ProtocolHttp.rev_ServerList.server_list;
		ProtocolHttp.server_info = arr[n];
		if (arr[n] && ProtocolHttp.server_info.status == 1) {
			App.DataCenter.ServerInfo.GAME_SERVER = "ws://" + ProtocolHttp.server_info.server_ip + ":" + ProtocolHttp.server_info.server_port;
			let data = ProtocolData.Send102;
			data.uid = App.DataCenter.UserInfo.selfUser.userID;
			(App.getController(HallController.NAME) as HallController).sendJoinRoom(data);
		} else {
			Tips.error("服务器已关闭");
		}
	}

	private initData() {
		let arr = ProtocolHttp.rev_ServerList.server_list;

		for (var i = 1; i < arr.length; i++) {
			this["baseLab" + (i - 1)].text = arr[i]["base_gold"];
			this["numLab" + (i - 1)].text = arr[i]["player_num"] + "人";
			this["goldLab" + (i - 1)].text = this.goldRange(arr[i]["min_access"], arr[i]["max_access"]);
		}
	}

	private goldRange(min: number, max: number): string {
		return max == 0 ? NumberTool.formatMoney(min) + "以上" : NumberTool.formatMoney(min) + "-" + NumberTool.formatMoney(max);
	}
}