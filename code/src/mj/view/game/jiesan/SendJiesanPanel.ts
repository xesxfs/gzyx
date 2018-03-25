/**
 * @author xiongjian 
 * 2017-4-11
 * 解散房间面板
*/

class SendjiesanPanel extends BasePanel {
    public constructor() {
        super();
        this.skinName = "sendJiesanPanelSKin";
    }

    public jujueBtn: eui.Button;
    public okBtn: eui.Button;
    public closeBtn: eui.Button;

        /**添加到场景中*/
    protected onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.jujueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.jujueTouch,this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okTouch,this);
    }


    public jujueTouch(){
        this.close();
    }

    public okTouch(){
        //发送解散房间
       let gameCtrl :GameController = App.getController(GameController.NAME);
    //    gameCtrl.sendJieSan();
       this.close();
       TipsLog.gameInfo("消息已发送");
    }

    public close(){
        this.hide();
    }

}