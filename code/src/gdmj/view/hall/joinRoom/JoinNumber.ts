/**
 * 输入加入房间
 * @author eyanlong 
 * @date 2017/2/23
 */

class JoinNumber extends BasePanel {
	/**返回按钮 */
	private joinNum_close:eui.Button;
	/**记录输入的数字 */
	private joinNum:number;
	/**显示输入数字 */
	private numbers:eui.Group;
	/**按钮 */
	private number_bt:eui.Group;
	/**Label列表 */
	private fntLabelList:Array<eui.BitmapLabel>;
	/**按钮列表 */
	private btnList:Array<eui.Button>;
	/**现有数字列表 */
	private numList:Array<number>;


	public constructor() {
		super();
		this.skinName = "JoinNumberSkin";
	}

	protected onEnable() {
        this.joinNum_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.number_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

		this.initList();
    }

    protected onRemove() {
        this.joinNum_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.number_bt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

	/**初始化列表和UI */
	private initList() {
		this.fntLabelList = [];
		this.btnList = [];
		this.numList = [];

		for(var i = 0; i < 6; i ++) {
			this.fntLabelList.push( <eui.BitmapLabel>this.numbers.getChildAt(i) );
		}

        for(var i = 0; i < 12; i ++) {
			this.btnList.push( <eui.Button>this.number_bt.getChildAt(i) );
		}

		this.showNum();
	}

	/**软键盘点击响应 */
	protected onTouch(e:egret.TouchEvent) {
		for(var i = 0; i < 12; i ++) {
			if (e.target == this.btnList[i]) {
				this.refreshNum( i );
			}
		}
	}

	/**更新数组 */
	protected refreshNum(id: number) {
		//删除
		if (id == 10) {
			if (this.numList.length > 0) {
				this.numList.pop();
			} 
			else {
				return;
			}
		}
		//确定
		else if (id == 11) {
			if (this.numList.length > 5) {
				this.getHttp();
			}
			else {
				TipsLog.hallInfo("请输入正确的房间号码");
			}
		}
		//数字
		else {
			if (this.numList.length >= 6) {
				return;
			}
			else {
				this.numList.push( id );
			}
		}

		this.showNum();
	}

	/**根据数组显示数字 */
	protected showNum() {

		for (var i = 0; i < 6; i ++) {
			if (this.numList[i] || this.numList[i] == 0) {
				this.fntLabelList[i].text = this.numList[i].toString();
			}
			else {
				this.fntLabelList[i].text = "";
			}
		}

		// if (this.numList.length >= 6) {
		// 	this.getHttp();
		// }
	}

	/**输入完密码请求接口 */
	protected getHttp() {
		let password:string = "";
		for (var i = 0; i < this.numList.length; i ++) {
			password += this.numList[i];
		}
		console.log("输入的密码：" + password);
		if(password.length > 5){
			var json = ProtocolData.Send101001;
			json.desk_code= parseInt(password);
			json.deviceID = "111";
			json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;

			App.LoadingLock.httpLock(()=>{
                TipsLog.hallInfo("请求超时，请稍候再试");
            });
			App.gameSocket.send(ProtocolHead.Send101001,json);
		}
	}

	/**奇葩需求 */
	public fuckfuck() {
		if (this.numList.length > 0) {
			this.numList.pop();
			this.showNum();
		}
	}

	/**返回 */
	protected back(){
		this.hide();
	}

	/**
	 * 隐藏清理
	 * 清理界面的数据和显示
	 * onEnable中初始化和onRemove中清理选其一
	*/
	protected clean() {
	}
}