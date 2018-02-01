/**
 *
 * @author chenwei
 *
 */
class RoomBtn extends BaseUI{
	public constructor() {
    	super();
    	this.bounceTime=1500;
    	this.skinName="RoomBtnSkin";	
	}
    private maskRect:eui.Rect;
    private roomBtn:eui.Image;    
//    public roomSource: string;
    
    private dwonGroup:eui.Group;
    
    private dwonGroupx;
    private dwonGroupy;
    
    private ox;
    private oy;
    
    private bounceTime;
    
    private callFun:Function;    
    private clickFun:Function;
    
    private thisObj:any;
    
    
    protected childrenCreated() {       
        this.dwonGroupx = this.dwonGroup.x;
        this.dwonGroupy = this.dwonGroup.y;     
        this.ox = this.x;
        this.oy = this.y;     

    }
    
    public set roomSource(s:string){
        this.roomBtn.source =s;
    }
    
    protected onEnable() {        
        this.roomBtn.mask = this.maskRect;
        this.down();
    }
    
    private down(){   
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);      
        egret.Tween.get(this.dwonGroup).wait(500).to({ y: 130 },this.bounceTime,egret.Ease.bounceOut);
//        egret.Tween.get(this).wait(500).to({ y: this.oy+50 },this.bounceTime,egret.Ease.bounceOut);
        
    }
    
    private onTouch(e:egret.Event){     
        this.clickFun && this.clickFun.call(this.thisObj); 
    }
    
    public up(){  
        
        egret.Tween.get(this.dwonGroup).to({ y: this.dwonGroupy },this.bounceTime,egret.Ease.bounceOut);
        egret.Tween.get(this).to({ y: this.oy},this.bounceTime,egret.Ease.bounceOut).call(this.callBack,this);
        
    }
    
    public addCallBack(call:Function,thisObj:any){       
        this.callFun=call;
        this.thisObj=thisObj;        
    }
    
    public addClickCall(call: Function,thisObj: any) {
        this.clickFun = call;
        this.thisObj = thisObj;
    }
    
    private callBack(){
        this.callFun&&this.callFun.call(this.thisObj);
    }
    
    protected onRemove(){        
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.dwonGroup);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this.dwonGroup.x=this.dwonGroupx;
        this.dwonGroup.y=this.dwonGroupy;        
        this.x=this.ox;
        this.y=this.oy;  
    }
	
}
