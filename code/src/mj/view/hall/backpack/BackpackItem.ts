/**
 * 背包item
 * @author huanglong
 *  2017/03/09
 */

class BackpackItem extends eui.ItemRenderer {
    public itemImg: eui.Image;

    public constructor() {
        super();
        this.skinName = "BackpackItemSkin";
    }

    public dataChanged(): void {
        super.dataChanged();
    }

    protected childrenCreated() {
        this.itemImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(e: egret.TouchEvent) {
        App.EventManager.sendEvent(EventConst.ShowItemDesc, this.data)
    }
}