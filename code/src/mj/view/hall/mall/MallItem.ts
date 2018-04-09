class MallItem extends eui.ItemRenderer {
    public iconImg: eui.Image;
    public buyBtn: eui.Button;
    public goldLab: eui.Label;
    public hotImg: eui.Image;
    public giveGrp: eui.Group;
    public giveLab: eui.Label;

    public constructor() {
        super();
        this.skinName = "MallItemSkin";
    }

    protected dataChanged() {
        super.dataChanged();

        if (this.data["isG"]) {
            this.buyBtn.getChildByName("diamond").visible = true;
        }

        if (this.data["hot_flag"] == 1) {
            this.hotImg.visible = true;
        }

        if (this.data["give_num"] > 0) {
            this.giveGrp.visible = true;
            this.giveLab.text = "送 " + this.data["give_num"];
        }
    }

    protected childrenCreated() {
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    private onTouch(e: egret.TouchEvent) {
        if (this.data["isG"]) {
            let box = App.MsgBoxManager.getBoxA();
            box.showMsg("确实使用" + this.data["price"] + "钻石购买" + this.data["num"] + "？", this.onBuyGold, this)
        }
    }

    private onBuyGold() {
        (App.getController(HallController.NAME) as HallController).requstBuyGold(this.data["id"])
    }
}