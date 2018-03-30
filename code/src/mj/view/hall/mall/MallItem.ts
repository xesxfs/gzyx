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
        console.log(this.data);

        if (this.data["isG"]) {
            this.buyBtn.getChildByName("diamond").visible = true;
        }

        if (this.data["hot_flag"] == 1) {
            this.hotImg.visible = true;
        }

        if (this.data["give_num"] > 0) {
            this.giveGrp.visible = true;
            this.giveLab.text = this.data["give_num"];
        }
    }

    protected childrenCreated() {
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    private onTouch(e: egret.TouchEvent) {

    }
}