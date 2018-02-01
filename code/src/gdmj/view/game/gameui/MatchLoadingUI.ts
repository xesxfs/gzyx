class MatchLoadingUI extends eui.Component{
	public constructor() {
		super();
	}
	private loadingGroup:eui.Group;
	private loadingLabel:eui.Label;
	private bMatching:boolean=false;
	private delay:number=300;

	public startMatching(){
		if(this.bMatching)return;
		this.bMatching=true;
		this.showMatching();
		egret.Tween.removeTweens(this.loadingLabel);
		egret.Tween.get(this.loadingLabel, { loop: true }).wait(this.delay).call(() => {
                this.loadingLabel.text = "拼命匹配中.";
            }).wait(this.delay).call(() => {
                this.loadingLabel.text = "拼命匹配中..";
            }).wait(this.delay).call(() => {
                this.loadingLabel.text = "拼命匹配中...";
            });
	}

	public stopMatching(){
		egret.Tween.removeTweens(this.loadingLabel);
		this.loadingLabel.text = "牌局即将开始";
		this.bMatching=false;
	}

	public showMatching(){
		this.loadingGroup.visible=true;
	}

	public hideMatching(){
		this.loadingGroup.visible=false;
	}
}