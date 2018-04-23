class ActivePanel extends BasePanel {
	public constructor() {
		super();
		this.skinName = "ActivePanelSkin";
	}

	public closeBtn: eui.Button;
	public activeTab: eui.TabBar;
	public activeVsk: eui.ViewStack;
	public rechargeLab: eui.Label;
	public rechargeLst: eui.List;
	public lotteryLab: eui.Label;
	public lotteryBox: eui.Group;
	public warpCir: eui.Image;
	public inCir: eui.Image;
	public lotteryBtn: eui.Button;
	public heroLab: eui.Label;
	public heroTaskLst: eui.List;

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

	/** 设置奖品信息 */
	public setGift() {
		
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
		this.requestLotteryInfo();
		this.initLottery();
	}

	/**从场景中移除*/
	protected onRemove() {
		this.activeTab.removeEventListener(egret.Event.CHANGE, this.onTabChange, this);
		this.lotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
	}

	// ****************** 抽奖模块代码 **********************
	private requestLotteryInfo() {
		let ctrl = App.getController(HallController.NAME) as HallController;
		ctrl.sendGetLuckyDraw();
	}

	private deg: number;
	private duration: number;
	public static NUM: number = 10;	//奖品数量
	// 初始化数据
	private initLottery(): void {
		this.deg = 0;
		this.duration = 0;
	}

	// 霓虹灯动画
	private lightAni(): void {

		egret.Tween.get(this.warpCir, { loop: true })
			.set({ source: RES.getRes('wrapcircle_bg2_png') })
			.wait(300)
			.set({ source: RES.getRes('wrapcircle_bg_png') })
			.wait(300);
	}

	private onPostComplete(event?: egret.Event): void {

		// 测试
		let res = JSON.parse('{ "status": 1, "msg": "奖品5", "prize_id": 1, "prize_name": "iphone7" }');

		if (res.status == 1) {
			//目标
			let prize_id = Math.floor(Math.random() * ActivePanel.NUM); // res.prize_id
			prize_id = Math.floor(Math.random() * ActivePanel.NUM);
			this.deg = Math.ceil(Math.random() * 4 + 1) * 360 - prize_id * 360 / ActivePanel.NUM; // 最少 720 -330 最多 5 * 360
			//持续转动时间
			this.duration = this.calcDuration(this.deg);
			console.log("prize_id：", prize_id, "转动角度：", this.deg, "转动时间：", this.duration);
			return this.startTurn(() => { //this.weiUI.showAlert(res.prize_name),this.lotteryDone() 
			}); // 启动转盘
		}
	}

	// 根据角度计算持续时间 deg -> duration
	private calcDuration(deg: number): number {
		return deg * 10;
	}

	// 抽奖动画
	private startTurn(cb: Function): void {
		this.lightAni();
		this.lotteryBtn.touchEnabled = false;
		egret.Tween.get(this.inCir)
			//.to({ rotation: this.inCir.rotation - 20 }, 500, egret.Ease.sineIn)
			.to({ rotation: this.deg }, this.duration, egret.Ease.quartInOut).call(() => {
				this.lotteryBtn.touchEnabled = true;
				//				cb(); // 回调
			});
	}
}

//任务类型
enum TaskType {
	Daily = 1,				//每日任务
	RECHARGE = 2,			//充值任务
}