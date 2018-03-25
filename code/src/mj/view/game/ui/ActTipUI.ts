/**
 * 操作消息UI，吃碰杠胡等，动画提示
 * @author chen
 * @date 2016/7/8
 */
class ActTipUI extends eui.Component{
    private bmList = [];    //位图缓存
    private imgList = [];  //显示的图片
	private bInitRes:boolean = false;
	private actTip_img:eui.Image;
	private actTip_bg:eui.Image;

	public constructor() {
    	super();
		this.skinName = "ActTipSkin";
	}

	protected childrenCreated(){
		// for(var i=0;i<5;i++){
		// 	this.imgList.push(this.getChildAt(i));
		// }
	}

	private initRes(){
		if(this.bInitRes == false){
			this.bInitRes = true;
			this.bmList[ACT_act.Act_Chi] = RES.getRes("game_cs_chi_png");
			this.bmList[ACT_act.Act_Peng] = RES.getRes("game_cs_peng_png");
			this.bmList[ACT_act.Act_Gang] = RES.getRes("game_cs_gang_png");
			this.bmList[ACT_act.Act_Hu] = RES.getRes("game_cs_hu_png");
			this.bmList[ACT_act.Act_AnGang] = RES.getRes("game_cs_gang_png");
		}
	}
	
	/**
	 * 设置提示皮肤
	 * @act 动作类型
	 */ 
    public showAct(act: ACT_act){
		this.initRes();

        // this.imgList[3].bitmapData = this.bmList[act];
		// this.imgList[4].bitmapData = this.bmList[act];

		// var foot = this.imgList[0];  //底层黑红色
		// foot.scaleX = 0.3;
		// foot.scaleY = 0.3;
		// foot.alpha = 0;
		// egret.Tween.get(foot).wait(200).to({scaleX:0.8,scaleY:0.8,alpha:0.3},200);

		// var mid = this.imgList[1];   //底层黑色烟圈
		// mid.scaleX = 0.6;
		// mid.scaleY = 0.6;
		// mid.alpha = 1;
		// egret.Tween.get(mid).wait(200).to({scaleX:1.4,scaleY:1.4,alpha:0},300);

		// var top = this.imgList[2]; //底层黑色雾状
		// top.visible = false;
		// egret.Tween.get(top).wait(200).call(()=>{top.visible = true}, this);
	
		this.actTip_img.source = this.bmList[act];
		this.actTip_bg.source = this.bmList[act];

		// var font0 = this.imgList[3]; //不变化的字
		var font0 = this.actTip_bg;
		font0.visible = true;
		egret.Tween.get(font0).wait(240).call(()=>{font0.visible = false}, this);
	
		var font = this.actTip_img;

		// var font = this.imgList[4];  //变化的字
		font.scaleX = 1.7;
		font.scaleY = 1.7;
		font.alpha = 0;
		egret.Tween.get(font).wait(40).to({scaleX:0.85,scaleY:0.85,alpha:1},200).to({scaleX:1,scaleY:1},160).wait(1000).call(()=>{
			this.hide();
		},this);
	}

	public hide(){
		this.parent && this.parent.removeChild(this);
	}
}
