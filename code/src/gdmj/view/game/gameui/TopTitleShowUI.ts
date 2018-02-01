class TopTitleShowUI extends eui.Component{
	public constructor() {
		super();
	}
	private matchTitleGroup;
    private friendTitleGroup;
	private t_jushu:eui.BitmapLabel;
	private t_desknum:eui.BitmapLabel;
	protected childrenCreated(){
	}

	public showFriendTitle(){
		this.matchTitleGroup.visible = false;
    	this.friendTitleGroup.visible = true;
	}

	public showMatchTitle(){
		this.matchTitleGroup.visible = true;
    	this.friendTitleGroup.visible = false;
	}

	public setDeskNum(deskNo:number){
		this.t_desknum.text = deskNo.toString();
	}

	public resetDeskNum(){
		this.t_desknum.text ="";
	}

	public setJuShu(cur:number,max:number){
		let maxStr=max.toString();
		if(max>999){
			maxStr='-'
		}
		this.t_jushu.text= cur.toString()+"/"+maxStr;

	}
}