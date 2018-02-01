/**
 * 选择操作按钮
 * @author chenkai
 * @date 2016/8/3
 * 
 * @author huanglong
 * @data 2017/04/12 chongxie
 */
class SelectActBtn extends eui.Component{
	private resList = [];   //资源配置表
	private bInitRes:boolean = false;

	private mc:egret.MovieClip;

	public constructor() {
		super();
		this.skinName = "SelectActBtnSkin";
	}

	public childrenCreated(){
		this.touchChildren = false;
		this.touchEnabled = true;
	}

	private initRes(){
		if(this.bInitRes == false){
			this.bInitRes = true;
			this.resList[ACT_act.Act_Pass] = "mcGuo";
			this.resList[ACT_act.Act_Chi] = "mcChi";
			this.resList[ACT_act.Act_Peng] = "mcPeng";
			this.resList[ACT_act.Act_Gang] = "mcGang";
			this.resList[ACT_act.Act_AnGang] = "mcGang";
			this.resList[ACT_act.Act_Hu] = "mcHu";
		}
	}


	/**
	 * 根据动作创建MovieClip
	 */
	public setNewActSkin(act:ACT_act){
		this.initRes();
		var resName = this.resList[act];
		var data = RES.getRes(resName+"_mc_json");
		var img = RES.getRes(resName+"_tex_png");
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, img);
        this.mc = new egret.MovieClip( mcFactory.generateMovieClipData(resName) );
		this.mc.x = this.mc.x + 75;
		this.mc.y = this.mc.y + 75;
        this.addChild(this.mc);
	}

	/**播放动画*/
	public playAnim(){
		this.mc.gotoAndPlay(0,-1);
	}

	/**暂停播放 */
	public stopAnim() {
		if (this.mc) {
			this.mc.stop();
		}
	}
}