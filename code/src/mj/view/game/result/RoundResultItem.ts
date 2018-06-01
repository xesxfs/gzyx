class RoundResultItem extends BaseUI {

	public headImg: eui.Image;
	public nickNameLab: eui.Label;
	public uidLab: eui.Label;
	public scoreLab: eui.Label;
	public card_typeImg: eui.Image;
	public end_typeImg: eui.Image;
	public maskImg: eui.Image;
	public bgImg:eui.Image;
	public bankerImg:eui.Image;
	
	public constructor() {
		super();
		this.skinName = "RoundResultItemSkin"
	}

	protected childrenCreated() {
		this.headImg.mask = this.maskImg;
	}

	public setHead(src: string) {
		if (!src) return;
		this.headImg.source = src;
	}

}