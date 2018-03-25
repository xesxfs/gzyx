/**
 * 番型项
 * @author chenkai 
 * @date 2016/8/31
 */
class FanTypeItem extends eui.Component{
    private nameLabel:eui.Label;      //番型名
    private descripeLabel:eui.Label;  //番型描述
    private cardGroup:eui.Group;      //牌容器
    
	public constructor() {
        super();	  
        this.skinName = "FanTypeItemSkin";
	}
	
	public setName(fanName:string){
    	this.nameLabel.text = fanName;
	}
	
	public setDescripe(des:string, color:any = null){
    	this.descripeLabel.text = des;

		if (color) {
			this.descripeLabel.textColor = color;
		}

		//描述超过两行时，牌容器下移和Item高度增加
		if(this.descripeLabel.numLines >= 2){
			var offerY = this.descripeLabel.size*(this.descripeLabel.numLines-1)
			this.cardGroup.y += offerY;
			this.height += offerY;
		}
	}
	
	public setCardList(cardList){
    	  var len = cardList.length;
    	  var card:Card;
          var cardFactory: CardFactory = CardFactory.getInstance();
    	  for(var i=0;i<len;i++){
              card = cardFactory.getOutCard(cardList[i], UserPosition.Down);
			  card.scaleX = 0.8;
			  card.scaleY = 0.8;
        	  card.x = 0.7*card.width*i;
			  card.y = 0;
        	  this.cardGroup.addChild(card);
    	  }

		  //牌数组为0时，Item高度减少
		  if(len == 0){
			  this.height += (this.descripeLabel.numLines-2)*this.descripeLabel.size-50;
		  }
	}
}
