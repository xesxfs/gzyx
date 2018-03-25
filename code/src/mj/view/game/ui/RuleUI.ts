/**
 * 规则UI
 * @author chenkai
 * @date 2016/9/1 
 *
 */
class RuleUI extends BaseUI{
    /**背景*/
    private menuBg:eui.Image;
    /**上箭头*/
    private upArrow:eui.Image;
    /**下箭头*/
    private downArrow:eui.Image;
    /**系统时间*/
    private systemTimeUI:SystemTimeUI;
    /**麻将类型*/
    public ruleLabel:eui.Label;
    /**菜单遮照*/
    private menuMask:eui.Rect;
    /**菜单容器*/
    private menuGroup:eui.Group;
    /**房间号*/
    public roomLabel:eui.Label;
    /**底分*/
    public betLabel:eui.Label;
    /**游戏规则*/
    public ruleList = [];
    /**修改按钮*/
    public modifyBtn:eui.Image;
    /**menuGroup初始位置*/
    private initMenuGroupY:number = 0;
    
	public constructor() {
    	super();
    	this.skinName = "RuleUISkin";
        this.upArrow.touchEnabled = false;
        this.downArrow.touchEnabled = false;
        this.systemTimeUI.touchEnabled = false;
        this.ruleLabel.touchEnabled = false;
	}
	
    protected childrenCreated() {
        this.menuGroup.mask = this.menuMask;

        for(var i=2;i<10;i++){
             this.ruleList.push(this.menuGroup.getChildAt(i));
             this.ruleList[i-2].text = "";
         }
         this.downArrow.visible = false;
         this.upArrow.visible = true;

         this.initMenuGroupY = this.menuGroup.y;
    }

    protected onEnable() {
        this.systemTimeUI.start();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    protected onRemove() {
        this.systemTimeUI.stop();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    private onTouchTap(e:egret.TouchEvent){
        switch(e.target){
            case this.menuBg:
            case this.downArrow:
            case this.upArrow:
                this.foldMenu();
            break;
            case this.modifyBtn:
                this.onModify();
            break;
        }
            
    }

    /**折叠菜单*/
    private foldMenu(){
        if(this.upArrow.visible){
            egret.Tween.get(this.menuGroup).to({y:this.initMenuGroupY - this.menuMask.height},500).call(()=>{
                this.upArrow.visible = false;
                this.downArrow.visible = true;
            });
        }
        if(this.downArrow.visible){
            egret.Tween.get(this.menuGroup).to({y:this.initMenuGroupY},500).call(()=>{
                this.upArrow.visible = true;
                this.downArrow.visible = false;
            });
        }
    }

    /**修改规则*/
    private onModify(){

    }



	
}
