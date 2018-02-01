/**
 * 吃牌组合
 * @author chenkai
 * @date 2016/7/19
 */
class EatComboUI extends BasePanel {
	private combo3Group: eui.Group;  //组合3Group
	private combo2Group: eui.Group;  //组合2Group
	private combo3List = [];        //组合3的牌组容器
	private combo2List = [];        //组合2的牌组容器
	private cardList = [];          //牌数组
	public passBtn: SelectActBtn;   //过
	public passBtn0: SelectActBtn;
	private bInitRes: boolean = false;

	public constructor() {
		super();
		this.skinName = "EatComboUISkin";
	}

	protected childrenCreated() {
		//初始化鼠标事件
		this.combo3Group.touchEnabled = false;
		this.combo2Group.touchEnabled = false;
		//获取组合容器
		for (var i = 0; i < 2; i++) {
			var group: eui.Group = <eui.Group>this.combo2Group.getChildAt(1 + i);
			group.touchChildren = false;
			this.combo2List.push(group);
		}
		for (var i = 0; i < 3; i++) {
			var group: eui.Group = <eui.Group>this.combo3Group.getChildAt(1 + i);
			group.touchChildren = false;
			this.combo3List.push(group);
		}

		//居中显示
		this.setCenter();
	}

	private initRes() {
		if (this.bInitRes == false) {
			this.bInitRes = true;
			this.passBtn.setNewActSkin(ACT_act.Act_Pass);
			this.passBtn0.setNewActSkin(ACT_act.Act_Pass);
		}
	}

	/**
	 * 显示吃牌组合
	 * @param comboList 吃牌组合列表
	 * @param cardFactory 牌工厂
	 * @param invalX 牌间距
	 */
	public showEatCombo(comboList, cardFactory: CardFactory, invalX: number) {
		this.initRes();
		//显示组合UI
		var len = comboList.length;
		if (len == 2) {
			this.combo2Group.visible = true;
			this.combo3Group.visible = false;
		} else if (len == 3) {
			this.combo2Group.visible = false;
			this.combo3Group.visible = true;
		} else {
			console.error("EatComboUI:吃牌组合数据不正确");
			return;
		}
		console.log(len + "吃牌组合的长度")
		//生成组合牌组
		for (var i = 0; i < len; i++) {
			var cardList = ArrayTool.copyArr(comboList[i]);
			// ArrayTool.sortArr(cardList);
			var cardLen = cardList.length;
			for (var j = 0; j < cardLen; j++) {
				var card: Card = cardFactory.getHandCard(cardList[j], UserPosition.Down);

				if (len == 2) {
					//将牌缩小了0.8
					card.x = -invalX * j * 0.8 + 10;
					card.y = 12;
					card.scaleX = 0.7;
					card.scaleY = 0.7;
					this.combo2List[i].addChild(card);
				} else {
					//将牌缩小了0.8
					card.x = -invalX * j * 0.7 + 10;
					card.y = 10;
					card.scaleX = 0.6;
					card.scaleY = 0.6;
					this.combo3List[i].addChild(card);
				}
				this.cardList.push(card);
			}
		}
		// this.passBtn.playAnim();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.visible=true;
	}

	/**
	 * 显示杠牌组合
	 * @param comboList 杠牌组合列表
	 * @param cardFactory 牌工厂
	 * @param invalX 牌间距
	 */
	public showGangCombo(comboList, cardFactory: CardFactory, invalX: number) {
		this.initRes();
		//显示组合UI
		var len = comboList.length;
		if (len == 2) {
			this.combo2Group.visible = true;
			this.combo3Group.visible = false;
		} else if (len == 3) {
			this.combo2Group.visible = false;
			this.combo3Group.visible = true;
		} else {
			console.error("EatComboUI:杠牌组合数据不正确");
			return;
		}

		//生成组合牌组
		for (var i = 0; i < len; i++) {
			var gangValue = comboList[i];
			for (var j = 0; j < 4; j++) {
				var card: Card = cardFactory.getHandCard(gangValue, UserPosition.Down);

				if (len == 2) {
					card.x = -invalX * 0.6 * j+8;
					card.y = 15;
					card.scaleX = 0.55;
					card.scaleY = 0.55;

					this.combo2List[i].addChild(card);
				} else {
					card.x = -invalX*0.5*j+10;
			        card.y = 20;
					card.scaleX = 0.48;
					card.scaleY = 0.48;
					this.combo3List[i].addChild(card);
				}
				this.cardList.push(card);
			}
		}

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.visible=true;
	}



	private onTouch(e: egret.TouchEvent) {
		if (e.target instanceof eui.Group) {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			var group: eui.Group = e.target;
			if (group.parent == this.combo2Group) {
				var index = this.combo2List.indexOf(group);
			} else if (group.parent == this.combo3Group) {
				var index = this.combo3List.indexOf(group);
			} else {
				console.log("选择吃牌组合时，选择对象不正确");
			}
			this.dispatchEventWith("selectComboEvent", false, index);
			this.hide();
		}
	}



	//清理界面
	public clear() {
		var len = this.cardList.length;
		for (var i = 0; i < len; i++) {
			var card: Card = this.cardList[i];
			card.recycle();
		}
		this.cardList.length = 0;
	}

	public hide() {
		this.parent && this.parent.removeChild(this);
	}
}