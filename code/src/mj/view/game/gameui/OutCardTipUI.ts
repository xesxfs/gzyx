// TypeScript file
class OutCardTipUI extends eui.Component{
    public constructor(){
        super();
    }

    private outEffectGroup:eui.Group;
    private outEffectTime: number = 2000; //出牌效果显示时间ms
    private outEffectList:Array<eui.Group>;
    protected childrenCreated(){
        this.init();
        this.hideAllOutEffect();
    }
    private init(){
        this.outEffectList=[]
        let len=this.outEffectGroup.numChildren;
        for(let i=0;i<len;i++){
            let group=this.outEffectGroup.getChildAt(i) as eui.Group;
            this.outEffectList.push(group);
        }
    }
    
    //显示出牌效果
    public showOutEffect(cardValue: number, pos: UserPosition) {
        this.hideAllOutEffect();
        var group: eui.Group = this.outEffectList[pos];
        if (group.numChildren <= 1) {
            var card: Card = CardFactory.getInstance().getHandCard(cardValue, UserPosition.Down);
            group.addChild(card);
            card.x = (group.width - card.cardBg.width) / 2 + 2; //微调
            card.y = (group.height - card.cardBg.height) / 2 + 2;
        } else {
            card = <Card>group.getChildAt(1);
            card.setHandSkin(cardValue, UserPosition.Down);
        }
        this.outEffectGroup.addChild(group);
        egret.Tween.removeTweens(group);
        egret.Tween.get(group).wait(this.outEffectTime).call(() => {
            group.parent && group.parent.removeChild(group);
        });
    }

    //隐藏所有出牌效果
    public hideAllOutEffect() {
        this.outEffectGroup.removeChildren();
        
    }
}