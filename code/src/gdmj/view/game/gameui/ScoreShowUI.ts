class ScoreShowUI extends eui.Component{
	public constructor() {
		super();
	}
	private gangFenGroup:eui.Group;
	private zhenFen:Array<eui.BitmapLabel>=[];
	private fuFen:Array<eui.BitmapLabel>=[];

	protected childrenCreated(){
		this.init();
		this.hideAllScore();
	}

	private init(){
		for(let i=0;i<4;i++){
			let zhen =this.gangFenGroup.getChildAt(i) as eui.BitmapLabel;
			let fu =this.gangFenGroup.getChildAt(i + 4) as eui.BitmapLabel;
			this.zhenFen.push(zhen);
            this.fuFen.push(fu);
		}
	}

	public showScore(pos:UserPosition,score:number){
		if(score>0){
			this.showZhenScore(pos,score);
		}else{
			this.showFuScore(pos,score);
		}
	}

	private showFuScore(pos:UserPosition,score:number){
		this.fuFen[pos].text=score.toString();
		this.gangFenGroup.addChild(this.fuFen[pos]);
		this.tweenRemove(this.fuFen[pos]);
	}


	private showZhenScore(pos:UserPosition,score:number){
		this.zhenFen[pos].text="+"+score.toString();
		this.gangFenGroup.addChild(this.zhenFen[pos]);
		this.tweenRemove(this.zhenFen[pos]);
	}

	public hideScore(pos:UserPosition){
		this.zhenFen[pos].parent&&this.zhenFen[pos].parent.removeChild(this.zhenFen[pos]);
		this.fuFen[pos].parent&&this.fuFen[pos].parent.removeChild(this.fuFen[pos]);
	}

	public hideAllScore(){
		this.gangFenGroup.removeChildren();
	}

	private tweenRemove(gang:eui.BitmapLabel){
		egret.Tween.removeTweens(gang);
		gang.alpha=1;
		egret.Tween.get(gang).wait(1500).to({ y: gang.y - 100, alpha: 0 }, 1000).call(() => {gang.parent && gang.parent.removeChild(gang);gang.y+=100;});
	}

}