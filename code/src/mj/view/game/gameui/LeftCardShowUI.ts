class LeftCardShowUI extends BaseUI{
	public constructor() {
		super();
	}
	private leftCardLabel:eui.Label;
	/***当前牌局剩余牌数最大值 */
    private leftCardLimit: number = 108;

	public setLeftCard(nCount:number){
		if(nCount){
			this.leftCardLabel.text=nCount.toString();
		}else{
			this.leftCardLabel.text=this.leftCardLimit.toString();
		}
		
	}

	public hide(){
		this.visible=false;
	}

	public show(){
		this.visible=true;
	}
}