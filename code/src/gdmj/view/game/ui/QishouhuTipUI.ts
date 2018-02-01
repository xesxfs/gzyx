/**
 * @author xiongjian 
 * 2017-3-31
 */
class QishouhuTipUI extends eui.Component{
    private bmList = [];    //位图缓存
    private imgList = [];  //显示的图片
	private bInitRes:boolean = false;
    private actTip_bg:eui.Image;

    public constructor(){
        super();
        this.skinName="QishouhuTipSkin";
    }

	protected childrenCreated(){
		for(var i=0;i<4;i++){
			this.imgList.push(this.getChildAt(i));
		}
	}

    	/**
	 * 设置提示皮肤
	 * @act 动作类型
	 */ 
    public showAct(){
        
        var foot = this.imgList[0];  //底层
		foot.scaleX = 0.3;
		foot.scaleY = 0.3;
		foot.alpha = 0;
		egret.Tween.get(foot).wait(200).to({scaleX:0.8,scaleY:0.8,alpha:0.3},200);

		var mid = this.imgList[1];   //底层烟
		mid.scaleX = 0.6;
		mid.scaleY = 0.6;
		mid.alpha = 1;
		egret.Tween.get(mid).wait(200).to({scaleX:1.4,scaleY:1.4,alpha:0},300);

		var top = this.imgList[2]; //底层雾状
		top.visible = false;
		egret.Tween.get(top).wait(200).call(()=>{top.visible = true}, this);
        
        var font0 = this.imgList[3]; //不变化的字
		font0.visible = true;
		font0.alpha = 0;
		egret.Tween.get(font0).wait(240).call(()=>{font0.visible = false}, this);
		
		egret.Tween.get(font0).wait(40).to({scaleX:0.85,scaleY:0.85,alpha:1},200).to({scaleX:1,scaleY:1},160).wait(1000).call(()=>{
			this.hide();
		},this);
    }

	public hide(){
		this.parent && this.parent.removeChild(this);
	}

}