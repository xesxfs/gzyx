// 累计充值任务
class ActiveItem extends eui.ItemRenderer {
	constructor() {
		super()
		this.skinName = "ActiveItemSkin";
	}

	public receiveBtn: eui.Button;

	protected childrenCreated() {
		this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch() {
		//完成充值任务
		var httpsend = new HttpSender();
		var req = ProtocolHttp.send_FinishTask;
		req.param.task_id = this.data["task_id"];
		req.param.uid = App.DataCenter.UserInfo.selfUser.userID;
		req.param.type = TaskType.RECHARGE;
		httpsend.send(req, this.revFinishTask, this);

		this.receiveBtn.enabled = false;
	}

	private revFinishTask(rev: any) {
		//获取当前任务id的奖品信息,更新页面
		ProtocolHttp.rev_FinishTask = rev.data;
		ProtocolHttp.rev_FinishTask.task_info.forEach((element) => {
			if (element["task_id"] == this.data["task_id"]) {
				let reward = element["reward_list"];
				if (reward && reward.length > 0) {
					this.data["num"] = reward[0]["num"];
					this.data["is_finish"] = 3;
					this.validateNow();
				}
			}
		})
	}

	protected dataChanged() {
		super.dataChanged();

		// is_finish: 0,//	integer	1.已经领取 2.等待领取 3.没资格领取
		this.receiveBtn.enabled = this.data["is_finish"] == 2 ? true : false;
	}
}