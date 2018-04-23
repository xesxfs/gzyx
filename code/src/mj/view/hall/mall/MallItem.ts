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

        if (this.data["type"] != MallType.Diamond) {
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
        if (this.data["type"] == MallType.Gold || this.data["type"] == MallType.Ticket) {
            let box = App.MsgBoxManager.getBoxA();
            let msg = "确实使用" + this.data["price"] + "钻石购买" + this.data["num"] + "？";
            box.showMsg(msg, this.onBuyGold, this);
        }
    }

    private onBuyGold() {
        let ctrl = App.getController(HallController.NAME) as HallController;
        if (this.data["type"] == MallType.Gold) ctrl.requstBuyGold(this.data["id"]) //钻石购买金币
        else ctrl.sendBuyTicket(this.data["id"]);   //钻石购买房卡
    }
}