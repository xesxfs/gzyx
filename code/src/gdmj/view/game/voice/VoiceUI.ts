/**
 * 微信语音UI
 * @author chenkai
 * @date 2016/8/30
 */
class VoiceUI extends BaseUI{
    private wave0:eui.Image;         //波纹
    private wave1:eui.Image;
    public timeLabel:eui.Label;      //计时文本
    private blueGroup:eui.Group;     //蓝色音量容器
    private blueList = [];           //蓝色音量方块
    
	public constructor() {
    	super();
    	this.skinName = "VoiceUISkin";
	}
	
    protected childrenCreated() {
        for(var i=0;i<5;i++){
            this.blueList.push(this.blueGroup.getChildAt(i));
        } 
    }

    protected onEnable() {
        this.setCenter();
        this.playAnim();
    }

    protected onRemove() {
        this.stopAnim();
    }
    
    private playAnim(){
        //时间文本
        this.timeLabel.text = "00:00";
        
        //波纹动画
        this.wave0.scaleX = 0.7;
        this.wave0.scaleY = 0.7;
        this.wave0.alpha = 1;
        
        this.wave1.scaleX = 0.7;
        this.wave1.scaleY = 0.7;
        this.wave1.alpha = 1;
        
        egret.Tween.get(this.wave0,{loop:true}).to({scaleX:1,scaleY:1,alpha:0},1200).to({scaleX:0.7,scaleY:0.7,alpha:1});
        egret.Tween.get(this).wait(600).call(()=>{
            egret.Tween.get(this.wave1,{loop:true}).to({scaleX:1,scaleY:1,alpha:0},1200).to({scaleX:0.7,scaleY:0.7,alpha:1});
        });
        
        //蓝色音量动画
        var flashTime = 30;
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
    
    private stopAnim(){
        egret.Tween.removeTweens(this.wave0);
        egret.Tween.removeTweens(this.wave1);
        egret.Tween.removeTweens(this);
    }

    public hide(){
        this.parent && this.parent.removeChild(this);
    }
}








