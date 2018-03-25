/**
 * 大厅底部菜单
 * @author chenwei
 *
 */
class BottomMenu extends BaseUI{
    /**玩法*/
    public ruleBtn:MenuButton;
    /**商城*/
    public shopBtn:MenuButton;
    /**邮件*/
    public emailBtn:MenuButton;
    /**分享*/
    public shareBtn:MenuButton;
    /**福利*/
    public fuliBtn:MenuButton;
    /**反馈*/
    public feedBackBtn:MenuButton;
    /**设置*/
    public setBtn:MenuButton;
    
    private bottomMask:eui.Rect;
    private btnsGroup:eui.Group;
    private rightArrow:eui.Image;
    private leftArrow: eui.Image;
    private ox:number;
    
    public constructor() {
    	super()
	}

    protected childrenCreated() {  
        this.btnsGroup.mask=this.bottomMask;
        this.rightArrow.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRight,this)
        this.leftArrow.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLeft,this)
        this.ox=this.btnsGroup.x   
    }

    private onRight(){
        egret.Tween.get(this.btnsGroup).to({ x: this.ox + this.btnsGroup.width },500).call(() => {
            this.rightArrow.visible = false;
            this.leftArrow.visible = true;
        });
    }
    
    private onLeft(){
        
        egret.Tween.get(this.btnsGroup).to({ x: this.ox},500).call(() => {
            this.rightArrow.visible = true ;
            this.leftArrow.visible = false;
        });
        
    }
}
