class GrabItem extends eui.ItemRenderer {
	public constructor() {
		super();
		this.skinName = "GrabItemSkin";
	}

	protected childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch() {
		if (this.data["status"] == MatchStatus.Started) {
			let data = ProtocolData.Send102;
			data.uid = App.DataCenter.UserInfo.selfUser.userID;
			data.match_id = this.data["id"];
			ProtocolHttp.rev_ServerList.server_list.forEach((element) => {
				if (element["server_flag"] == 3000001) {
					// 快抢赛
					(App.getController(HallController.NAME) as HallController).sendJoinRoom(data, element["server_ip"] + ":" + element["websocket_port"]);
				}
			})
		}
	}
}

enum MatchStatus {
	Disabled,
	Tobein,
	Started
}