/**
 * 庄家标志
 * @author chenkai 
 * @date 2016/6/30
 */
class ZhuangFlag extends egret.Bitmap{
	public constructor() {
    	super();
    	this.bitmapData = RES.getRes("g_zhuang_png");
    	this.anchorOffsetX = 23;
    	this.anchorOffsetY = 26;
		this.scaleX = 0.8;
		this.scaleY = 0.8;
	}
	
	public hide(){
    	this.parent && this.parent.removeChild(this);
	}
}
