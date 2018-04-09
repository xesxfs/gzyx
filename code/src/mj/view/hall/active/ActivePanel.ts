class ActivePanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "ActivePanelSkin";
	}

	public activeTab: eui.TabBar;
	public activeVsk: eui.ViewStack;
	public rechargeLab: eui.Label;
	public rechargeLst: eui.List;
	public lotteryLab: eui.Label;
	public lotteryBtn: eui.Button;
	public heroLab: eui.Label;
	public heroTaskLst: eui.List;
	public closeBtn: eui.Button;

	protected childrenCreated() {

	}

	public update() {
		let data = ProtocolHttp.rev_RechargeTaskList;
		this.rechargeLab.text = data.recharge_num.toString();
		this.lotteryLab.text = data.lottery_count.toString();

		let reward = [];
		//组装充值任务数据
		data.task_list.forEach((element) => {
			element["task_name"] = element["price"] + "元";

			reward = element["reward_list"];
			// 获取数量
			element["num"] = reward.length > 0 ? reward[0]["num"] : "0";
		});

		this.rechargeLst.itemRenderer = ActiveItem;
		this.rechargeLst.dataProvider = new eui.ArrayCollection(data.task_list);
	}

	private onTabChange() {
		this.activeVsk.selectedIndex = this.activeTab.selectedIndex;
	}

	// 查询英雄令任务列表
	private requestYingXiong() {
		var httpsend = new HttpSender();
		var taskData = ProtocolHttp.send_TaskList;
		taskData.param.uid = App.DataCenter.UserInfo.selfUser.userID;
		httpsend.send(taskData, this.revYingXiong, this);
	}

	private revYingXiong(rev: any) {
		if (rev) {
			ProtocolHttp.rev_TaskList = rev.data;

			// 更新英雄令页面的数据
			let data = ProtocolHttp.rev_TaskList;
			if (!data.task_list) data.task_list = [];
			data.task_list.forEach((element) => {
				// limit: 0,//	integer	该任务每日可完成的次数
				// finished: 0, //	integer	该任务每日已经完成的次数

				if (!element["finished"]) element["finished"] = "0";
				if (!element["unclaimed"]) element["unclaimed"] = "0";

				element["num"] = element["finished"] + " / " + element["limit"];
			})
			this.heroLab.text = data.hero_count.toString();
			this.heroTaskLst.itemRenderer = ActiveItem2;
			this.heroTaskLst.dataProvider = new eui.ArrayCollection(data.task_list);
		}
	}

	private onTouch() {
		if (parseInt(this.lotteryLab.text) == 0) {
			let box = App.MsgBoxManager.getBoxB();
			box.showMsg("物品不足")
			return;
		}
	}

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.update();

		this.activeVsk.selectedIndex = 0;
		this.activeTab.addEventListener(egret.Event.CHANGE, this.onTabChange, this);
		this.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);

		this.requestYingXiong();
	}

	/**从场景中移除*/
	protected onRemove() {
		this.activeTab.removeEventListener(egret.Event.CHANGE, this.onTabChange, this);
		this.lotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
	}
}

//任务类型
enum TaskType {
	Daily = 1,				//每日任务
	RECHARGE = 2,			//充值任务
}