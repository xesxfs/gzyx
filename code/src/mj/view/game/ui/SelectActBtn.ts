/**
 * 选择操作按钮
 * @author chen
 * @date 2016/8/3
 * 
 * @author huang
 * @data 2017/04/12 chongxie
 */
class SelectActBtn extends eui.Component {
	private resList = [];   //资源配置表
	private bInitRes: boolean = false;
	public actImg: eui.Image;



	public constructor() {
		super();
		this.skinName = "SelectActBtnSkin";
		this.initRes();
	}

	public childrenCreated() {
		this.touchChildren = false;
		this.touchEnabled = true;
	}

	private initRes() {
		if (this.bInitRes == false) {
			this.bInitRes = true;
			this.resList[ACT_act.Act_Pass] = "pass_btnpress_png";
			this.resList[ACT_act.Act_Ting] = "baoting-btnpress_png";
			this.resList[ACT_act.Act_Peng] = "peng_btnpress_png";
			this.resList[ACT_act.Act_Gang] = "gang_btnpress_png";
			this.resList[ACT_act.Act_Hu] = "hu_btnpress_png";
		}
	}


	/**
	 * 动作
	 */
	public setNewActSkin(act: ACT_act) {
		this.initRes();
		var resName = this.resList[act];
		var data = RES.getRes(resName);
		this.actImg.source=data;

	}

}