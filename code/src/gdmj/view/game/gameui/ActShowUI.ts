class ActShowUI extends eui.Component{
	public constructor() {
		super();
	}
	private selectActUI:SelectActUI;
	private eatComboUI:EatComboUI;
	private curActCard:number;
	private handCard:Array<Card>;
    private state:number;
    private eatCardList:Array<Card>;
	private eatComboListShow=[];
	private eatComboListSend=[];
	private gangComboList=[];

	protected childrenCreated(){
		this.selectActUI.addEventListener("sendActEvent", this.onActUITouch, this);
	}
    /**state=0 非自己回合触发的操作*/
	public showSelectAct(actList:Array<number>,handCard:Array<Card>,curCard:number,eatCardList:Array<Card>,state:number=0){
        this.state=state;
        this.eatCardList=eatCardList;
		this.curActCard=curCard;
		this.handCard=handCard;
		this.selectActUI.updateInfo(actList);        
        // this.selectActUI.x = (App.StageUtils.stageWidth - this.selectActUI.panelWidth) / 2;     
        this.selectActUI.show();
	}


	private onActUITouch(e: egret.TouchEvent){
		this.hideSelectAct();
        var state: ACT_state = e.data;
		var act: ACT_act = CardLogic.getInstance().changeStateToAct(state);
        var cardList = [];
        var cardValue = this.curActCard;
        //console.log("curActCard", this.curActCard);
        //如果是碰或胡，直接发送
        if (act == ACT_act.Act_Peng || act == ACT_act.Act_Hu) {
            cardList = [cardValue];
            this.doAction(act, cardList);
        //如果是杠，一种杠法直接发送，多种杠需要客户端自己判断
        } else if (act == ACT_act.Act_Gang || act == ACT_act.Act_AnGang) {
            this.checkGangCombo();
            if (this.gangComboList.length == 1) {
                //判断暗杠或明杠,因为没有暗杠按钮，这里用bAnGang标志位表示明暗杠
                if (act == ACT_act.Act_Gang && this.selectActUI.bAnGang) {
                    act = ACT_act.Act_AnGang;
                }
                cardList = [this.gangComboList[0]];               
                this.doAction(act,cardList);
            } else if (this.gangComboList.length > 1) {
                this.hideSelectAct();
        
                this.eatComboUI.showGangCombo(this.gangComboList, CardFactory.getInstance(), -82);
                this.eatComboUI.addEventListener("selectComboEvent", this.onGangComboTouch, this);
                this.eatComboUI.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
                this.eatComboUI.passBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
            } else {
                console.error("手上没有能杠的牌");
            }
            //如果是吃，一种吃法则直接发送，多种吃法需要客户端自己判断
        } else if (act == ACT_act.Act_Chi) {
            this.checkEatCombo(cardValue);
            if (this.eatComboListShow.length == 1) {
                cardList = this.eatComboListSend[0];
                this.doAction(act, cardList);
            } else if (this.eatComboListShow.length > 1) {
                this.hideSelectAct();                
				this.eatComboUI.showEatCombo(this.eatComboListShow, CardFactory.getInstance(), 30);
                this.eatComboUI.addEventListener("selectComboEvent", this.onEatComboTouch, this);
                this.eatComboUI.passBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
                this.eatComboUI.passBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEatComboUIPass, this);
            } else {
                console.error("手上没有能吃的牌");
            }
        } else if (act == ACT_act.Act_Pass) {
            this.doAction(ACT_act.Act_Pass);
        }

	}

	 //点击吃牌组合
    private onEatComboTouch(e: egret.TouchEvent) {
        var comboIndex = e.data;
        if (comboIndex >= 0) {
             this.doAction(ACT_act.Act_Chi, this.eatComboListSend[comboIndex]);
        }
    }

        //点击杠组合
    private onGangComboTouch(e: egret.TouchEvent) {
        var comboIndex = e.data;
        if (comboIndex >= 0) {
            var cardValue = this.gangComboList[comboIndex];
            if (this.selectActUI.bAnGang) {
                this.doAction(ACT_act.Act_AnGang, [this.gangComboList[comboIndex]]);
            } else {
                this.doAction(ACT_act.Act_Gang, [this.gangComboList[comboIndex]]);
            }
        }
    }


	 //点击吃牌组合时的过
    private onEatComboUIPass() {
        this.doAction(ACT_act.Act_Pass);
    }

	    /**
     * 检查手牌中有几种吃牌可能
     * @param cardValue 待吃的牌
     */
    private checkEatCombo(cardValue: number) {
        this.eatComboListSend.length=0;
		this.eatComboListShow.length=0;
        var handList=this.handCard;		
        var len = handList.length;
        var card: Card;
		//吃牌组合牌值L2 L1 cardValue R1 R2
        var L1 = 0;
        var L2 = 0;
        var R1 = 0;
        var R2 = 0;
        for (var i = 0; i < len; i++) {   //获取能够组合的牌
            card = handList[i];
            if (card.cardValue == (cardValue - 2)) {
                L2 = card.cardValue;
            } else if (card.cardValue == (cardValue - 1)) {
                L1 = card.cardValue;
            } else if (card.cardValue == (cardValue + 2)) {
                R2 = card.cardValue;
            } else if (card.cardValue == (cardValue + 1)) {
                R1 = card.cardValue;
            }
        }

        var combo: number = 0;
        if (L1 != 0 && L2 != 0) {
            combo++;
            this.eatComboListSend.push([cardValue, L2, L1]);
            //吃牌调整为统一放在中间
            this.eatComboListShow.push([L2, cardValue, L1]);
			
        }
        if (L1 != 0 && R1 != 0) {
            combo++;
            this.eatComboListSend.push([cardValue, L1, R1]);
            this.eatComboListShow.push([L1, cardValue, R1]);

        }
        if (R1 != 0 && R2 != 0) {
            combo++;
            this.eatComboListSend.push([cardValue, R1, R2]);
            this.eatComboListShow.push([R1, cardValue, R2]);
        }
		
    }

    /**
     * 检查当前有几种杠牌组合
     * @comboList 保存能杠的牌值列表
     */
    private checkGangCombo() {
        this.gangComboList.length = 0;
        var curActCard = this.curActCard;
        var handList=this.handCard;		
        //获取暗杠和明杠牌值
        if (this.state) {
            handList.push(CardFactory.getInstance().getHandCard(curActCard,UserPosition.Down))
			var resultList = CardLogic.getInstance().getSameList(handList, 4);                    
             this.gangComboList = this.gangComboList.concat(resultList); 
               
             resultList = CardLogic.getInstance().getBuGang(handList, this.eatCardList);
            this.gangComboList = this.gangComboList.concat(resultList);
            handList.pop();
         
        }
        //获取点杠牌值
        if (!this.state) {
            if (CardLogic.getInstance().checkSameByValue(handList, curActCard, 3)) {
                this.gangComboList.push(curActCard);
            }
        }

    }


	private doAction(act:ACT_act,cardValueList:Array<number>=null){		
		var data =[act,cardValueList];
		this.dispatchEventWith("actAction",false,data)
	}

	public hideSelectAct(){
		this.selectActUI.hide();
	}
}