/**
 * 分享总战绩item
 * @author huanglong
 *  2017/05/09
 */

class ShareTotalItem extends eui.ItemRenderer {

    public bgImg:eui.Image;
    public headImg:eui.Image;
    public headMaskImg:eui.Image;
    public ownerImg:eui.Image;
    public numImg:eui.Image;
    public numLab:eui.Label;
    public nameLab:eui.Label;
    public zimoLab:eui.Label;
    public hupaiLab:eui.Label;
    public zhongniaoLab:eui.Label;
    public winNumLab:eui.BitmapLabel;

    public constructor() {
		super();
		this.skinName = "ShareTotalItemSkin";
	}

    protected childrenCreated() {
    }

    public dataChanged():void{
        var itemData = this.data;
        console.log("itemData++++++", itemData);

        if (itemData.self) {
            this.bgImg.texture = RES.getRes("share_record_self_png")
        }
        else {
            
            this.bgImg.texture = RES.getRes("share_record_else_png")
        }
        if (itemData.rank == 1) {
            this.numImg.visible = true;
            this.numLab.visible = false;
        }
        else {
            this.numImg.visible = false;
            this.numLab.visible = true;
            this.numLab.text = itemData.rank + "";
        }
        this.nameLab.text = StringTool.formatNickName(itemData.name +"");
        let point = parseInt(itemData.point);
        if (point > 0) {
            this.winNumLab.font = "win_fnt";
            this.winNumLab.text = "+" + itemData.point;
        } else {
            this.winNumLab.font = "lose_fnt";
            this.winNumLab.text = "" + itemData.point;
        }

        this.zimoLab.text = itemData.ziMoNum + "";
        this.hupaiLab.text = itemData.huPaiNum + "";
        this.zhongniaoLab.text = itemData.zhongNiaoNum + "";
        this.ownerImg.visible = itemData.ower;

        this.headImg.mask = this.headMaskImg;
        this.headImg.source = itemData.avatar;
    }
}