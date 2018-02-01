/**
 * 系统时间UI
 * 游戏中显示系统时间，例如21:36，冒号每秒钟闪烁一次
 * @author chenkai
 * @date 2016/6/29
 * 
 * Example:
 * 1. 拖拽SystemTimeUI自定义组件到exml，并设置自定义皮肤SystemTimeUISkin
 * 2. this.systemTimeUI.startTimer(); //开始计时
 * 
 */
class SystemTimeUI extends eui.Component{
    private hourLabel:eui.Label;   //小时
    private minLabel:eui.Label;    //分钟
    private colonLabel:eui.Label;  //冒号
    private timeCount:number = 0;  //计数，超过1分钟后更新一次时间
    private timeLimit:number = 120;//每分钟闪烁120次
    private date: Date;            //日期
    private timer:egret.Timer = new egret.Timer(500); //计时器
    
	public constructor() {
    	super();
    	this.skinName = "SystemTimeUISkin";
    	this.touchChildren = false;
    	this.touchEnabled = false;
	}
	
	//开始计时
	public start(){
    	 this.timeCount = 0;
    	 this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
    	 this.timer.reset();
    	 this.timer.start();
    	 this.updateInfo();
	}
	
	//计时处理
    private onTimerHandler(){
    	 this.colonLabel.visible = !this.colonLabel.visible;
    	 this.timeCount++;
    	 if(this.timeCount >= this.timeLimit){ 
        	 this.timeCount = 0;
             this.updateInfo(); 
    	 }
	}
	
	//停止计时
    public stop(){
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler, this);
    	  this.timer.stop();
	}
	
	//更新时间
    private updateInfo(){
		this.date = new Date();
        this.hourLabel.text = NumberTool.formatTime(this.date.getHours());
        this.minLabel.text = NumberTool.formatTime(this.date.getMinutes());
	}
	
}
