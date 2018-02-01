/**
 * 2017-3-8
 * author:xiongjian
 */
class GameResultItem extends eui.ItemRenderer {

    public constructor() {
        super();
        this.skinName = "gameResultItemSkin";
    }

    private fenLabel: eui.BitmapLabel;
    private nameLabel: eui.Label;
    private IDLabel: eui.Label
    private huTypeLabel: eui.Label;
    private zhongniaoLabel: eui.Group;
    private hupaiGroup: eui.Group;
    private avaterImg: eui.Image;
    private zhongNiaoGroup: eui.Group;
    public typeLabel:eui.Label;
    public headMaskImg:eui.Image;


    private offX =36; 
    private cardOff = 86;

    public dataChanged() {

        console.log("item==", this.data);
        let point = parseInt(this.data.point);
        if (point > 0) {
            this.fenLabel.font = "win_fnt";
            this.fenLabel.text = "+" + this.data.point;
        } else {
            this.fenLabel.font = "lose_fnt";
            this.fenLabel.text = "" + this.data.point;
        }

        this.typeLabel.text= this.data.type;
        this.nameLabel.text =  this.data.name;
        //this.avaterImg.source = this.data.headUrl;

        var headUrl = this.data.headUrl;
        if (headUrl && headUrl != "") {
            this.avaterImg.source = headUrl;
            this.avaterImg.mask = this.headMaskImg;
        }

        let qiShouHu = this.data.qiShouHu;
        let niao = this.data.niao;

        if (niao.length > 0) {
            this.zhongNiaoGroup.visible = true;
            if (qiShouHu) {
                this.setDiceList(niao);
            } else {
                this.setNiaoList(niao);
            }
        } else {
            this.zhongNiaoGroup.visible = false;
        }

        let huType = this.data.huType;
        if (huType) {
            let text="";
            for (let i =0;i<huType.length;i++) {
                 text =text + "" + App.DataCenter.GameInfo.csHuTypeList[huType[i]] + "  ";
                 
            }
            this.huTypeLabel.text = text;
        } else {
            this.huTypeLabel.visible = false;
        }

        // let cardList = [0x11];
        // let ganglist =[0x11,0x22];
        let ganglist = this.data.gangCards;
        let cardList = this.data.handCards;
        let cardX = this.setGangList(ganglist);
        this.setCardList(cardList,cardX);
    }

    //杠牌
    public setGangList(ganglist) {
        var len = ganglist.length;

        let cardX =0;

        var card: Card;
        var cardFactory: CardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {

            for (let j = 0; j < 4; j++) {
                if (j == 3) {
                    card = cardFactory.getOutCard(ganglist[i], UserPosition.Down);
                    card.x = this.cardOff + this.offX * (i * 3 + 1);
                    card.y = -10;
                    card.scaleX = 0.70;
                    card.scaleY = 0.70;
                    this.hupaiGroup.addChild(card);
                } else {
                    card = cardFactory.getOutCard(ganglist[i], UserPosition.Down);
                    card.x = this.cardOff + this.offX * (i * 3 + j);
                    card.y = 3;
                    card.scaleX = 0.70;
                    card.scaleY = 0.70;
                    this.hupaiGroup.addChild(card);
                    cardX = card.x + this.offX;
                }

            }


        }

        return cardX ;
    }

    //胡牌
    public setCardList(cardList,cardX) {
        var len = cardList.length;
        var card: Card;
        var cardFactory: CardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(cardList[i], UserPosition.Down);
            // card.x = 50 + this.offX * i;
            if(cardX < this.cardOff){
                cardX =this.cardOff;
            }
            card.x =cardX + this.offX * i;
            card.y = 3;
            card.scaleX = 0.70;
            card.scaleY = 0.70;
            this.hupaiGroup.addChild(card);
        }

    }

    //骰子鸟
    private setDiceList(niaoList) {
        var len = niaoList.length;
        for (let i = 0; i < len; i++) {
            let niao: eui.Image = new eui.Image();
            niao.source = RES.getRes("s" + niaoList[i] + "_png");
            console.log("niao" + niao.source);
            niao.x = 50 + 50 * i;
            niao.y = -6;
            niao.scaleX = 0.8;
            niao.scaleY = 0.8;
            this.zhongNiaoGroup.addChild(niao);
        }
    }

    //牌鸟
    private setNiaoList(niaoList) {
        var len = niaoList.length;
        var card: Card;
        var cardFactory: CardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(niaoList[i], UserPosition.Down);
            card.x = 50 + this.offX * i;
            card.y = -10;
            card.scaleX = 0.6;
            card.scaleY = 0.6;
            this.zhongNiaoGroup.addChild(card);
        }
    }

}