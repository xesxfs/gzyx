class RoundResultItem extends BaseUI {

	public headImg: eui.Image;
	public nickNameLab: eui.Label;
	public uidLab: eui.Label;
	public scoreLab: eui.Label;
	public card_typeImg: eui.Image;
	public end_typeImg: eui.Image;

	public constructor() {
		super();
		this.skinName = "RoundResultItemSkin"
	}

	public setHead(src: string) {
		if (!src) return;
		this.headImg.source = src;
	}

}