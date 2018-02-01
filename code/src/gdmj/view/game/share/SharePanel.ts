/**
 *  分享
 * @author chenkai
 * @date 2016/8/15 
 * 
 * change 2017/05/09
 * huanglong
 */
class SharePanel extends BasePanel{
    /**关闭 */
	private share_close:eui.Button;
    public pengjiBtn:eui.Button;
    public qqBtn:eui.Button;
    public wxBtn:eui.Button;
    public wxfriendBtn:eui.Button;
    public qrCodeImg:eui.Image;
    
	public constructor() {
    	super();
    	this.skinName = "SharePanelSkin";
	}
	
    protected onEnable() {
       this.share_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
       this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
       this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
       this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
       this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);

       this.qrCodeImg.source = App.DataCenter.qrCodeUrl;
    }

    protected onRemove() {
        this.share_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.pengjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
    }

    private onTouchShare(e: egret.Event) {
        var shareType = 0;
        switch(e.target) {
            case this.pengjiBtn:
                shareType = 0;
                break;
            case this.qqBtn:
                shareType = 1;
                break;
            case this.wxBtn:
                shareType = 2;
                break;
            case this.wxfriendBtn:
                shareType = 3;
                break;
            default:
                break;
        }
        TipsLog.hallInfo("分享请求已发送");
        this.shareTo(shareType.toString());
        this.hide();
    }

    private shareTo(shareType:string) {
        var data = {
            gameId:"10004",
            share:shareType,
            gameName:"长沙麻将",
            description:"采用长沙最流行的麻将规则，完美还原长沙当地玩法的正宗长沙麻将！"
        }
        App.NativeBridge.sendNormalShare(data);
    }

    /**关闭 */
	protected close(){
		this.hide();
	} 
	
}
