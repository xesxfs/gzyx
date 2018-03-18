/**
 * 分享结算战绩
 * @author huanglong
 * @date 2017/05/10
 */
class ShareResultPanel extends BasePanel{
    public shareGro:eui.Group;
    public titleImg:eui.Image;
    public headMaskImg:eui.Image;
    public headImg:eui.Image;
    public nameLabel:eui.Label;
    public scoreFont:eui.BitmapLabel;
    public typeLabel:eui.Label;
    public huTypeLabel:eui.Label;
    public zhongniaopaiGroup:eui.Group;
    public hupaiGroup:eui.Group;
    public backBtn:eui.Button;
    public pengjiBtn:eui.Button;
    public qqBtn:eui.Button;
    public wxBtn:eui.Button;
    public wxfriendBtn:eui.Button;

    public beginX: number = 87;

	public constructor() {
		super();
		this.skinName = "ShareResultPanelSkin";
	}

	protected onEnable() {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);

        this.initUI();
    }

    protected onRemove() {
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.pengjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.recData = null;
    }

	public initUI(){
        this.headImg.mask = this.headMaskImg;

        var iData = this.recData;
        if (!iData) {
            TipsLog.gameInfo("分享数据有误");
            return;
        }
        console.log("+++++++++++++",iData);

        this.headImg.source = iData.headUrl;

        let point = parseInt(iData.point);
        if (point > 0) {
            this.scoreFont.font = "win_fnt";
            this.scoreFont.text = "+" + iData.point;
        } else {
            this.scoreFont.font = "lose_fnt";
            this.scoreFont.text = "" + iData.point;
        }

        var ImgStr = "";
        if (iData.type == "流局") {
            ImgStr = "share_result_liuju_png";
        }
        else if(iData.type == "捉炮" || iData.type == "自摸") {
            ImgStr = "share_result_ying_png";
        }
        else {
            ImgStr = "share_result_shu_png";
        }
        this.titleImg.texture = RES.getRes(ImgStr);

        this.nameLabel.text = StringTool.formatNickName("" + iData.name);

        let qiShouHu = iData.qiShouHu;
        let niao = iData.niao;
        if (niao.length > 0) {
            this.zhongniaopaiGroup.visible = true;
            if (qiShouHu) {
                this.setDiceList(niao);
            } else {
                this.setNiaoList(niao);
            }
        } else {
            this.zhongniaopaiGroup.visible = false;
        }

        this.typeLabel.text= iData.type;
        let huType = iData.huType;
        if (huType) {
            let text="";
            for (let i =0;i<huType.length;i++) {
                 text =text + "" + App.DataCenter.GameInfo.csHuTypeList[huType[i]] + "  ";
                 
            }
            this.huTypeLabel.text = text;
        } else {
            this.huTypeLabel.visible = false;
        }

        let ganglist = iData.gangCards;
        let cardList = iData.handCards;
        let cardX = this.setGangList(ganglist);
        this.setCardList(cardList,cardX);
	}

    private onTouchShare(e: egret.Event) {
        var shareType = 0;
        switch(e.target) {
            case this.pengjiBtn:
                shareType = 0;
                break;
            case this.qqBtn:
                shareType = 1;
                break;
            case this.wxBtn:
                shareType = 2;
                break;
            case this.wxfriendBtn:
                shareType = 3;
                break;
            default:
                break;
        }
        TipsLog.hallInfo("分享请求已发送");
        this.shareTo(shareType.toString());
        this.hide();
    }

    /**分享逻辑 */
    private shareTo(shareType: string) {
        var renderTexture:egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this, new egret.Rectangle(0, 270, 750, 700));
        var base64Data = renderTexture.toDataURL("image/png");

        var data = {
            gameId:"10004",
            share:shareType,
            imageB64:base64Data,
            gameName:"长沙麻将"
        }
        App.NativeBridge.sendImageShare(data);
    }

	/**返回 */
	protected back(){
		this.hide();
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
                    card.x = this.beginX + 36 * (i * 3 + 1);
                    card.y = -8;
                    card.scaleX = 0.70;
                    card.scaleY = 0.70;
                    this.hupaiGroup.addChild(card);
                } else {
                    card = cardFactory.getOutCard(ganglist[i], UserPosition.Down);
                    card.x = this.beginX + 36 * (i * 3 + j);
                    card.y = 5;
                    card.scaleX = 0.70;
                    card.scaleY = 0.70;
                    this.hupaiGroup.addChild(card);
                    cardX = card.x + 36;
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
            if(cardX < this.beginX){
                cardX =this.beginX;
            }
            card.x =cardX + 36 * i;
            card.y = 8;
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
            niao.x = 10 + 70 * i;
            niao.y = 0;
            niao.scaleX = 1;
            niao.scaleY = 1;
            this.zhongniaopaiGroup.addChild(niao);
        }
    }

    //牌鸟
    private setNiaoList(niaoList) {
        var len = niaoList.length;
        var card: Card;
        var cardFactory: CardFactory = CardFactory.getInstance();
        for (var i = 0; i < len; i++) {
            card = cardFactory.getOutCard(niaoList[i], UserPosition.Down);
            card.x = 10 + 36 * i;
            card.y = -5;
            card.scaleX = 0.6;
            card.scaleY = 0.6;
            this.zhongniaopaiGroup.addChild(card);
        }
    }
}