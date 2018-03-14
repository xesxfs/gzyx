/**
 * 资源加载等待时锁定动画
 * @author chenkai
 * @date 2016/9/19
 */
class LoadingLock extends SingleClass{
    /**loading动画*/
    private mc: egret.MovieClip;
    /**黑色Rect底图*/
    private rect: eui.Rect;
    /**超时计时器*/
    private overTimer:egret.Timer = new egret.Timer(10000,1);
    /**超时回调*/
    private callBack:Function;
    /**超时回调执行对象*/
    private thisObject:any;
    /**描述信息 */
    private descGro: eui.Group;
    /**延时器编号 */
    private timeNum: number;
    /**描述 */
    private descLab: eui.Label;
	
    /**
     * 锁定
     * @callBack 超时回调
     * @thisObject 超时回调执行对象
     */
    public lock(callBack:Function = null, thisObject:any = null): void {
        this.callBack = callBack;
        this.thisObject = thisObject;
        this.startOverTimer();
        if(this.mc == null) {
            // var data = RES.getRes("loadMc_json");
            // var texture = RES.getRes("loadMc_png");
       	    // var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
            // this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("load"));
            // this.mc.x = (App.StageUtils.stageWidth - this.mc.width) / 2;
            // this.mc.y = (App.StageUtils.stageHeight - this.mc.height) / 2;
        }
        if(this.rect == null) {
            this.rect = new eui.Rect();
            this.rect.width = App.StageUtils.stageWidth;
            this.rect.height = App.StageUtils.stageHeight;
            this.rect.touchEnabled = true;
            this.rect.alpha = 0.5;
        }
        this.rect.alpha = 0.5;
        if (!this.rect.parent) {
            App.LayerManager.lockLayer.addChild(this.rect);
        }
        App.LayerManager.lockLayer.addChild(this.mc);
        // this.mc.gotoAndPlay("roll",-1);

        if (this.descGro) {
            App.LayerManager.lockLayer.addChild(this.descGro);
        }
    }

    //http请求遮罩
    public httpLock(callBack:Function = null, thisObject:any = null) {
        if(this.rect == null) {
            this.rect = new eui.Rect();
            this.rect.width = App.StageUtils.stageWidth;
            this.rect.height = App.StageUtils.stageHeight;
            this.rect.touchEnabled = true;
            this.rect.alpha = 0.2;
        }
        this.rect.alpha = 0.2;
        App.LayerManager.lockLayer.addChild(this.rect);

        this.timeNum = setTimeout(()=>{
            this.timeNum&&clearTimeout(this.timeNum);
            this.lock();
        }, 1000);
    }

    //停止加载动画
    public unlock() {
        this.timeNum&&clearTimeout(this.timeNum);
        this.callBack = null;
        this.thisObject = null;
        this.stopOverTimer();
        this.mc && this.mc.parent && this.mc.parent.removeChild(this.mc);
        this.rect && this.rect.parent && this.rect.parent.removeChild(this.rect);
        this.descGro && this.descGro.parent && this.descGro.parent.removeChild(this.descGro);
        this.descGro = null;
    }

    //开始超时计时
    private startOverTimer(){
        this.overTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.overTimer.reset();
        this.overTimer.start();
    }

    //停止超时计时
    private stopOverTimer(){
        this.overTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.overTimer.stop();
    }

    //超时
    private onTimerComplete(){
        if(this.callBack != null && this.thisObject != null){
            this.callBack.call(this.thisObject);
        }
        this.unlock();
    }

    //添加Loading描述
    public addDesc(tips: string) {
        // if (this.descGro == null) {
        //     this.descGro = new eui.Group();
        //     this.descGro.width = App.StageUtils.stageWidth;
        //     this.descGro.height = App.StageUtils.stageHeight;

        //     var bg = new eui.Image();
        //     bg.texture = RES.getRes("game_bg2_png");
        //     bg.verticalCenter = 100;
        //     bg.horizontalCenter = 0;
        //     bg.scale9Grid = new egret.Rectangle(24,5,149,36);
        //     bg.width = 500;
        //     this.descGro.addChild(bg);

        //     this.descLab = new eui.Label();
        //     this.descLab.verticalCenter = 103;
        //     this.descLab.horizontalCenter = 0;
        //     this.descLab.size = 30;
        //     this.descLab.textColor = 0xfff1be;
        //     this.descGro.addChild(this.descLab);
        // }
        // this.descLab.text = tips;
        // App.LayerManager.lockLayer.addChild(this.descGro);
    }
}
