/**
 * 支付方式ITEM
 * @author huanglong
 *  2017/05/05
 */

class PayMentMethodItem extends eui.ItemRenderer {

    public payNameLab:eui.Label;
    public touchRect:eui.Rect;

    protected itemData:any;

    public constructor() {
		super();
		this.skinName = "PaymentMethodItemSkin";
	}

    public dataChanged():void{
        this.itemData = this.data;

        if (this.itemData.pay_type == 4) {
            this.payNameLab.textFlow = <Array<egret.ITextElement>>[
            {text:"钱包剩余",style:{"size":30,"textColor":0x000000,"fontFamily":"Microsoft YaHei"}},
			{text:"(¥"+this.itemData.name+")",style:{"size":30,"textColor":0x943300,"fontFamily":"Microsoft YaHei"}}];
        }
        else {
            this.payNameLab.text = this.itemData.name;
        }
    }

    protected childrenCreated() {
        this.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(e: egret.TouchEvent) {
        var payMentPanelObj:PaymentPanel = App.PanelManager.getPanel(PanelConst.PaymentPanel)
		payMentPanelObj.changeMethod(this.itemData.pay_type, this.itemData.name);
        App.PanelManager.getPanel(PanelConst.PaymentMethod).hide();
    }
}