/**
 * 背包item
 * @author huanglong
 *  2017/03/09
 */

class BackpackItem extends eui.ItemRenderer {

    public goodsName:eui.Label;
    public descLab:eui.Label;
    public useBtn:eui.Button;
    public goodsImg:eui.Image;
    public goodsNum:eui.Label;

    protected itemData:any;

    public constructor() {
		super();
		this.skinName = "BackpackItemSkin";
	}

    public dataChanged():void{
        var iData = this.itemData = this.data;

        this.goodsName.text = iData.name;
        this.descLab.text = iData.desc;
        if(iData.icon != "") {
            this.goodsImg.source = iData.icon;
        }
        else {
            this.goodsImg.source = App.getController("HallController").getUrl( Number(iData.id) );
        }
        this.goodsNum.text = "X"+iData.count;

        if(iData.gameBool){
            this.useBtn.visible =false;
        }else{
            this.useBtn.visible=true;
        }
    }

    protected childrenCreated() {
        this.useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(e: egret.TouchEvent) {
        // var ctlr =<HallController> App.getController(HallController.NAME)
        // ctlr.createFriendRoom();
    }
}