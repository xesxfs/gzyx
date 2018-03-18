/**
 * 弹框管理
 * @author chen
 * @date 2016/6/28
 */
class PopUpManager extends SingleClass{
    private lockBg: egret.Sprite;   //半透明黑色背景
    private curPanel:BasePanel;     //当前显示的面板
    private lockCount:number = 0;   //黑色背景锁定次数
    private clickClose = [];        //点击黑色背景关闭弹框
    private clickCallback = [];     //点击背景回调列表
    private thisObjectList = [];    //回调域
    private panelList:Array<BasePanel> = [];
    
public constructor() {
        super();
    	this.createLockBg();
	}
	
    /**
     * 显示弹框
     * @panel 弹框
     * @lock 是否锁定屏幕(增加黑色半透明背景)
     * @click 是否监听点击黑色背景关闭弹框事件
     */ 
    public addPopUp(panel: BasePanel,lock: boolean = true,click:boolean = true,clickCallback:Function = null,thisObject:any = null) {
        var popLayer = App.LayerManager.popLayer;
        if (this.curPanel == panel) {
            console.log("panel repitition!!!!!!!!!!!!!");
            this.curPanel.hide();
        }
        if(lock) {
            this.lockCount++;
            popLayer.addChild(this.lockBg);
        }
        
        this.clickClose[this.lockCount] = click;
        this.clickCallback[this.lockCount] = clickCallback;
        this.thisObjectList[this.lockCount] = thisObject;
        
        popLayer.addChild(panel);
        this.curPanel = panel;
        this.panelList.push(panel);
    }

    /**移除弹框*/
    public removePopUp(panel: BasePanel) {
        panel.parent && panel.parent.removeChild(panel);
        var popLayer = App.LayerManager.popLayer;
        this.lockCount--;
        if(this.lockCount > 0){ //有多个弹框时，将黑色背景移动至其他弹框下
            //this.clickClose[this.lockCount] = false;
            popLayer.setChildIndex(this.lockBg,popLayer.numChildren - 2);   
        }else{
            this.lockCount = 0;
            this.clickClose[this.lockCount] = false;
            this.clickCallback[this.lockCount] = null;
            this.thisObjectList[this.lockCount] = null;
            this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
            this.curPanel = null
        }
        this.panelList.pop();
        if(this.panelList.length > 0) {
            this.curPanel = this.panelList[this.panelList.length-1];
        }
        if (this.panelList.length < 1) {
            this.curPanel = null;
            this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
        }
    }

    /**移除所有弹框*/
    public removeAllPopUp() {
        var popLayer = App.LayerManager.popLayer;     
        popLayer.removeChildren();
        this.lockBg.parent && this.lockBg.parent.removeChild(this.lockBg);
        this.lockCount = 0;
        this.clickClose.length = 0;
        this.clickCallback.length = 0;
        this.thisObjectList.length = 0;
        this.curPanel = null;
    }
    
    /**改变透明度*/
    public changeTransparency(transparency:number){
        this.lockBg.alpha = transparency;
    }

    //创建黑色半透明背景
    private createLockBg() {
        this.lockBg = new egret.Sprite();
        this.lockBg.graphics.beginFill(0x000000,0.7);
        var stage = App.StageUtils.stage;
        this.lockBg.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight);
        this.lockBg.graphics.endFill();
        this.lockBg.touchEnabled = true;
        this.lockBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    } 
    
    //点击黑色背景
    private onTouchTap(){
        if(this.clickClose[this.lockCount]){
            if (this.clickCallback[this.lockCount]) {
                this.clickCallback[this.lockCount].bind(this.thisObjectList[this.lockCount])();
            }
            else {
                this.removePopUp(this.curPanel);
            }
        }
    }

    /**
     * 设置当前弹窗点击背景回调和域
     */
    public setClickCallback(clickCallback:Function, thisObject:any = null) {
        if(!this.clickClose[this.lockCount]) {
            console.log("点击背景关闭为False,设置回调无用");
        }
        this.clickCallback[this.lockCount] = clickCallback;
        this.thisObjectList[this.lockCount] = thisObject;
    }
}
