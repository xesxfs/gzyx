/**
 * 商城界面
 * @author eyanlong 
 * @date 2017/2/21
 */

class MallPanelT extends BasePanel{

	public mall_back:eui.Button;
	public mallList:eui.List;
    public mallScroller:eui.Scroller;
    public reFreshGroup:eui.Group;
    public arrowDown:eui.Image;
    public arrowUp:eui.Image;
    public arrowAmation:eui.Image;
    public reMask:eui.Rect;

    private timeOutKey: number;

	public constructor() {
		super();
		this.skinName = "MallPanelSkin";
        this.reFreshGroup.mask = this.reMask;
	}

	protected onEnable() {
        this.mall_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.mallScroller.addEventListener(egret.TouchEvent.CHANGE, this.change, this);
        this.mallScroller.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
        this.mallScroller.touchEnabled = false;
        this.mallList.touchEnabled = false;

		this.setData(this.recData);
    }

    protected onRemove() {
        this.mall_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.mallScroller.removeEventListener(egret.TouchEvent.CHANGE, this.change, this);
        this.mallScroller.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
    }

	/**设置数据 */
    private setData(list: Array<any>) {
        let ac = new eui.ArrayCollection();
        let arr = [];
        // for(var i = 0; i < list.length; i++) {
		// 	let dataObj = new MallItemData();
		// 	dataObj.setData(list[i]);

        //     arr.push(dataObj);
        // }

        /**test */
        for(var i = 0;i < 20; i ++) {
            let dataObj = new MallItemData();
            arr.push(dataObj);
        }
        console.log("addChange Listenervvvv");

        ac.source = arr;
        this.mallList.dataProvider = ac;
        this.mallList.itemRenderer = MallItem;
    }

    /**test */
    private change() {
        var v = this.mallScroller.viewport.scrollV;
        console.log(v);
        if (v > 0) return;

        this.reFreshGroup.y = -v;
        this.refreshShow(-v);
    }

    private end() {
        var v = this.mallScroller.viewport.scrollV;

        egret.Tween.removeTweens(this.arrowAmation);
        egret.clearTimeout(this.timeOutKey);
        this.timeOutKey
        if (-v >= 100) {
            this.mallScroller.stopAnimation();
            this.mallScroller.viewport.scrollV = -100;
            this.reFreshGroup.y = 100;
            this.arrowAmation.visible = true;
            this.arrowDown.visible = false;
            this.arrowUp.visible = false;

            this.mallScroller.touchEnabled = false;

            egret.Tween.get(this.arrowAmation, {loop:true}).to({rotation:360}, 1000);
            this.timeOutKey = egret.setTimeout(this.requestSuccess, this, 3000);
        }
    }

    /**模拟请求成功 */
    private requestSuccess() {
        egret.Tween.removeTweens(this.arrowAmation);
        egret.clearTimeout(this.timeOutKey);

        this.reFreshGroup.y = 0;
        this.mallScroller.viewport.scrollV = 0;
        this.mallScroller.touchEnabled = true;
    }

    /**刷新位置显示 */
    private refreshShow(v: number) {
        if(v < 100) {
            this.arrowDown.visible = true;
            this.arrowUp.visible = false;
        }
        else {
            this.arrowDown.visible = false;
            this.arrowUp.visible = true;
        }
        this.arrowAmation.visible = false;
    }

	/**返回 */
	protected back(){
		this.hide();
	}
}