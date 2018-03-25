

class HeadShowUI extends eui.Component {
	public constructor() {
		super();
	}
	public bMove: boolean = false;
	private headGroup: eui.Group;
	private headList: Array<HeadUI>;
	/**定位用,用完删除*/
	private readyGroup: eui.Group;
	private readyList = [];

	protected childrenCreated() {
		this.init();
		this.hideAllReady();

	}

	private init() {
		this.headList = [];

		let len = this.headGroup.numChildren;
		for (let i = 0; i < len; i++) {
			let orginObj = this.headGroup.getChildAt(i) as HeadUI;
			orginObj.visible = false;
			this.headList.push(orginObj);
		}

		for (let i = 0; i < 4; i++) {
			this.readyList.push(this.readyGroup.getChildAt(i));

		}

	}

	/** 设置更新头像信息*/
	public updateUserHead(user: UserVO) {
		let pos = CardLogic.getInstance().changeSeat(user.seatID);
		var headUI = this.headList[pos];
		headUI.userID = user.userID;
		headUI.loadImg(user.headUrl);
		headUI.nameLabel.text = user.nickName;
		headUI.goldLabel.text = user.gold.toString();
		headUI.visible = true;
	}

	public showZhuang(pos:UserPosition){
		for(let i=0;i<4;i++){
			var headUI = this.headList[i];
			headUI.headzhuang.visible=false;
			if(pos==i){
				headUI.headzhuang.visible=true;
			}
		}
	}



	/**隐藏玩家头像*/
	public hideHeadUI(pos:UserPosition) {
		var headUI: HeadUI = this.headList[pos];
		headUI.hide();

	}

	/**清理所有玩家头像UI*/
	public hideAllHeadUI() {
		var len = this.headList.length;
		var headUI: HeadUI;
		for (var i = 0; i < len; i++) {
			headUI = this.headList[i];
			headUI.hide();

		}
	}


	/**显示准备图标*/
	public showReady(pos: UserPosition) {
		//最初状态准备按钮
		// if (!this.bMove) {
		// 	this.readyList = this.readyList1;
		// 	this.readyGroup.addChild(this.readyList[pos]);
		// } else {
		// 	this.readyList = this.readyList2;
		// 	this.readyGroup.addChild(this.readyList[pos]);
		// }
	}

	/***隐藏准备图标*/
	public hideReady(pos: UserPosition) {
		//最初状态准备按钮
		// if (!this.bMove) {
		// 	this.readyList = this.readyList1;
		// 	var ready = this.readyList[pos];
		// 	ready && ready.parent && ready.parent.removeChild(ready);
		// } else {
		// 	this.readyList = this.readyList2;
		// 	var ready = this.readyList[pos];
		// 	ready && ready.parent && ready.parent.removeChild(ready);
		// }
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
