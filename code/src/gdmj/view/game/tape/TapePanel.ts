/**
 * 录音界面
 * @author huanglong
 * 2017-4-5
 * 录音不发送是否需要给IM消息中加入参数
 */

class TapePanel extends BasePanel{
    public tapLabel:eui.Label;
    public timeGro:eui.Group;
    public timeLabel:eui.Label;
    public tapeImg:eui.Image;
    public tipLabel:eui.Label;
    public blueGroup:eui.Group;

    private blueList = [];           //蓝色音量方块
    private recordBeginTime:number;       //录音时间
    private recordBeginPos:number;   //录音点击位置
    private recordEndPos:number;     //录音结束位置
    private moveFlag:boolean = false;

    private Timer: egret.Timer;
    private Totaltime: number;
    private delay: number = 100;

    public constructor() {
        super();
        this.skinName = "TapePanelSkin"
    }

   protected childrenCreated() {
       for(var i=0;i<5;i++){
            this.blueList.push(this.blueGroup.getChildAt(i));
        } 
   }

    /** 添加到场景*/
    protected onEnable() {

        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOutside, this);

        this.Timer = new egret.Timer(this.delay, 60*10);
        this.Timer.addEventListener(egret.TimerEvent.TIMER, this.timeTicker, this);
        this.Timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeCom, this);

        this.initView();
    }

    /** 从场景中移除*/
    protected onRemove() {
      
        this.tapeImg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.tapeImg.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.tapeImg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.tapeImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOutside, this);

        this.Timer.stop();
        this.Timer = null;
        this.Totaltime = 0;
    }

    /**初始化界面 */
    private initView() {
        this.tapLabel.visible = true;
        this.timeGro.visible = false;
        this.blueGroup.visible = false;
        this.tipLabel.visible = false;
        this.timeLabel.text = "00:00"
    }

    /**话筒动画 */
    public voiceAnimation() {
        var flashTime = 90;
        egret.Tween.get(this,{loop:true}).wait(flashTime).call(()=>{
            this.blueList[1].visible = false;   //1亮
            this.blueList[2].visible = false;
            this.blueList[3].visible = false;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(()=>{
            this.blueList[1].visible = true;   //12亮
            this.blueList[2].visible = false;
            this.blueList[3].visible = false;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(() => {
            this.blueList[1].visible = true;   //123亮
            this.blueList[2].visible = true;
            this.blueList[3].visible = false;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(() => {
            this.blueList[1].visible = true;   //1234亮
            this.blueList[2].visible = true;
            this.blueList[3].visible = true;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(() => {     
            this.blueList[1].visible = true;   //123亮
            this.blueList[2].visible = true;
            this.blueList[3].visible = false;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(() => {
            this.blueList[1].visible = true;   //12亮
            this.blueList[2].visible = false;
            this.blueList[3].visible = false;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(() => {
            this.blueList[1].visible = true;   //123亮
            this.blueList[2].visible = true;
            this.blueList[3].visible = false;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(() => {
            this.blueList[1].visible = true;   //1234亮
            this.blueList[2].visible = true;
            this.blueList[3].visible = true;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(() => {
            this.blueList[1].visible = true;   //12345亮
            this.blueList[2].visible = true;
            this.blueList[3].visible = true;
            this.blueList[4].visible = true;
        }).wait(flashTime).call(() => {
            this.blueList[1].visible = true;   //1234亮
            this.blueList[2].visible = true;
            this.blueList[3].visible = true;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(() => {
            this.blueList[1].visible = true;   //123亮
            this.blueList[2].visible = true;
            this.blueList[3].visible = false;
            this.blueList[4].visible = false;
        }).wait(flashTime).call(() => {
            this.blueList[1].visible = true;   //12亮
            this.blueList[2].visible = false;
            this.blueList[3].visible = false;
            this.blueList[4].visible = false;
        });
    }

    private onBegin(event:egret.TouchEvent) {
        this.moveFlag = false;

        //发送给IM录音开始事件
        App.NativeBridge.sendTapeBegin();

        this.recordBeginTime = egret.getTimer();
        this.recordBeginPos = event.stageY;

        this.tapLabel.visible = false;
        this.timeGro.visible = true;
        this.blueGroup.visible = true;
        this.tipLabel.visible = true;

        //开始计时
        this.Totaltime = 0;
        this.Timer.start();

        this.voiceAnimation();

        //关闭背景音乐
        App.SoundManager.bgmVolume = 0;
    }

    private onEnd() {

        this.overTape();
    }

    private onOutside() {

        this.overTape();
    }

    private timeTicker() {
          
        this.Totaltime +=  this.delay;
        var m = Math.floor(this.Totaltime/1000);
        var s = ((this.Totaltime%1000)/100)*6+NumberTool.getRandInt(0,6)
        this.timeLabel.text = Math.floor(m/10).toString() + (m%10).toString() + ":" + Math.floor(s/10).toString() + (s%10).toString();
    }

    private timeCom() {
        TipsLog.gameInfo("录音时间已满60秒，自动发送");
        this.overTape();
    }

    /**结束录音处理 */
    public overTape() {
        //发送给IM录音结束事件

        this.overAnimation();
        this.initView();

        this.Timer.reset();

        if ( (egret.getTimer()-this.recordBeginTime) < 1000 ) {
            TipsLog.gameInfo("录音时间过短，自动撤销录音");
            App.NativeBridge.sendTageEnd({state: "cancle"});
        }
        else if ( this.moveFlag && ( (this.recordBeginPos - this.recordEndPos) > 50 || this.recordEndPos < 940 ) ) {
            TipsLog.gameInfo("已撤销录音内容");
            App.NativeBridge.sendTageEnd({state: "cancle"});
        }
        else {
            App.NativeBridge.sendTageEnd({state: "normal"});
        }

        App.SoundManager.bgmVolume = 1;
        this.hide();
    }

    /**结束录音动画处理 */
    private overAnimation() {
        egret.Tween.removeTweens(this);

        //计时器复原
        this.Totaltime = 0;
    }

    private onMove(event:egret.TouchEvent) {
        this.moveFlag = true;
        this.recordEndPos = event.stageY;
    }
}