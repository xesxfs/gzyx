/**
 *	好友房列表界面
 * @author huanglong
 *	2017/3/23
 */
class FriendPanel extends BasePanel{
    public backBtn:eui.Button;
    public joinBtn:eui.Button;
    public createBtn:eui.Button;
    public joinRoomScroller:eui.Scroller;
    public scroImg1:eui.Image;
    public scroImg2:eui.Image;
    public scroImg3:eui.Image;
    public radioBtnA:eui.RadioButton;
    public radioBtnB:eui.RadioButton;
    public radioBtnC:eui.RadioButton;

    /**滑动开始时间 */
    private scrollStartTime: number;
    /**滑动结束时间 */
    private scrollEndTime: number;
    /**起始位置 */
    private scrollStartH: number;
    /**结束位置 */
    private scrollEndH: number;
    /**图片宽度 */
    private scrolImgWidth:number = 671;

	public constructor() {
		super();
        this.skinName = "FriendPanelTSkin";

        //关闭scroller的松手滑动
        this.joinRoomScroller.throwSpeed = 0;
	}

    protected onEnable() {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoin, this);
        this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCreate, this);
        this.radioBtnA.group.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_START, this.changeStart,this);
        this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_END, this.changeEnd,this);

        this.setUI();
        this.autoScroll();
    }

    protected onRemove() {
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.joinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoin, this);
        this.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCreate, this);
        this.radioBtnA.group.removeEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_START, this.changeStart,this);
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_END, this.changeEnd,this);
    }

    /**初始化界面 */
    private setUI() {
        this.joinRoomScroller.viewport.scrollH = 0;
        this.radioBtnA.selected = true;
    }

    private changeStart() {
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_START, this.changeStart,this);
        this.scrollStartTime = egret.getTimer();
        this.scrollStartH = this.joinRoomScroller.viewport.scrollH;
    }

    private changeEnd() {
        this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_START, this.changeStart,this);
        this.scrollEndTime = egret.getTimer();
        this.scrollEndH = this.joinRoomScroller.viewport.scrollH;

        this.judgeScroll();
    }

    private judgeScroll() {
        var targetH = 0;
        var distanceH = this.scrollEndH-this.scrollStartH;
        var expectH = distanceH/(this.scrollEndTime-this.scrollStartTime)*1000
        if ( Math.abs(distanceH) >= this.scrolImgWidth/2 ) {
            if(distanceH > 0) {
                targetH = this.scrollStartH + this.scrolImgWidth;
            }
            else {
                targetH = this.scrollStartH - this.scrolImgWidth;
            }
        }
        else if (Math.abs(expectH) >= this.scrolImgWidth/2) {
            if(expectH > 0) {
                targetH = this.scrollStartH + this.scrolImgWidth;
            }
            else {
                targetH = this.scrollStartH - this.scrolImgWidth;
            }
        }
        else {
            targetH = this.scrollStartH;
        }

        this.scrollToTarget(targetH, true);
    }

    private scrollToTarget(targetScrollH:number = 0, move:boolean = false) {
        //判断H的值是否合理
        if(targetScrollH != 0 && targetScrollH!= this.scrolImgWidth && targetScrollH!=this.scrolImgWidth*2 && targetScrollH!=this.scrolImgWidth*3) {
            targetScrollH = 0;
        }

        egret.Tween.removeTweens(this.joinRoomScroller.viewport);
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_START, this.changeStart,this);
        this.joinRoomScroller.removeEventListener(eui.UIEvent.CHANGE_END, this.changeEnd,this);
        this.radioBtnA.group.removeEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        var needTime = Math.abs(targetScrollH-this.joinRoomScroller.viewport.scrollH)*300/this.scrolImgWidth;
        egret.Tween.get(this.joinRoomScroller.viewport)
        .to({scrollH:targetScrollH}, needTime)
        .call(()=>{
            if (targetScrollH == this.scrolImgWidth*3) {
                this.setUI();
            }
            this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_START, this.changeStart,this);
            this.joinRoomScroller.addEventListener(eui.UIEvent.CHANGE_END, this.changeEnd,this);
            this.radioBtnA.group.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
            this.autoScroll();
            if (move) {
                this.changeRadio();
            }
        },this);
    }

    /**定时滑动 */
    private autoScroll() {
        egret.Tween.get(this.joinRoomScroller.viewport)
        .wait(3000)
        .call(()=>{
            var targetH = this.joinRoomScroller.viewport.scrollH + this.scrolImgWidth;
            this.scrollToTarget(targetH, true);
        },this)
    }

    /**滑动后刷新小圆点显示 */
    private changeRadio() {
        switch (this.joinRoomScroller.viewport.scrollH) {
            case 0:
                this.radioBtnA.selected = true;
                break;
            case this.scrolImgWidth:
                this.radioBtnB.selected = true;
                break;
            case this.scrolImgWidth*2:
                this.radioBtnC.selected = true;
                break;
            default:
                break;
        }
    }

    /**小圆点选中改变 */
    private onChange() {
        var targetH = 0;
        switch ( Number(this.radioBtnA.group.selectedValue) ) {
            case 0:
                targetH = 0;
                break;
            case 1:
                targetH = this.scrolImgWidth;
                break;
            case 2:
                targetH = this.scrolImgWidth*2;
                break;
            default:
                break;
        }
        this.scrollToTarget(targetH);
    }

    /**加入房间 */
    private onJoin() {
        App.PanelManager.open(PanelConst.JoinNumber);
    }

    /**创建房间 */
    private onCreate() {
        // var json = ProtocolData.Send101000;
        // json.desk_name=App.DataCenter.UserInfo.getMyUserVo().nickName;
        // json.deviceID="111";
        // json.userid=App.DataCenter.UserInfo.getMyUserVo().userID;
        // App.gameSocket.send(ProtocolHead.Send101000,json);

    }

	/**返回 */
	private back(){
        egret.Tween.removeTweens(this.joinRoomScroller.viewport);
		this.hide();
	}
}