/**
 * 2017-3-8
 * author:
 */
class GameResultItem extends eui.ItemRenderer {

    public constructor() {
        super();
        this.skinName = "gameResultItemSkin";
    }

    private headImg: eui.Image;
    public nickNameLab: eui.Label;
    public uidLab: eui.Label;
    public paixLab: eui.Label;
    public scoreLab: eui.Label;
    public goldLab: eui.Label;

    public setHead(src: string) {
        if (!src) return;
        this.headImg.source = src;
    }


}