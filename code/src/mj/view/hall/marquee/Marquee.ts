/**
 *
 * @author chenwei
 * 2016/07/18
 */
class Marquee extends BaseUI{
	public constructor() {
    	super();
    	this.skinName="MarqueeSkin";
	}
	
    private rockLab:eui.Label;
    private rockMark:eui.Rect;    
    private rollingArray:Array<string>;
    private cid;
    private IsRolling:boolean;
    private v:number//播放速度
    
    protected childrenCreated(){
        this.init();
    }
    
    private init() {
        this.rollingArray= [];
        this.IsRolling=false;
        this.rockLab.mask = this.rockMark;
        this.rockLab.x = this.width;
        this.v = 0.07
    }
    
    protected onEnable() {
    }
    
    public startRolling(){
        var self = this;
        //固定跑马灯
         let msgMarq =App.DataCenter.marqueeInfo.messageMarquee
         
        let rock =function(){
            //跑马灯播放完毕
            if(self.rollingArray.length<=0){
                //插入固定跑马灯
                if(msgMarq.length){                    
                    msgMarq.forEach((msgg)=>{
                        self.rollingArray.push(msgg);                    
                        })
                    
                }else{
                    self.IsRolling = false;
                    return
                }

            }
            self.IsRolling =true;
            let msg = self.rollingArray.shift();
            self.rockLab.text = msg
            let tw = egret.Tween.get(self.rockLab);
            tw.to({ x: self.rockMark.x - self.rockLab.width },(self.rockMark.width + self.rockLab.width) / self.v);
            tw.to({ x: self.rockMark.x + self.rockMark.width})
            tw.call(rock,self);     
            
        }
        rock();
    }
        
    /**
     * 
     * @param msg 跑马灯消息
     * @param count 播放次数
     */
    public push(msg:string,count:number=1){
        for (let i=0;i<count;i++){
            this.rollingArray.unshift(msg);
        }       
        if(!this.IsRolling)this.startRolling();
    }
    
    public stopRolling(){
        egret.Tween.removeTweens(this.rockLab);
        this.IsRolling = false;
    }
    
    protected onRemove() {
        this.stopRolling();
    }
}
