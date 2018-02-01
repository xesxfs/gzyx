/**
 * 消息提示框
 * @author chenkai
 * @date 2016/7/20
 */
class MessageBox extends eui.Component{
    public static NAME:string = "MessageBox";
    public ok:Function;     //确认回调
    public cancel:Function; //取消回调
    public thisObject;      //执行环境对象

    private okBtn:eui.Button;      //确定按钮
    private cancelBtn:eui.Button;  //取消按钮
    private close:eui.Button;       //关闭
    private msgLabel:eui.Label;   //消息文本
    private closeBtn:eui.Button;  //关闭弹框    

	public constructor() {
    	super();
    	this.touchEnabled = true;
	}
    
    /**
     * 将msgBox显示到弹框层，并显示提示信息
     * @param msg 信息
     */ 
    public showMsg(msg:string, okCallback:Function=null, thisObject:any=null, cancelCallback:Function=null){
        this.ok = okCallback;
        this.thisObject = thisObject;
        this.cancel = cancelCallback;
        if(this.parent == null){
            App.LayerManager.msgLayer.addChild(this);
            this.x = (App.StageUtils.stageWidth - this.width) / 2;
            this.y = (App.StageUtils.stageHeight - this.height) / 2;
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        //关闭按钮
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBt, this);
        this.msgLabel.text = msg;
    }
    
    private onTouch(e: egret.TouchEvent) {
        switch(e.target) {
            case this.okBtn:
                this.ok && (this.ok.call(this.thisObject));
                this.hideAndRecycle();
                break;
            case this.cancelBtn || this.close:
                this.cancel && (this.cancel.call(this.thisObject));
                this.hideAndRecycle();
                break;
        }
    }
    
    /**关闭按钮的相应 */
	private closeBt(){
        this.hideAndRecycle();
    }

    /**左边按钮文字 */
    public leftTitle(label:string){
       this.cancelBtn.label = label;
    }

    /**中间按钮文字 */
    public centerTitle(label:string){
        this.okBtn.label = label;
    }

    /**右边按钮文字 */
    public rightTitle(label:string){
        this.okBtn.label = label;
    }

    //隐藏并回收消息框
    public hideAndRecycle(){
        egret.Tween.removeTweens(this);
        this.ok = null;
        this.cancel = null;
        this.thisObject = null;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeBt, this);
        this.hide();
    }
    
    //隐藏
    public hide(){
        this.parent && this.parent.removeChild(this);
    }
	
	
}
