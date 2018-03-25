/**
 * 商城item
 * @author huanglong
 *  2017/03/09
 */

class MallItem extends eui.ItemRenderer {

    public iconImg:eui.Image;
    public nameLab:eui.Label;
    public descLab:eui.Label;
    public priceBtn:eui.Button;

    protected itemData:any;

    public constructor() {
		super();
		this.skinName = "MallItemSkin";
	}

    public dataChanged():void{
        var iData:MallItemData = this.itemData = this.data;

        this.iconImg.source = iData.iconUrl;
        this.nameLab.text = iData.goodsName;
        this.descLab.text = iData.descStr;
        (<eui.BitmapLabel>this.priceBtn.getChildAt(3)).text = iData.price.toString();
    }

    protected childrenCreated() {
        this.priceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(e: egret.TouchEvent) {
        App.getController("HallController").sendBuyProp(this.itemData.goodsId);
    }
}