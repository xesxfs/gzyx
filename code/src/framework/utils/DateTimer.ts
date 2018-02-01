/**
 * 根据系统时间的计时器
 * 由于android和ios设备运行效率不一致，导致egret.Timer计时不正确，在对计时精确度有较高要求场合使用该类
 * @author chenkai
 * @date 2016/6/29
 * 
 * Example:
 * 用法同egret.Timer
 * var dateTimer:DateTimer = new DateTimer(1000,10);
 * dateTimer.addEventListeners(egret.TimerEvent.TIMER, this.onTimerHandler, this);
 * dateTimer.addEventListeners(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
 * dateTimer.reset();
 * dateTimer.start();
 */
class DateTimer extends egret.EventDispatcher {
    private previous: number;   //以前时间
    private curTime: number;    //当前时间
    private passTime: number;   //已过去时间
    private accTime: number;    //累计时间
    public delay: number;       //每帧耗时
    public currentCount: number;//当前计数
    public repeatCount: number; //设置的计时器运行总次数

    public constructor(delay: number,repeatCount: number = 0) {
        super();
        this.delay = delay;
        this.repeatCount = repeatCount;
    }

    public start() {
        this.previous = egret.getTimer();
        this.accTime = 0;
        egret.startTick(this.update,this);
    }

    public reset() {
        this.previous = egret.getTimer();
        this.accTime = 0;
        this.currentCount = 0;
    }

    public stop() {
        egret.stopTick(this.update,this);
    }

    private update(): boolean {
        this.curTime = egret.getTimer();
        this.passTime = this.curTime - this.previous;
        this.previous = this.curTime;
        this.accTime += this.passTime;
        while(this.accTime >= this.delay) {
            this.accTime -= this.delay;
            this.currentCount++;
            if(this.repeatCount > 0 && (this.currentCount == this.repeatCount)) {
                this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER_COMPLETE));
                this.stop();
            }

            this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER));
        }
        return false;
    }


}