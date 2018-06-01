class CardsShowUI extends eui.Component {
	public constructor() {
		super();
	}
	/**手牌位置 */
	private handlePointList: Array<Array<egret.Point>>;
	/**手牌 */
	private handleList: Array<Array<Card>>;
	/** 拿牌位置*/
	private takePointList: Array<egret.Point>;
	/** 拿牌*/
	private takeList: Array<Array<Card>>;
	/** 当前拿到的牌*/
	public curTakeCard: Card;
	/**当前出的牌*/
	private curOutCard: Card;
	/**出牌位置 */
	private outPointList: Array<Array<egret.Point>>;
	/** 已出牌*/
	private outList: Array<Array<Card>>;
	/**吃碰刚牌位置 */
	private CPGPointList: Array<Array<egret.Point>>;
	/** 吃碰刚牌*/
	public CPGList: Array<Array<Card>>;
	/** 吃碰杠效果的牌位置 */
	public CPGAniPoint: Array<egret.Point>;

	//--------------逻辑--------------
	public cardFactory: CardFactory;      //麻将牌工厂
	public cardLogic: CardLogic;          //麻将牌逻辑
	private playNum: number = 4;			//4人

	//////////////////////////////////////////////////////
	private hand0: eui.Group;
	private hand1: eui.Group;
	private hand2: eui.Group;
	private hand3: eui.Group;

	private out0: eui.Group;
	private out1: eui.Group;
	private out2: eui.Group;
	private out3: eui.Group;

	private eat0: eui.Group;
	private eat1: eui.Group;
	private eat2: eui.Group;
	private eat3: eui.Group;

	public pgGrp: eui.Group;

	/**定位 */
	private rectGroup: eui.Group;
	/**初始化 cardGroups 用*/
	private cardGroup: eui.Group;
	private cardGroups: Array<eui.Group>;

	private bAllowOutCard: boolean;
	private curTouchCard: Card;

	protected childrenCreated() {
		this.cardLogic = CardLogic.getInstance();
		this.cardFactory = CardFactory.getInstance();
		this.initPos();
		this.initAni();
		this.cardGroups[UserPosition.Down].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		this.cardGroups[UserPosition.Down].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDragCardBegin, this);
		this.reset();
		this.rectGroup.visible = false;
	}

	private _pengMc: egret.MovieClip;	//碰到特效
	/** 初始化特效 */
	private initAni() {
		//碰杠效果
		let data = RES.getRes("pg_ani_json");
		let txtr = RES.getRes("pg_ani_png");
		let mcFactory = new egret.MovieClipDataFactory(data, txtr);
		if (mcFactory) {
			this._pengMc = new egret.MovieClip(mcFactory.generateMovieClipData("pg_effect"));
		} else {
			console.log("not find pg_ani");
		}
	}

	private initCardList() {
		this.handleList = [];
		this.outList = [];
		this.CPGList = [];
		for (let i = 0; i < this.playNum; i++) {
			this.handleList[i] = [];
			this.outList[i] = [];
			this.CPGList[i] = [];
		}
	}


	private initPos() {
		this.handlePointList = [];
		this.takePointList = [];
		this.outPointList = [];
		this.cardGroups = [];
		this.CPGPointList = [];
		this.CPGAniPoint = [];
		for (let i = 0; i < this.playNum; i++) {
			this.handlePointList[i] = [];
			this.outPointList[i] = [];
			this.CPGPointList[i] = [];
		}

		var len = this.cardGroup.numChildren;
		for (let i = 0; i < len; i++) {
			var cardgroup = this.cardGroup.getChildAt(i) as eui.Group;
			this.cardGroups.push(cardgroup);
		}

		// 储存吃碰杠效果的牌位置数据
		for (let i = 0; i < this.pgGrp.numChildren; i++) {
			let card = this.pgGrp.getChildAt(i);
			this.CPGAniPoint.push(new egret.Point(card.x, card.y));
			this.pgGrp.removeChild(card);
			card = null;
		}
		this.initDown();
		this.initRight();
		this.initUp();
		this.initLeft();
		this.initCPG();
	}

	/** 初始化吃碰杠的位置数据 */
	private initCPG() {
		for (let i = 0; i < this.playNum; i++) {
			var cpgGroup = this.rectGroup.getChildAt(i + this.playNum * 2) as eui.Group;
			var cpgPosList = this.CPGPointList[i];
			var len = cpgGroup.numChildren;
			for (let i = 0; i < len; i++) {
				var cp = cpgGroup.getChildAt(i);
				var pos = new egret.Point(cp.x, cp.y);
				cpgPosList.push(pos);
			}
		}
	}

	private initDown() {
		var len = this.hand0.numChildren;
		var locateGet = this.hand0.getChildAt(len - 1);						//获取拿牌
		var locateGetPoint = new egret.Point(locateGet.x, locateGet.y);
		this.takePointList.push(locateGetPoint);							//保存拿牌的位置

		for (let i = len - 2; i >= 0; i--) {
			var op = this.hand0.getChildAt(i);								//获取其他手牌的位置
			var p = new egret.Point(op.x, op.y);
			this.handlePointList[0].push(p);
		}

		var out = this.out0
		var olen = out.numChildren;
		var outPointList = this.outPointList[0];
		for (let i = 0; i < olen; i++) {
			var co = out.getChildAt(i);
			var point = new egret.Point(co.x, co.y);
			outPointList.push(point);										//保存发牌的位置数据
		}
	}

	private initRight() {
		var hlen = this.hand1.numChildren;
		var locateGet = this.hand1.getChildAt(0);
		var locateGetPoint = new egret.Point(locateGet.x, locateGet.y);
		this.takePointList.push(locateGetPoint);

		for (let i = 1; i < hlen; i++) {
			var op = this.hand1.getChildAt(i);
			var p = new egret.Point(op.x, op.y);
			this.handlePointList[1].push(p)
		}

		var out = this.out1
		var olen = out.numChildren;
		var outPointList = this.outPointList[1];
		for (let i = 0; i < olen; i++) {
			var co = out.getChildAt(i);
			var point = new egret.Point(co.x, co.y);
			outPointList.push(point);
		}


	}


	private initUp() {
		var len = this.hand2.numChildren;
		var locateGet = this.hand2.getChildAt(len - 1);
		var locateGetPoint = new egret.Point(locateGet.x, locateGet.y);
		this.takePointList.push(locateGetPoint);

		for (let i = 0; i < len - 1; i++) {
			var op = this.hand2.getChildAt(i);
			var p = new egret.Point(op.x, op.y);
			this.handlePointList[UserPosition.Up].push(p)
		}

		var out = this.out2
		var olen = out.numChildren;
		var outPointList = this.outPointList[2];
		for (let i = 0; i < olen; i++) {
			var co = out.getChildAt(i);
			var point = new egret.Point(co.x, co.y);
			outPointList.push(point);
		}

	}

	private initLeft() {
		var len = this.hand3.numChildren;
		var locateGet = this.hand3.getChildAt(len - 1);
		var locateGetPoint = new egret.Point(locateGet.x, locateGet.y);
		this.takePointList.push(locateGetPoint);

		for (let i = 0; i < len - 1; i++) {
			var op = this.hand3.getChildAt(i);
			var p = new egret.Point(op.x, op.y);
			this.handlePointList[3].push(p)
		}

		var out = this.out3
		var olen = out.numChildren;
		var outPointList = this.outPointList[3];
		for (let i = 0; i < olen; i++) {
			var co = out.getChildAt(i);
			var point = new egret.Point(co.x, co.y);
			outPointList.push(point);
		}


	}

	/** 获取某个位置的全部手牌 */
	public getHandleCard(pos: UserPosition): Array<Card> {
		return this.handleList[pos];
	}

	/***生成手牌，并不显示*/
	public createHandCard(plays: any[]) {
		for (let i = 0; i < plays.length; i++) {
			var json = ProtocolData.player_info3;
			json = plays[i];
			var cardList = json.hole_mjs;
			var pos = this.cardLogic.changeSeat(json.seatid);  //获取位置
			var cardListLen = cardList.length;
			for (var j = 0; j < cardListLen; j++) {
				this.pushHandCard(cardList[j], pos);
			}
			this.showHandCard(pos);
		}

	}

	public pushHandCard(cardValue: number, pos: UserPosition) {
		let card = this.cardFactory.getHandCard(cardValue, pos);
		this.handleList[pos].push(card);
	}

	/***显示手牌*/
	public showHandCard(pos: UserPosition) {
		var cardList: Array<Card> = this.handleList[pos];
		var cardPoint: Array<egret.Point> = this.handlePointList[pos];
		var len = cardList.length;
		var card: Card;
		//自己的牌排列手牌 万 条 筒 字
		if (pos == UserPosition.Down) {
			this.cardLogic.sortHandCard(this.handleList[pos]);
		}
		for (var i = 0; i < len; i++) {
			card = cardList[i];
			card.x = cardPoint[i].x;
			card.y = cardPoint[i].y;
			this.cardGroups[pos].addChild(card);
		}
	}

	/**摸牌*/
	public takeCard(pos: UserPosition, cardValue: number) {
		var card: Card
		var tpoint = this.takePointList[pos];
		card = this.cardFactory.getHandCard(cardValue, pos);
		card.x = tpoint.x;
		card.y = tpoint.y;
		// if (pos == UserPosition.R) {
		// 	this.cardGroups[pos].addChildAt(card, 0);
		// } else {
		this.cardGroups[pos].addChild(card);
		// }
		this.curTakeCard = card;
		if (pos == UserPosition.Down) {
			this.noticeOutCard();
		}
	}

	/**出牌区域*/
	public addCard2Out(pos: UserPosition, cardValue: number) {
		var card = this.cardFactory.getOutCard(cardValue, pos);
		/***如果当前出牌超出摆放的牌，需要移除一张牌 */
		if (this.outList[pos].length >= this.outPointList[pos].length) {
			let removeCard = this.outList[pos].pop();
			removeCard.recycle();
			console.warn("没地方放牌了！！！！");
		}
		this.outList[pos].push(card);
		this.curOutCard = card;
		var op = this.outPointList[pos][this.outList[pos].length - 1]
		card.x = op.x;
		card.y = op.y;
		// card.childAt = op.childAt;
		// this.sortCardChildAt(this.outList[pos]);
		this.outList[pos].forEach((card) => {
			this.cardGroups[pos + this.playNum].addChild(card);
		});
		(App.SceneManager.getCurScene() as GameScene).outFlagUI.show(card, pos);
	}

	/***创建出牌 */
	public createOutCard(pos: UserPosition, cardList: Array<number>) {
		var card: Card;
		for (let i = 0; i < cardList.length; i++) {
			card = this.cardFactory.getOutCard(cardList[i], pos);
			/***如果当前出牌超出摆放的牌，需要移除一张牌 */
			if (this.outList[pos].length >= this.outPointList[pos].length) {
				let removeCard = this.outList[pos].pop();
				removeCard.recycle();
				console.warn("没地方放牌了！！！！");
			}
			this.outList[pos].push(card);
			var op = this.outPointList[pos][this.outList[pos].length - 1]
			card.x = op.x;
			card.y = op.y;
			this.outList[pos].forEach((card) => {
				this.cardGroups[pos + this.playNum].addChild(card);
			});
		}

	}

	/**吃碰杠移动位置 从手牌拿出一张放到摸牌位置，其他手牌往前移动*/
	public offsetHandCard(pos: UserPosition) {
		let takePoint = this.takePointList[pos];
		let handCardList = this.getHandleCard(pos);
		let firstCard = handCardList[0]
		firstCard.x = takePoint.x;
		firstCard.y = takePoint.y;
		if (pos == UserPosition.L) {
			return;
		}
		let handPoint = this.handlePointList[pos];
		let len = handCardList.length
		let card;
		for (var i = 1; i < len; i++) {
			card = handCardList[i];
			card.x = handPoint[i - 1].x;
			card.y = handPoint[i - 1].y;
		}
	}

	/***通知可以出牌*/
	public noticeOutCard() {
		this.bAllowOutCard = true;
		console.log("可以出牌了");

	}

	/***点击出牌*/
	private checkOutCard(card: Card) {
		console.log("点击出牌");
		if (card.parent == this.cardGroups[UserPosition.Down]) {
			console.log(this.bAllowOutCard);

			if (this.bAllowOutCard) {
				if (card.bUp) {
					this.bAllowOutCard = false;
					this.curTouchCard = card;
					this.doAction(card.cardValue);
				} else {
					this.downAllHandCard();
					card.toUp();
				}
			} else {
				if (card.bUp) {
					card.toDown();
				} else {
					this.downAllHandCard();
					card.toUp();
				}
			}
			App.SoundManager.playEffect(SoundManager.clickCard);
		}
	}

	/**移除出牌区域最后一张牌 */
	public rmLastOutCard() {
		if (this.curOutCard) {
			var index = this.outList[this.curOutCard.userPos].indexOf(this.curOutCard);
			this.outList[this.curOutCard.userPos].splice(index, 1);
			this.curOutCard.recycle();
			this.curOutCard = null;
		}
	}

	/**从后面移除其他玩家的手牌 */
	private rmOtherEndCard(pos: UserPosition, nCount: number = 1) {
		var card: Card;
		for (let i = 0; i < nCount; i++) {
			if (pos == UserPosition.L) {
				card = this.handleList[pos].shift();
			} else {
				card = this.handleList[pos].pop();
				console.log("rmOtherEndCard", pos, card.x, card.y)
			}
			card && card.recycle();
		}
	}

	/**从前面移除其他玩家的手牌 */
	private rmOtherFirstCard(pos: UserPosition, nCount: number = 1) {
		var card: Card;
		for (let i = 0; i < nCount; i++) {
			card = this.handleList[pos].shift();
			card && card.recycle();
		}
	}

	/**移除指定手牌*/
	public removeHandCardByValue(cardValue: number) {
		var cardList = this.handleList[UserPosition.Down];
		var len = cardList.length;
		var card: Card;
		for (var i = 0; i < len; i++) {
			card = cardList[i];
			if (cardValue == card.cardValue) {
				cardList.splice(i, 1);
				card && card.recycle();
				break;
			}
		}
	}

	/**移除手牌列表 */
	public removeHandCardByList(pos: UserPosition, cardList: Array<number>) {
		if (pos == UserPosition.Down) {
			cardList.forEach((value) => {
				this.removeHandCardByValue(value);
			})
		} else {
			this.rmOtherEndCard(pos, cardList.length);
		}
	}
	/**增加手牌数据,并不显示*/
	private addHandCard(cardValue: number) {
		// var cardList = this.handleList[UserPosition.Down];
		// var cardPoint:Array<egret.Point>=this.handlePointList[UserPosition.Down];
		// cardList.push(this.cardFactory.getHandCard(cardValue, UserPosition.Down));
		this.pushHandCard(cardValue, UserPosition.Down);
	}


	/***查找并删除手牌，没有删除第一张牌 并返回*/
	public findAndRmHandCard(cardValue: number): number {
		let curHandCardList = this.getHandleCard(UserPosition.Down);
		let findValue: number;
		let findCard: Card;
		for (let i = 0; i < curHandCardList.length; i++) {
			findCard = curHandCardList[i];
			if (findCard.cardValue == cardValue) {
				findValue = cardValue;
				curHandCardList.splice(i, 1);
				findCard.recycle();
				break;
			}
		}
		if (!findValue) {
			findValue = curHandCardList[0].cardValue;
			findCard = curHandCardList.shift();
			findCard && findCard.recycle();
		}
		return findValue;

	}


	/**出牌逻辑*/
	public dealOutAction(pos: UserPosition, cardValue: number) {

		/**移动到出牌区域*/
		this.addCard2Out(pos, cardValue);
		//当前有拿过牌,
		if (this.curTakeCard) {
			if (pos == UserPosition.Down) {
				//当前没有点击出牌
				if (!this.curTouchCard) this.curTouchCard = this.curTakeCard;
				if ((this.curTakeCard != this.curTouchCard) || (this.curTakeCard.cardValue != cardValue)) {
					//移除要出的手牌
					this.removeHandCardByValue(cardValue);
					//把当前牌加入手牌
					this.addHandCard(this.curTakeCard.cardValue);
					//显示手牌
					this.showHandCard(pos);
				}
			}
			this.curTakeCard.recycle();

			//二次出牌,吃碰杠
		} else {
			console.log("吃碰没有拿牌——+——+——+——+——+——+")
			if (pos == UserPosition.Down) {
				//移除要出的手牌
				this.removeHandCardByValue(cardValue);
				//重新显示手牌
				this.showHandCard(pos);

			} else {
				//吃碰杠后手牌移动到摸牌位置，这时候移除第一张手牌
				this.rmOtherFirstCard(pos);
			}

		}
		this.curTakeCard = this.curTouchCard = null;
	}
	/**处理吃碰刚 */
	public dealCPGAction(act: ACT_act, pos: number, cardList, actParam: number) {

		//服务端没有传送完整牌值列表，这里拼接牌值列表
		var cardValue = cardList[0];
		var cardListValue = [];    //需要显示到吃碰区域的牌
		var deleteCardList = []; //需要从手上删除的牌
		var cpgcardList = [];
		if (act == ACT_act.Act_Peng) {
			cardListValue = [cardValue, cardValue, cardValue];
			deleteCardList = [cardValue, cardValue];
			cardListValue.forEach((value) => {
				cpgcardList.push(this.cardFactory.getOutCard(pos, value))
			})
		} else if (act == ACT_act.Act_Gang) {
			if (actParam == 1) {  //1补杠
				cardListValue = [cardValue];
				deleteCardList = [cardValue];
			} else if (actParam == 3) {  //3点杠
				cardListValue = [cardValue, cardValue, cardValue, cardValue];
				deleteCardList = [cardValue, cardValue, cardValue];
			}
		} else if (act == ACT_act.Act_AnGang) { //暗杠
			cardListValue = [cardValue, cardValue, cardValue, cardValue];
			deleteCardList = [cardValue, cardValue, cardValue, cardValue];
		}
		var cgpCards = this.createCPGCard(pos, act, cardListValue);

		/** 暗杠和补杠移除当前拿到的牌，其他要移除出牌区域的最后出的牌*/
		if (act == ACT_act.Act_AnGang || actParam == 1) {
			this.addHandCard(this.curTakeCard.cardValue);
			this.curTakeCard.recycle();
			this.curTakeCard = null;
		} else {
			this.rmLastOutCard();
		}

		/**添加补刚 */
		if (actParam == 1) {
			this.addBuGang(pos, cgpCards[0]);
		} else {
			this.addCPG(pos, cgpCards);
			// this.playPGAni("peng", cardListValue);
		}
		/**删除玩家的手牌 */
		this.removeHandCardByList(pos, deleteCardList);
		if (pos == UserPosition.Down) {
			this.showHandCard(pos);
			/**吃碰需要再次出牌 */
			if (act == ACT_act.Act_Chi || act == ACT_act.Act_Peng) {
				this.noticeOutCard();
				this.offsetHandCard(pos);
			}
		} else {
			if (act == ACT_act.Act_Chi || act == ACT_act.Act_Peng) {
				this.offsetHandCard(pos);
			}
		}
	}

	/** 播放碰杠特效 */
	private playPGAni(mName: string, cardsVal: Array<number>) {
		console.log(cardsVal);

		let card;
		for (var i = 0; i < cardsVal.length; i++) {
			card = this.cardFactory.getEatCard(cardsVal[i], UserPosition.Down);
			this.pgGrp.addChild(card);
		}
		this._pengMc.gotoAndPlay(mName, 2);
		this.pgGrp.addChild(this._pengMc);
		egret.setTimeout(this.stopPGAni, this, 2000);
	}

	/** 停止移动碰杠特效 */
	private stopPGAni() {
		this.pgGrp.visible = false;
		this._pengMc.stop();
		this.pgGrp.removeChild(this._pengMc);

		let card: Card;
		while (this.pgGrp.numChildren > 0) {
			if (this.pgGrp.getChildAt(0) instanceof Card) {
				card = this.pgGrp.getChildAt(0) as Card;
				card.recycle();
				card = null;
			}
		}
	}

	private createCPGCard(pos: UserPosition, act: ACT_act, cardsValue: Array<number>): Array<Card> {

		var cardList = [];
		let i = 0;
		cardsValue.forEach((value) => {
			i++;
			switch (act) {
				case ACT_act.Act_Chi:
				case ACT_act.Act_Peng:
				case ACT_act.Act_Gang:
					cardList.push(this.cardFactory.getEatCard(value, pos));
					break;
				case ACT_act.Act_AnGang:
					if (i == 3 && pos == UserPosition.Down) {
						cardList.push(this.cardFactory.getEatCard(value, pos));
					} else {
						cardList.push(this.cardFactory.getAnGangCard(value, pos));
					}

					break;
			}
		})
		return cardList;
	}

	/**添加吃碰刚 */
	private addCPG(pos: UserPosition, cardList: Array<Card>) {
		if (cardList.length > 4 || cardList.length < 3) return;
		var card: Card;
		var cardPoint: egret.Point;
		for (let i = 0; i < cardList.length; i++) {
			card = cardList[i];
			this.CPGList[pos].push(card);
			cardPoint = this.CPGPointList[pos][this.CPGList[pos].length - 1];
			card.x = cardPoint.x;
			card.y = cardPoint.y;
			this.cardGroups[pos + this.playNum * 2].addChild(card);
		}
		//保证是4的整数倍
		if (cardList.length == 3) {
			this.CPGList[pos].push(null);
		}
	}

	/**补刚 */
	private addBuGang(pos: UserPosition, card: Card): boolean {
		var cpgList = this.CPGList[pos]
		var len = cpgList.length;
		if (len % 4 != 0) return;
		for (let i = 0; i < len; i++) {
			var tcard = cpgList[i];
			if (tcard && tcard.cardValue == card.cardValue) {
				cpgList[i + 3] = card;
				var point = this.CPGPointList[pos][i + 3];
				card.x = point.x;
				card.y = point.y;
				this.cardGroups[pos + this.playNum * 2].addChild(card);
				return true;
			}
		}
		return false;
	}

	/***定缺牌设置 */
	public setDinQueFlag(dqVal: number) {
		/***没有定缺牌 */
		if (!this.checkHaveQue(dqVal)) return;
		let cards = this.handleList[UserPosition.Down];
		let card: Card;
		for (let i = 0; i < cards.length; i++) {
			card = cards[i];
			if ((~~(card.cardValue / 10)) != dqVal) {
				card.lock();
			} else {
				card.unLock();
			}
		}

		if (this.curTakeCard) {
			if ((~~(this.curTakeCard.cardValue / 10)) != dqVal) {
				this.curTakeCard.lock();
			} else {
				this.curTakeCard.unLock();
			}
		}

	}
	/***重置定缺状态 */
	public resetDinQueFlag() {
		let cards = this.handleList[UserPosition.Down];
		let card: Card;
		for (let i = 0; i < cards.length; i++) {
			card = cards[i];
			card.unLock();
		}
		if (this.curTakeCard) {
			this.curTakeCard.unLock();
		}
	}

	public checkHaveQue(dqVal: number): boolean {
		let cards = this.handleList[UserPosition.Down];
		let card: Card;
		let haved: boolean = false;
		for (let i = 0; i < cards.length; i++) {
			card = cards[i];
			if ((~~(card.cardValue / 10)) == dqVal) {
				haved = true;
				break;
			}
		}

		if (this.curTakeCard) {
			if ((~~(this.curTakeCard.cardValue / 10)) == dqVal) {
				haved = true;
			}
		}
		return haved;
	}



	private doAction(cardValue: number) {
		let ctrl: GameController = App.getController(GameController.NAME);
		ctrl.sendOutCard(cardValue);
		// var data = [act, cardList];
		// this.dispatchEventWith("cardAction", false, data)
	}

	/**排序 从小到大*/
	private sortCardOper(cardOpers: Array<CardOper>) {
		var len = cardOpers.length;
		for (var i = 0; i < len; i++) {
			for (var j = i + 1; j < len; j++) {
				if (cardOpers[i].pos > cardOpers[j].pos) {
					var temp = cardOpers[i];
					cardOpers[i] = cardOpers[j];
					cardOpers[j] = temp;
				}
			}
		}

	}

	private sortCardChildAt(cards: Array<Card>) {
		var len = cards.length;
		for (var i = 0; i < len; i++) {
			for (var j = i + 1; j < len; j++) {
				if (cards[i].childAt > cards[j].childAt) {
					var temp = cards[i];
					cards[i] = cards[j];
					cards[j] = temp;
				}
			}
		}

	}

	private onTouchTap(e: egret.TouchEvent) {
		console.log("onTouchTap");
		if (e.target instanceof Card) {
			this.checkOutCard(e.target);
			return;
		}
	}


	//拖牌
	private dragCard: Card;
	private dragCardValue: number = 0;
	private onDragCardBegin(e: egret.TouchEvent) {
		console.log("onDragCardBegin");
		if (e.target instanceof Card) {  //自己手牌
			var card: Card = e.target;
			if (card.parent == this.cardGroups[UserPosition.Down]) {
				this.dragCardValue = card.cardValue;
				App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onDragCardMove, this);
				App.StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onDragCardEnd, this);
			}
		}
	}

	//拖拽移动
	private onDragCardMove(e: egret.TouchEvent) {
		if (this.dragCardValue != 0) {
			if (this.dragCard == null && e.stageY < this.handlePointList[UserPosition.Down][0].y) {
				this.dragCard = this.cardFactory.getHandCard(this.dragCardValue, UserPosition.Down);
				this.cardGroups[UserPosition.Down].addChild(this.dragCard);
			}
			if (this.dragCard) {
				this.dragCard.x = e.stageX - this.dragCard.width / 2;
				this.dragCard.y = e.stageY - this.dragCard.height / 2;
			}
		}
	}

	//释放拖拽
	private onDragCardEnd(e: egret.TouchEvent) {
		this.dragCardValue = 0;
		if (this.dragCard == null) {
			return;
		}
		//删除拖拽牌
		var dragCardValue = this.dragCard.cardValue;
		this.clearDragCard();
		//允许出牌，则从手牌获取相同牌值的牌，并打出
		// if (this.bAllowOutCard && e.stageY < this.cardGroups[UserPosition.Down][0].y) {
		if (this.bAllowOutCard) {
			var cardList = this.handleList[UserPosition.Down];
			var cardLen = cardList.length;
			var card: Card;
			for (var i = 0; i < cardLen; i++) {
				card = cardList[i];
				if (card.cardValue == dragCardValue) {
					this.bAllowOutCard = false;
					this.curTouchCard = card;
					this.doAction(this.curTouchCard.cardValue);
					break;
				}
			}
		}
	}

	//清理拖拽牌
	private clearDragCard() {
		App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onDragCardMove, this);
		App.StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onDragCardEnd, this);
		this.dragCardValue = 0;
		if (this.dragCard) {
			this.dragCard.recycle();
			this.dragCard = null;
		}
	}

	private downAllHandCard() {
		var handList = this.handleList[UserPosition.Down];
		var len = handList.length;
		for (var i = 0; i < len; i++) {
			handList[i].toDown();
		}
	}

	public reset() {
		this.cardGroups.forEach((group) => {
			group.removeChildren();
		});
		this.initCardList();
	}
}

//牌的配置
class CardOper {
	/**x,y坐标 */
	public point: egret.Point;
	/**层级 */
	public childAt: number;
	/**第几张牌 */
	public pos: number;
}