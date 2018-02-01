class DiscShowUI extends eui.Component {
    public constructor() {
        super();
    }
    private lightFlashTime: number = 400;  //中间圆盘光的闪烁时间ms
    private discGroup: eui.Group;
    private cdLabel: eui.BitmapLabel;
    private outTimer: DateTimer = new DateTimer(1000); //出牌计时器
    private redDiscList = [];    //圆盘红色指示块 
    private redDiscBGList = [];  //圆盘红色指示块底图
    private curOutTimeLimit = 0;   //当前出牌计时
    private outTime:number=15;

    protected childrenCreated() {
        this.init();
    }

    private init() {
        for (let i = 0; i < 4; i++) {
            this.redDiscList.push(this.discGroup.getChildAt(i + 9));
            this.redDiscBGList.push(this.discGroup.getChildAt(i + 5));
        }

    }

    /****显示中间圆盘光**/
    public showLight(pos: UserPosition) {
        this.hideAllLight();
        this.redDiscList[pos].visible = true;
        this.redDiscBGList[pos].visible = true;
        egret.Tween.removeTweens(this.redDiscList[pos]);
        egret.Tween.get(this.redDiscList[pos], { loop: true }).to({ alpha: 1 }, this.lightFlashTime + 100).wait(this.lightFlashTime - 200).to({ alpha: 0.5 }, this.lightFlashTime + 100);
    }

    /***隐藏所有光*/
    public hideAllLight() {
        var len = this.redDiscList.length;
        var light;
        for (var i = 0; i < len; i++) {
            this.redDiscList[i].alpha = 1;
            this.redDiscList[i].visible = false;
            egret.Tween.removeTweens(this.redDiscList[i]);
        }
        var bgLen = this.redDiscList.length;
        for (var i = 0; i < bgLen; i++) {
            this.redDiscBGList[i].visible = false;
        }
    }

    /***设置cd文本*/
    private setCdLabel(time: string) {
        this.cdLabel.text = time;
    }

    /***开始出牌计时器*/
    public startOutTimer() {

        this.outTimer.addEventListener(egret.TimerEvent.TIMER, this.onOutTime, this);
        this.outTimer.repeatCount = this.outTime;
        this.curOutTimeLimit = this.outTime;
        this.outTimer.reset();
        this.outTimer.start();
        this.setCdLabel(NumberTool.formatTime(this.outTime));
    }

    /**出牌计时处理*/
    private onOutTime(e: egret.TimerEvent) {
        if (this.outTimer.currentCount > this.curOutTimeLimit) {
            this.stopOutTimer();
            return;
        }
        var count = this.curOutTimeLimit - this.outTimer.currentCount;
        this.setCdLabel(NumberTool.formatTime(count));
        if (count <= 3) {
            App.SoundManager.playEffect(SoundManager.warn);
        }
    }

    /**停止出牌计时*/
    public stopOutTimer() {
        this.outTimer.removeEventListener(egret.TimerEvent.TIMER, this.onOutTime, this);
        this.outTimer.stop();
        this.setCdLabel("");
    }

    public hide() {
        this.visible = false;
    }

    public show() {
        this.visible = true;
    }

}

