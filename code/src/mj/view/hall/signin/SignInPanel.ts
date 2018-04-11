/**
 * 签到界面
 * @author huanglong
 * 2017/3/17
 */
class SignInPanel extends BasePanel {
	public week0Img: eui.Image;
	public week1Img: eui.Image;
	public week2Img: eui.Image;
	public week3Img: eui.Image;
	public week4Img: eui.Image;
	public week5Img: eui.Image;
	public week6Img: eui.Image;
	public yearMonthLab: eui.Label;
	public signBtn: eui.Button;
	public day0Lab: eui.Label;
	public day1Lab: eui.Label;
	public day2Lab: eui.Label;
	public day3Lab: eui.Label;
	public day4Lab: eui.Label;
	public monthGrp: eui.Group;
	public nowImg: eui.Image;
	public box0Btn: eui.ToggleButton;
	public box1Btn: eui.ToggleButton;
	public box2Btn: eui.ToggleButton;
	public box3Btn: eui.ToggleButton;
	public box4Btn: eui.ToggleButton;
	public closeBtn: eui.Button;

	public constructor() {
		super();
		this.skinName = "SignInPanelSkin";
	}

	protected childrenCreated() {
		this.initMonthlyCalendar();
	}

	/**添加到场景中*/
	protected onEnable() {
		this.setCenter();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	/**从场景中移除*/
	protected onRemove() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(evt: egret.TouchEvent) {
		switch (evt.target) {
			case this.signBtn:
				var httpsend = new HttpSender();
				var request = ProtocolHttp.send_SignIn;
				httpsend.send(request, this.revSignIn, this);
				break;
			case this.closeBtn:
				this.hide();
				break;

			default:
				break;
		}

	}

	private revSignIn(rev: any) {
		if (rev.data) {
			if (this._focusLab) {
				this.signIcon(this._focusLab.x, this._focusLab.y);
			}
			this.signBtn.enabled = false;
			this.signBtn.label = "已签到";
			ProtocolHttp.rev_SignIn.add_gold = rev.data.add_gold;
			App.EventManager.sendEvent(EventConst.UpdateGold, App.DataCenter.UserInfo.selfUser.gold + ProtocolHttp.rev_SignIn.add_gold);

			let tip = new ActiveTip();
			tip.init(rev.data.add_gold);
			App.PopUpManager.addPopUp(tip)
		}
	}

	private _arr: Array<eui.Label>;
	private initMonthlyCalendar() {
		this._arr = [];
		let lbl: eui.Label;
		let n = 0;
		//生成日历
		for (var i = 0; i <= 42; i++) {
			lbl = new eui.Label();
			lbl.width = 25;
			lbl.textAlign = "right";
			if (i != 0 && i % 7 == 0) n++;
			lbl.x = i % 7 * 65;
			lbl.y = n * 35;
			lbl.textColor = 0x728F9B;
			lbl.size = 20;
			this.monthGrp.addChild(lbl);
			this._arr.push(lbl)
		}
		this.setData()
	}

	private _focusLab;
	private setData() {
		let data = ProtocolHttp.rev_MonthlyCalendar;
		this.yearMonthLab.text = data.year_month;
		// data.sign_in = [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
		let day = 0;
		let lbl: eui.Label;
		for (var i = 0; i < data.month_all_days; i++) {
			day++;
			lbl = this._arr[data.month_first_weekday + i];
			lbl.text = day.toString();

			//标志今天是几号
			if (day == data.day) {
				this.nowImg.x = lbl.x + lbl.width - 22;
				this.nowImg.y = lbl.y - 10;

				//判断今天是否签到了
				if (data.sign_in[i] == 0) {
					this.signBtn.label = "签到";
					this.signBtn.enabled = true;
					//记录需要签到的位置
					this._focusLab = lbl;
				} else {
					this.signBtn.label = "已签";
					this.signBtn.enabled = false;
				}
			}

			//标志签到状态
			if (data.sign_in[i] == 1) {
				this.signIcon(lbl.x, lbl.y);
			}
		}

		//获取已经签到的天数
		let signDay = 0;
		data.sign_in.forEach((n) => {
			if (n == 1) signDay++;
		});

		let btn: eui.ToggleButton;
		//宝箱的状态
		if (data.box_info) {
			for (var i = 0; i < data.box_info.length; i++) {
				btn = this["box" + i + "Btn"];
				if (data.box_info[i]["get_flag"] == 1) {
					btn.enabled = false;
				} else {
					//未领取状态
					if (signDay > data.box_info[i]["id"]) {
						// 达到条件可以领宝箱
						btn.selected = true;
						btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveTouch, this);
						btn.name = "id_" + data.box_info[i]["id"];
					}
				}
				this["day" + i + "Lab"].text = data.box_info[i]["id"] + "天";
			}
		}
	}

	private onReceiveTouch(evt: egret.TouchEvent) {
		let btn: eui.ToggleButton = evt.target;
		btn.enabled = false;
		btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveTouch, this);

		var httpsend = new HttpSender();
		var request = ProtocolHttp.send_RewardBox;
		request.param.box_id = parseInt(btn.name.split("_")[1]);
		httpsend.send(request, this.revRewardBox, this);
	}

	private revRewardBox(rev: any) {
		if (rev.data) {
			ProtocolHttp.rev_RewardBox = rev.data;
			App.EventManager.sendEvent(EventConst.UpdateGold, ProtocolHttp.rev_RewardBox.gold);
			App.EventManager.sendEvent(EventConst.UpdateDiamond, ProtocolHttp.rev_RewardBox.diamonds);
		}
	}

	/** 生成已签到状态的图标 */
	private signIcon(xn, yn) {
		let img = new eui.Image("sgin_img_tab_png");
		img.x = xn - 4;
		img.y = yn - 20;
		this.monthGrp.addChild(img);
	}

	/**返回 */
	private back() {
		this.hide();
	}
}