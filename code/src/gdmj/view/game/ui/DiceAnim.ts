/**
 * 骰子动画
 * @author chenkai 
 * @date 2016/6/30
 */
class DiceAnim extends eui.Component{
	private anim0:BitmapMovie;//骰子动画
	private anim1:BitmapMovie;
	private sz0List = [];     //骰子具体点数图片
	private sz1List = [];   
	private point0:number;    //骰子点数
	private point1:number;    //骰子点数
	private bInitRes:boolean = false; //是否初始化过
	public diceGro:eui.Group;

	private mc:egret.MovieClip;

	public constructor() {
    	super();
    	this.skinName = "DiceAnimSkin";
	}
	
	public childrenCreated(){
	}

	private initRes(){
	}

	/**
	 * 播放骰子动画
	 * @point0 骰子点数
	 * @point1 
	 */
	public playAnim(point0:number, point1:number){
	}

	/**初始化序列帧 */
	private initMovieClip() {
		var resName = "shaizi"
        var data = RES.getRes(resName+"_mc_json");
		var img = RES.getRes(resName+"_tex_png");
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, img);
        this.mc = new egret.MovieClip( mcFactory.generateMovieClipData(resName) );
        this.mc.x = 75;
        this.mc.y = 49;
		this.addChild(this.mc);
	}

	/**播放色子序列帧 */
	public playAnimation(point1:number, point2:number) {
		var times = 4;
		this.initMovieClip();
		this.mc.gotoAndPlay(0, times);
		this.diceGro.visible = false;

		setTimeout(()=>{
			this.mc.stop();
			this.mc.parent && this.mc.parent.removeChild(this.mc);
			this.diceGro.alpha = 1;
			this.diceGro.scaleX = 0.6;
			this.diceGro.scaleY = 0.6;
			this.diceGro.visible = true;
			( <eui.Image>(this.diceGro.getChildAt(0)) ).texture = RES.getRes("s"+point1+"_png");
			( <eui.Image>(this.diceGro.getChildAt(1)) ).texture = RES.getRes("s"+point2+"_png");
			this.diceGro.visible = true;
			egret.Tween.get(this.diceGro)
			.wait(300)
			.to({scaleX:1, scaleY:1}, 200)
			.wait(700)
			.to({alpha:0}, 200)
			.set({visible: false})
			.call( ()=>{
				this.onComplete();
			},this);
		}, times*330);
	}

	/**播放完成 */
	private onComplete() {
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}

	//骰子动画播放完成
	private onAnimComplete(){
		this.anim0.stop();
		this.removeChild(this.anim0);
		this.addChild(this.sz0List[this.point0-1]);

		this.anim1.stop();
		this.removeChild(this.anim1);
		this.addChild(this.sz1List[this.point1-1]);

		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}



}
