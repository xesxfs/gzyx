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
            //钻石购买金币
            var httpsender = new HttpSender();
            var request = ProtocolHttp.send_BuyGold;
            request.param.buy_id = this.data["id"];
            httpsender.send(request, this.revBuyGold, this)
        }
    }

    private revBuyGold(rev:any) {
        if (rev.data) {
            App.EventManager.sendEvent(EventConst.UpdateGold, rev.data.cur_gold);
            App.EventManager.sendEvent(EventConst.UpdateDiamond, rev.data.cur_diamonds);
        }
    }
}