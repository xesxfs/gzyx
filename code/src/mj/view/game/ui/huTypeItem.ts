/**
 * @author xiongjian
 * 2017-3-28
 */
class HuTypeItem extends eui.ItemRenderer{
    public constructor(){
        super();
        this.skinName = "huTypeItemSkin"
        this.touchEnabled =true;
    }

    private cardListGroup:eui.Group;
    private huLabel:eui.Label;
    private cardList=[];

     public dataChanged():void{
         this.cardList = this.data.cardList;
         this.huLabel.text = this.data.hulabel;
        //  console.log("cardlist"+this.data.cardList);
         this.setCardList(this.cardList);
     }


     protected childrenCreated() {
         this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
         
     }


    private onTouch(){
        // var nextCardJson = ProtocolData.Send180_99_0;
        // nextCardJson.seatID = App.DataCenter.UserInfo.getMyUserVo().seatID;
        // nextCardJson.cardList = this.cardList;
        // App.gameSocket.send(ProtocolHead.Send180_99_0, nextCardJson);

        // console.log("发送确认下14张牌值");
        // TipsLog.gameInfo("发送成功");
        // App.PanelManager.close(PanelConst.HuTypePanel);
    }

     	public setCardList(cardList){
    	  var len = cardList.length;
    	  var card:Card;
          var cardFactory: CardFactory = CardFactory.getInstance();
    	  for(var i=0;i<len;i++){
              card = cardFactory.getOutCard(cardList[i], UserPosition.Up);
        	  card.x = 40*i;
			  card.y = 0;
        	  this.cardListGroup.addChild(card);
    	  }

	}

}