
module XX {
	export class HeadShowUI extends eui.Component {
		public constructor() {
			super();
		}
		public bMove: boolean = false;
		private headGroup: eui.Group;
		private headList: Array<HeadUI>;
		/**定位用,用完删除*/
		private headGroup1: eui.Group;
		private readyGroup: eui.Group;
		private readyList1 = [];
		private readyList2 = [];
		private readyList;
		private originList: Array<egret.Point>;
		private toList: Array<egret.Point>;
		protected childrenCreated() {
			this.init()
			this.hideAllReady();
			/**删除*/
			this.headGroup1.parent && this.headGroup1.parent.removeChild(this.headGroup1);
		}

		private init() {
			this.headList = [];
			this.originList = [];
			this.toList = [];
			let len = this.headGroup.numChildren;
			for (let i = 0; i < len; i++) {
				let orginObj = this.headGroup.getChildAt(i) as HeadUI;
				this.headList.push(orginObj);
				let toObj = this.headGroup1.getChildAt(i);
				this.originList.push(new egret.Point(orginObj.x, orginObj.y));
				this.toList.push(new egret.Point(toObj.x, toObj.y));
			}

			for (let i = 0; i < 4; i++) {
				this.readyList1.push(this.readyGroup.getChildAt(i));
				this.readyList2.push(this.readyGroup.getChildAt(i + 4));
			}

		}

		/** 设置更新头像信息*/
		public updateUserHead(pos: UserPosition, seatID: number, userID: number, headUrl: string, nickName: string, score: number) {
			var headUI = this.headList[pos];
			headUI.seatID = seatID;
			headUI.userID = userID;
			headUI.loadImg(headUrl);
			headUI.nameLabel.text = nickName;
			headUI.scoreLabel.visible = true;        //显示积分
			headUI.sidai.visible = true;            //显示丝带
			this.updateScore(pos, score);

		}

		/**更新积分 */
		public updateScore(pos: UserPosition, score: number) {
			this.headList[pos].scoreLabel.text = score.toString();
		}

		/**显示托管*/
		public showTuoGuan(pos: UserPosition) {
			this.headList[pos].showTuoGuanIcon();
		}

		/**隐藏托管*/
		public hideTuoGuan(pos: UserPosition) {
			this.headList[pos].hideTuoGuanIcon();
		}

		/**显示掉线*/
		public showUnConnect(pos: UserPosition) {
			this.headList[pos].showUnconnect();
		}

		/**隐藏掉线*/
		public hideUnconect(pos: UserPosition) {
			this.headList[pos].hideUnconnect();
		}

		/**隐藏玩家头像*/
		public hideHeadUI(pos) {
			var headUI: HeadUI = this.headList[pos];
			headUI && headUI.clear();
		}

		/**清理所有玩家头像UI*/
		public hideAllHeadUI() {
			var len = this.headList.length;
			var headUI: HeadUI;
			for (var i = 0; i < len; i++) {
				headUI = this.headList[i];
				headUI.clear();
			}
		}

		/**移动 */
		public moveTo(delay: number = 500) {
			this.bMove = true;
			for (let i = 0; i < this.headList.length; i++) {
				this.headMove(this.headList[i], this.toList[i], false, delay);
			}
		}
		/**回位 */
		public resetMove() {
			this.bMove = false;
			for (let i = 0; i < this.headList.length; i++) {
				this.headMove(this.headList[i], this.originList[i], true, 0);
			}
		}

		private headMove(headUI: HeadUI, toPoint: egret.Point, visible: boolean, time: number) {
			egret.Tween.removeTweens(headUI);
			egret.Tween.get(headUI).to({ x: toPoint.x, y: toPoint.y }, time).call(() => {
				headUI.nameLabel.visible = visible;   //隐藏昵称
			});
		}

		/**显示准备图标*/
		public showReady(pos: UserPosition) {
			//最初状态准备按钮
			if (!this.bMove) {
				this.readyList = this.readyList1;
				this.readyGroup.addChild(this.readyList[pos]);
			} else {
				this.readyList = this.readyList2;
				this.readyGroup.addChild(this.readyList[pos]);
			}
		}

		/***隐藏准备图标*/
		public hideReady(pos: UserPosition) {
			//最初状态准备按钮
			if (!this.bMove) {
				this.readyList = this.readyList1;
				var ready = this.readyList[pos];
				ready && ready.parent && ready.parent.removeChild(ready);
			} else {
				this.readyList = this.readyList2;
				var ready = this.readyList[pos];
				ready && ready.parent && ready.parent.removeChild(ready);
			}
		}

		/***重置准备*/
		public resetReady() {
			this.hideAllReady();
		}

		/***隐藏所有准备图标*/
		public hideAllReady() {
			this.readyGroup.removeChildren();
		}

	}
}