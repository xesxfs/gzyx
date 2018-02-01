/**
 *
 * @author chenwei
 * 2016/07/13
 */
class RulePanel extends BasePanel{
	public constructor() {
    	super();
    	this.skinName="RulePanelSkin1"
    	
	}

    //ViewStack
    private jp_view_stack:eui.ViewStack;
    private td_view_stack:eui.ViewStack;
    private ruleViewStack:eui.ViewStack;    

    //Label
    private jp_rule_basic_text:eui.Label;
    private jp_rule_multiple_text:eui.Label;
    private jp_rule_crearing_text:eui.Label;
    private jp_rule_special_text:eui.Label;

    private td_rule_basic_text:eui.Label;
    private td_rule_multiple_text:eui.Label;
    private td_rule_crearing_text:eui.Label;
    private td_rule_special_text:eui.Label;

    //Button
    private td_rule_basic:eui.RadioButton;
    private jp_rule_basic:eui.RadioButton;
    //RadioButton
    private jpRBtn:eui.RadioButton;
    private tdRBtn:eui.RadioButton;

    //contentText
    private jp_text_basic;
    private jp_text_Clearing;
    private jp_text_special;
    private td_text_basic;
    private td_text_Clearing;
    private td_text_special;
    //关闭
    private closeBtn: eui.Button;
    
    /**鸡平胡基本番型Group*/
    private jpFanTypeGroup:eui.Group;
    /**推倒胡基本番型Group*/
    private tdFanTypeGroup:eui.Group;

    protected childrenCreated() {
    
        //this.setContenText();
        //this.addFileDoc();
        //this.ruleViewStack.selectedIndex = 0;

    }

    public showWhatRule(index:number){
        if(index){
        this.jpRBtn.selected = false;
        this.tdRBtn.selected = true;
        this.ruleViewStack.selectedIndex = 1;
        }

    }

    /**
     * 显示规则文本
     */

    private addFileDoc(){
        this.jp_rule_basic_text.textFlow = this.jp_text_basic;
        this.jp_rule_crearing_text.textFlow = this.jp_text_Clearing; 
        this.jp_rule_special_text.textFlow = this.jp_text_special;

        this.td_rule_basic_text.textFlow = this.td_text_basic;
        this.td_rule_crearing_text.textFlow = this.td_text_Clearing;
        this.td_rule_special_text.textFlow = this.td_text_special;
    }

    //添加场景
	protected onEnable(){
        // this.jpRBtn.group.addEventListener(eui.UIEvent.CHANGE,this.changeViewStack,this);  
        // this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);   
        // this.jp_rule_basic.group.addEventListener(eui.UIEvent.CHANGE,this.jpChildChangeViewStack,this);
        // this.td_rule_basic.group.addEventListener(eui.UIEvent.CHANGE,this.tdChileChangeViewStack,this);
        // this.setCenter();
        // this.setJiHuFanType();
        // this.setTdFanType();
	}
	
    //注册鸡平胡&推倒胡
	private changeViewStack(e:eui.UIEvent){
      var group: eui.RadioButtonGroup=  e.target;
	  this.ruleViewStack.selectedIndex=group.selectedValue;
      console.log("group.selectedValue"+group.selectedValue+this.jp_view_stack.selectedIndex);
	}
	/**
     * 鸡平胡下面Stack
     */
    private jpChildChangeViewStack(event:eui.UIEvent){
      var jpGroup: eui.RadioButtonGroup=  event.target;
	  this.jp_view_stack.selectedIndex=jpGroup.selectedValue;
      console.log("jpGroup="+event.target)
    }

    /*
    * 推倒胡stack
    */
    private tdChileChangeViewStack(e:eui.UIEvent) {
      var tdGroup:eui.RadioButtonGroup=  e.target;
	  this.td_view_stack.selectedIndex=tdGroup.selectedValue;
      console.log("tdGroup="+e.target)
    }

    private setTxt(txt): Array<egret.ITextElement>{  
        var parser = new egret.HtmlTextParser();
        var textFlow: Array<egret.ITextElement> = parser.parser(txt)
        return textFlow    
    }
    
    //删除场景
    protected onRemove(){
        // this.jp_rule_basic.group.removeEventListener(eui.UIEvent.CHANGE,this.jpChildChangeViewStack,this);
        // this.jpRBtn.group.removeEventListener(eui.UIEvent.CHANGE,this.changeViewStack,this);
        // this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);     
    }

    /**
     * 格式化内容文本
     */
    private  setContenText() {
        //"fontFamily":"楷体"
        var tetleTextStyleJson = { "size":27.2,"textColor":0xfdd586, "fontFamily":"SimHei"}
        var contentTextStyleJson = {"size":26.2,"textColor":0xf2ffda,"fontFamily":"SimHei"}

        //鸡平胡基本规则
        this.jp_text_basic = <Array<egret.ITextElement>>[
            {text:"一、用牌:",style:tetleTextStyleJson}
            ,{text:"\n\n　　万条筒东南西北中发白,共136张牌",style:contentTextStyleJson}
            ,{text:"\n\n二、执位:",style:tetleTextStyleJson}
            ,{text:"\n\n　　当四位玩家准备游戏后，由系统随机分配风位。按照东、南、西、北的次序逆时针排列",style:contentTextStyleJson}
            ,{text:"\n\n三、风圈:",style:tetleTextStyleJson}
            ,{text:"\n\n　　第一圈风圈为东。每打完一圈，则按照东、南、西、北的次序转换风圈。当最后一位玩家做庄之牌局完结而没有连庄情况出现，则牌局的一个循环完结，称为“一圈”",style:contentTextStyleJson}
            ,{text:"\n\n四、定庄:",style:tetleTextStyleJson}
            ,{text:"\n\n　　逆时针下家轮庄,庄家胡牌或者荒庄(流局)则继续坐庄；4个玩家任意一个离开后重新组成的牌局，将重新执位。",style:contentTextStyleJson}
            ,{text:"\n\n五、",style:tetleTextStyleJson}
            ,{text:"\n\n　　可以吃（只能吃上家的牌），碰，杠",style:contentTextStyleJson}
            ,{text:"\n\n六、杠牌规则:",style:tetleTextStyleJson}
            ,{text:"\n\n　　玩家在胡牌时，有暗杠或明杠，番数+1，爆胡以外不加番。结算有点杠时，若放杠者也是点炮者，番数+1，爆胡以外不加番；否则不加番",style:contentTextStyleJson}
             ,{text:"\n\n七、自摸:",style:tetleTextStyleJson}
            ,{text:"\n\n　　在爆胡以内自摸+1番，爆胡以外不加番",style:contentTextStyleJson}
        ];
        //鸡平胡结算
        this.jp_text_Clearing = <Array<egret.ITextElement>>[
            {text:"一、失败玩家的积分将消耗： X*N;",style:contentTextStyleJson}
            ,{text:"\n\n　　胜利玩家积分将奖励： X*P*N;",style:contentTextStyleJson}
           // ,{text:"\n　　系统自动回收的金币：A;",style:contentTextStyleJson}
            ,{text:"\n　　X=胡牌番数（包含杠牌等特殊情况后的番数），P=失败玩家数量，N=房间底分;",style:contentTextStyleJson}
            ,{text:"\n\n二、有玩家离线时，离线的玩家将会自动被托管并参与最后的正常结算，离线的玩家再次上线会自动重连断开的牌局;",style:contentTextStyleJson}
        ]

        //鸡平胡特殊规则
        this.jp_text_special = <Array<egret.ITextElement>>[
             {text:"一、漏胡:",style:tetleTextStyleJson}
            ,{text:"\n\n　　若玩家A为叫胡的状态下，如下家B打出一张玩家A可以胡的牌而玩家A却放弃不胡，那若对家C或上家D打出相同的一张牌时，玩家A是不能胡那一张的。除非玩家A有进行动牌的情况，动牌的意思在于碰、上、杠、模牌的。当有动牌后，那不能胡那一张的规则便解除。",style:contentTextStyleJson}
            ,{text:"\n\n二、一炮三响:",style:tetleTextStyleJson}
            ,{text:"\n\n　　同一张牌点三个炮，点炮者包三家。胡牌者不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
            ,{text:"\n\n三、海底捞月:",style:tetleTextStyleJson}
            ,{text:"\n\n　　摸最后一张牌胡牌。不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
            ,{text:"\n\n四、承包:",style:tetleTextStyleJson}
            ,{text:"\n\n　　1.抢杠胡：明刻开明杠，可以被抢杠胡，抢杠胡等同杠开，当自摸，被抢杠者（欲开杠者）包三家牌，暗杠不可抢杠胡。抢杠者牌型不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
            ,{text:"\n　　2.杠上开花：不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
            ,{text:"\n　　3.杠上开花包杠：开暗刻明杠补牌后胡牌，计自摸，点杠者包三家牌。 不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
            ,{text:"\n　　4.包自摸规则： 十二张落地包自模，包先不包后。例一：若玩家A打出一张牌让其中一名玩家做成十二张落地（即已碰/吃/明杠出的牌共有12张牌）而做成该玩家为单吊一张叫胡的情况时，该名打出者A必须承担包自模的责任，即若该名玩家在12张落地的情况时自模胡牌．该打出让玩家成立12张落地的玩家A便需要为其余两家代付该笔自模的积分．例二：玩家A放一张让玩家B12张落地达成，及后玩家A再放一张让玩家C或 D12张落地达成，此时玩家A只需要承担包玩家B自模的责任，不需要承包玩家C和D",style:contentTextStyleJson}
            ,{text:"\n　　5.特殊牌型包自摸： 大四喜：玩家已碰出东、南、西、北，任意3款．若有人打出余下一款者，那人则需承担包自模的责任。 大三元：玩家已碰出红中、白板、发财，任意2款．若有人打出余下一款者，那人则需承担包自模的责任",style:contentTextStyleJson}
            ,{text:"\n　　6.暗刻开明杠，不算抢杠胡，胡牌者只能胡点杠那张牌，只算普通胡牌",style:contentTextStyleJson}
            ,{text:"\n\n五、特殊情况:",style:tetleTextStyleJson}
            ,{text:"\n\n　　1.天和：只有庄家独有的权利，庄家起牌后即成和牌牌型。按6番计算",style:contentTextStyleJson}
            ,{text:"\n　　2.人和：起牌后，庄家打出的第一张牌，闲家吃和。按6番计算",style:contentTextStyleJson}
            ,{text:"\n　　3.地和：起牌后，第一圈里闲家自摸的第一张牌和牌。按6番计算。注：第一圈里如有人吃、碰牌，有人摸第一张牌，已不生效，不成地和",style:contentTextStyleJson}
        ]

        //推倒胡规则
        this.td_text_basic = <Array<egret.ITextElement>>[
            {text:"一、用牌:",style:tetleTextStyleJson}
            ,{text:"\n\n　　万条筒东南西北中发白,共136张牌",style:contentTextStyleJson}
            ,{text:"\n\n二、执位:",style:tetleTextStyleJson}
            ,{text:"\n\n　　当四位玩家准备游戏后，由系统随机分配风位。按照东、南、西、北的次序逆时针排列",style:contentTextStyleJson}
            ,{text:"\n\n三、风圈:",style:tetleTextStyleJson}
            ,{text:"\n\n　　第一圈风圈为东。每打完一圈，则按照东、南、西、北的次序转换风圈。当最后一位玩家做庄之牌局完结而没有连庄情况出现，则牌局的一个循环完结，称为“一圈”",style:contentTextStyleJson}
            ,{text:"\n\n四、定庄:",style:tetleTextStyleJson}
            ,{text:"\n\n　　谁赢谁坐庄,庄家胡牌或者荒庄(流局)则继续坐庄；4个玩家任意一个离开后重新组成的牌局，将重新执位",style:contentTextStyleJson}
            ,{text:"\n\n五、",style:tetleTextStyleJson}
            ,{text:"\n\n　　不可以吃，可以碰和杠",style:contentTextStyleJson}
            ,{text:"\n\n六、杠牌规则:",style:tetleTextStyleJson}
            ,{text:"\n\n　　1、杠牌立即结算积分",style:contentTextStyleJson}
            ,{text:"\n　　2、放杠：即玩家所出牌造成了其他人的杠牌，则该玩家将赔 3 倍底分给杠牌者",style:contentTextStyleJson}
            ,{text:"\n　　3、明杠：某玩家摸牌后明杠牌（已有碰的牌继续杠）。在最后结算时，其余三家每人均赔给杠牌者 1 倍底分",style:contentTextStyleJson}
            ,{text:"\n　　4、暗杠：同自摸原理。某玩家暗杠后，在最后结算时，其余三家每人均赔给杠牌者 2 倍底分",style:contentTextStyleJson}
        ]
        //推倒胡结算
        this.td_text_Clearing = <Array<egret.ITextElement>>[
            {text:"一、失败玩家的积分将消耗： (X*N)*(K+1);",style:contentTextStyleJson}
            ,{text:"\n　　胜利玩家积分将奖励： (X*N*3)*(K+1);",style:contentTextStyleJson}
            //,{text:"\n　　系统自动回收的金币：A;",style:contentTextStyleJson}
            ,{text:"\n　　X=自摸番数（包含特殊情况），K=抓中马数，N=房间底分;",style:contentTextStyleJson}
            ,{text:"\n\n二、有玩家离线时，离线的玩家将会自动被托管并参与最后的正常结算，离线的玩家再次上线会自动重连断开的牌局;",style:contentTextStyleJson}
        ]

        //推倒胡特殊规则
        this.td_text_special = <Array<egret.ITextElement>>[
            {text:"一、抓马:",style:tetleTextStyleJson}
            ,{text:"\n\n　　1、牌局结束，胡牌者从剩余的牌中进行抓马操作，不同的场次抓马的数量",style:contentTextStyleJson}
            ,{text:"\n　　2、假设4个玩家以ABCD来代替，A为庄家，若玩家抓马抓中以下牌时，每中一个马，赢家赢的分值加一倍，输家输的分值也加一倍",style:contentTextStyleJson}
            ,{text:"\n　　　 A：1，5，9，东；共40张牌",style:contentTextStyleJson}
            ,{text:"\n　　　 B：2，6，中，南；共32张牌",style:contentTextStyleJson}
            ,{text:"\n　　　 C：3，7，发，西；共32张牌",style:contentTextStyleJson}
            ,{text:"\n　　　 D：4，8，白板，北；共32张牌",style:contentTextStyleJson}
            ,{text:"\n\n二、承包:",style:tetleTextStyleJson}
            // ,{text:"\n\n　　1、抢杠胡：明刻开明杠，可以被抢杠胡，抢杠胡等同杠开，当自摸，被抢杠者（欲开杠者）包三家牌，暗杠不可抢杠胡。抢杠者牌型不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
            // ,{text:"\n　　2、杠上开花：不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
            // ,{text:"\n　　3、杠上开花包杠：开暗刻明杠补牌后胡牌，计自摸，点杠者包三家牌。 不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
            ,{text:"\n\n　　杠上开花包杠：开暗刻明杠补牌后胡牌，计自摸，点杠者包三家牌。",style:contentTextStyleJson}

        ]
    }

    /**设置鸡平胡基本番型*/
    public setJiHuFanType(){
        if(this.jpFanTypeGroup.numChildren > 1){
            return;
        }
        //0番 鸡胡
        var itemGroup:eui.Group = this.jpFanTypeGroup;
        var item:FanTypeItem = new FanTypeItem();
        item.setName("鸡胡：");
        item.setDescripe("什么牌都可以胡，可吃碰杠。");
        item.setCardList([0x35,0x36,0x37,0x22,0x23,0x24,0x15,0x15,0x15,0x42,0x42,0x42,0x16,0x16]);
        itemGroup.addChild(item);

        //1番 平胡
        item = new FanTypeItem();
        item.setName("平胡：");
        item.setDescripe("全部是顺子没有刻子。");
        item.setCardList([0x11,0x12,0x13,0x34,0x35,0x36,0x12,0x13,0x14,0x25,0x26,0x27,0x41,0x41]);
        itemGroup.addChild(item);

        //2番 碰碰胡，混一色
        item = new FanTypeItem();
        item.setName("碰碰胡：");
        item.setDescripe("全部是刻子没有顺子。");
        item.setCardList([0x34,0x34,0x34,0x16,0x16,0x16,0x22,0x22,0x22,0x44,0x44,0x44,0x25,0x25]);
        itemGroup.addChild(item);
        
        item = new FanTypeItem();
        item.setName("混一色：");
        item.setDescripe("整副牌由字牌及另外单一花色(筒、条或万)组成。");
        item.setCardList([0x11,0x12,0x13,0x16,0x16,0x16,0x42,0x42,0x42,0x12,0x13,0x14,0x41,0x41]);
        itemGroup.addChild(item);

        //4番 清一色，混碰
        item = new FanTypeItem();
        item.setName("清一色：");
        item.setDescripe("整副牌由同一花色组成。");
        item.setCardList([0x11,0x11,0x11,0x14,0x14,0x14,0x15,0x16,0x17,0x17,0x18,0x19,0x12,0x12]);
        itemGroup.addChild(item);
        
        item = new FanTypeItem();
        item.setName("混碰：");
        item.setDescripe("混一色+碰碰胡。");
        item.setCardList([0x22,0x22,0x22,0x25,0x25,0x25,0x27,0x27,0x27,0x51,0x51,0x51,0x29,0x29]);
        itemGroup.addChild(item);

        //5番 清碰、混幺九、小三元、小四喜
        item = new FanTypeItem();
        item.setName("清碰：");
        item.setDescripe("清一色+碰碰胡");
        item.setCardList([0x11,0x11,0x11,0x12,0x12,0x12,0x16,0x16,0x16,0x15,0x15,0x15,0x14,0x14]);
        itemGroup.addChild(item);
        
        item = new FanTypeItem();
        item.setName("混幺九：");
        item.setDescripe("由幺九牌和字牌组成的牌型。");
        item.setCardList([0x21,0x21,0x21,0x19,0x19,0x19,0x31,0x31,0x31,0x42,0x42,0x42,0x11,0x11]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("小三元：");
        item.setDescripe("拿齐中、发、白三种三元牌，但其中一种是将。");
        item.setCardList([0x51,0x51,0x51,0x52,0x52,0x52,0x11,0x11,0x11,0x12,0x13,0x14,0x53,0x53]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("小四喜：");
        item.setDescripe("胡牌者完成东、南、西、北其中三组刻子，一组对子。");
        item.setCardList([0x41,0x41,0x41,0x42,0x42,0x42,0x43,0x43,0x43,0x11,0x12,0x13,0x44,0x44]);
        itemGroup.addChild(item);

        //6番 字一色、清幺九、大三元、大四喜、九宝莲灯、十三幺、天和，地和，人和
        item = new FanTypeItem();
        item.setName("字一色：");
        item.setDescripe("由字牌组合成的刻子牌型。");
        item.setCardList([0x41,0x41,0x41,0x44,0x44,0x44,0x51,0x51,0x51,0x52,0x52,0x52,0x43,0x43]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("清幺九：");
        item.setDescripe("只由幺九两种牌组成的刻子牌型。");
        item.setCardList([0x11,0x11,0x11,0x19,0x19,0x19,0x31,0x31,0x31,0x29,0x29,0x29,0x39,0x39]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("大三元：");
        item.setDescripe("胡牌时，有中、发、白三组刻子。");
        item.setCardList([0x51,0x51,0x51,0x52,0x52,0x52,0x53,0x53,0x53,0x11,0x12,0x13,0x22,0x22]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("大四喜：");
        item.setDescripe("胡牌者完成东、南、西、北四组刻子。");
        item.setCardList([0x41,0x41,0x41,0x42,0x42,0x42,0x43,0x43,0x43,0x44,0x44,0x44,0x15,0x15]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("九莲宝灯：");
        item.setDescripe("同种牌形成1112345678999，在摸到该种牌任何一张即可胡牌，不计清一色。");
        item.setCardList([0x11,0x11,0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x19,0x19]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("十三幺：");
        item.setDescripe("1、9万、筒、索，东、南、西、北、中、发、白以上牌型任意一张牌作将。");
        item.setCardList([0x11,0x19,0x31,0x39,0x21,0x29,0x41,0x42,0x43,0x44,0x51,0x52,0x53,0x53]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("天和：");
        item.setDescripe("只有庄家独有的权利，庄家起牌后即成和牌牌型。");
        item.setCardList([]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("人和：");
        item.setDescripe("起牌后，庄家打出第一张牌，闲家吃和。");
        item.setCardList([]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("地和：");
        item.setDescripe("起牌后，第一圈里闲家自摸的第一张牌和牌。\n注：第一圈里如有人吃、碰牌，有人摸第一张牌，已不生效，不成地和。");
        item.setCardList([]);
        itemGroup.addChild(item);
    }

    /**设置推倒胡基本番型*/
    public setTdFanType(){
        if(this.tdFanTypeGroup.numChildren > 1){
            return ;
        }
        //1番 小胡
        var itemGroup:eui.Group = this.tdFanTypeGroup;
        var item:FanTypeItem = new FanTypeItem();
        item.setName("小胡：");
        item.setDescripe("2番以外的任意牌型，算一番。");
        item.setCardList([]);
        itemGroup.addChild(item);

        //2番 清一色、字一色、七对子、四暗刻、十八罗汉、大三元、大四喜、小四喜、十三幺、
        item = new FanTypeItem();
        item.setName("清一色：");
        item.setDescripe("所胡牌中仅含有万、饼、条中间的一种则称为清一色。");
        item.setCardList([0x11,0x11,0x11,0x12,0x12,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x19]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("字一色：");
        item.setDescripe("所胡牌中全为字则称为字一色。");
        item.setCardList([0x41,0x41,0x41,0x42,0x42,0x42,0x43,0x43,0x43,0x44,0x44,0x44,0x51,0x51]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("七对子：");
        item.setDescripe("所胡牌为7副将组成的即称为七对。有四张一样的牌，但没有杠可算做2副将。");
        item.setCardList([0x11,0x11,0x15,0x15,0x31,0x31,0x33,0x33,0x24,0x24,0x28,0x28,0x41,0x41]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("四暗刻、十八罗汉：");
        item.setDescripe("所胡牌没有碰牌，全由三张或(暗杠)组成的牌型，没有顺子牌，称为四暗刻。包括胡的牌，如果不是单调一张胡也必须算自摸才可(如以下牌型，自摸才算四暗刻)。"+
        "当杠四手(不分明暗杠，但必须杠了四手)所胡的牌称为十八罗汉。");
        item.setCardList([0x11,0x11,0x11,0x18,0x18,0x18,0x33,0x33,0x33,0x43,0x43,0x43,0x41,0x41]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("大三元：");
        item.setDescripe("所胡牌中带有中、发、白各三张或四张的牌型称之为大三元。");
        item.setCardList([0x51,0x51,0x51,0x52,0x52,0x52,0x53,0x53,0x53,0x41,0x41,0x41,0x42,0x42]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("大四喜：");
        item.setDescripe("所胡牌中带有东、南、西、北各三张或四张的牌型称之为大四喜。");
        item.setCardList([0x41,0x41,0x41,0x42,0x42,0x42,0x43,0x43,0x43,0x44,0x44,0x44,0x11,0x11]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("小四喜：");
        item.setDescripe("在东、南、西、北中其中一副为将(2张牌)其余的依然为三张或四张以上的牌型称为小四喜。");
        item.setCardList([0x41,0x41,0x41,0x42,0x42,0x42,0x43,0x43,0x43,0x44,0x44,0x11,0x11,0x11]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("十三幺：");
        item.setDescripe("由东、南、西、北、中、发、白、一万、九万、一饼、九饼、幺鸡、九条，再额外加上以上13张牌中任意一张牌组成的牌型既为十三幺。");
        item.setCardList([0x41,0x42,0x43,0x44,0x51,0x52,0x53,0x11,0x19,0x31,0x39,0x21,0x29,0x29]);
        itemGroup.addChild(item);
    }
}
