/**
 * 玩法界面
 * @author huanglong
 * 2017-03-20
 */

class RulePanelH extends BasePanel{
    //UI
    public hallGro:eui.Group;
    public rule_back:eui.Button;
    public radioAHall:eui.RadioButton;
    public jp_view_stack_hall:eui.ViewStack;
    public jp_rule_basic_text_h:eui.Label;
    public jpFanTypeGroup_h:eui.Group;
    public jp_rule_crearing_text_h:eui.Label;
    public jp_rule_special_text_h:eui.Label;
    public gameGro:eui.Group;
    public radioAGame:eui.RadioButton;
    public jp_view_stack_game:eui.ViewStack;
    public jp_rule_basic_text_g:eui.Label;
    public jpFanTypeGroup_g:eui.Group;
    public jp_rule_crearing_text_g:eui.Label;
    public jp_rule_special_text_g:eui.Label;

    //local
    public radioA:eui.RadioButton;
    public jp_rule_basic_text:eui.Label;
    public jp_rule_crearing_text:eui.Label;
    public jp_rule_special_text:eui.Label;
    public jp_view_stack:eui.ViewStack;
    public jpFanTypeGroup:eui.Group;

    //contentText
    private jp_text_basic;
    private jp_text_Clearing;
    private jp_text_special;

     public constructor() {
        super();
        this.skinName = "RulePanelHSkin"
    }

   protected childrenCreated() {
        
    }

    /** 添加到场景*/
    protected onEnable() {

        if (this.gameBool) {
            this.hallGro.visible = false;
            this.gameGro.visible = true;
            this.radioA = this.radioAGame;
            this.jp_rule_basic_text = this.jp_rule_basic_text_g;
            this.jp_rule_crearing_text = this.jp_rule_crearing_text_g;
            this.jp_rule_special_text = this.jp_rule_special_text_g;
            this.jp_view_stack = this.jp_view_stack_game;
            this.jpFanTypeGroup = this.jpFanTypeGroup_g;
        }
        else {
            this.hallGro.visible = true;
            this.gameGro.visible = false;
            this.radioA = this.radioAHall;
            this.jp_rule_basic_text = this.jp_rule_basic_text_h;
            this.jp_rule_crearing_text = this.jp_rule_crearing_text_h;
            this.jp_rule_special_text = this.jp_rule_special_text_h;
            this.jp_view_stack = this.jp_view_stack_hall;
            this.jpFanTypeGroup = this.jpFanTypeGroup_h;
        }
        this.radioA.selected = true;
        this.jp_view_stack.selectedIndex = 0;

        this.rule_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.radioA.group.addEventListener(eui.UIEvent.CHANGE, this.changeViewStack, this);

        this.initView();
    }

    /** 从场景中移除*/
    protected onRemove() {
        this.rule_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.radioA.group.removeEventListener(eui.UIEvent.CHANGE, this.changeViewStack, this);

        this.gameBool = false;
    }

    /**初始化界面值 */
    private initView() {
        this.setContenText();
        this.addFileDoc();
        this.setJiHuFanType();
    }

    private addFileDoc(){
        this.jp_rule_basic_text.textFlow = this.jp_text_basic;
        this.jp_rule_crearing_text.textFlow = this.jp_text_Clearing; 
        this.jp_rule_special_text.textFlow = this.jp_text_special;
    }

    private changeViewStack(event:eui.UIEvent){
      var group: eui.RadioButtonGroup=  event.target;
	  this.jp_view_stack.selectedIndex=group.selectedValue;
    }

  /**关闭*/
    private onCloseBtn() {
        this.hide()
    }

    private setTxt(txt): Array<egret.ITextElement>{  
        var parser = new egret.HtmlTextParser();
        var textFlow: Array<egret.ITextElement> = parser.parser(txt)
        return textFlow    
    }

    /**
     * 格式化内容文本
     */
    private  setContenText() {
        //"fontFamily":"楷体"
        var tetleTextStyleJson = { "size":30,"textColor":0x993300, "fontFamily":"SimHei"}
        var contentTextStyleJson = {"size":28,"textColor":0x7e5a3d,"fontFamily":"SimHei"}

        //鸡平胡基本规则
        this.jp_text_basic = <Array<egret.ITextElement>>[
            {text:"一、牌张:",style:tetleTextStyleJson}
            ,{text:"\n\n　　长沙麻将共108张牌",style:contentTextStyleJson}
            ,{text:"\n\n　　包括筒、索、万，没有东、南、西、北风、中、发、白、梅、兰、竹、菊、春、夏、秋、冬。",style:contentTextStyleJson}
            ,{text:"\n\n二、将牌:",style:tetleTextStyleJson}
            ,{text:"\n\n　　一对是将牌，长沙麻将需要2、5、8序数牌做将，如二万、五条、八筒等。",style:contentTextStyleJson}
            ,{text:"\n\n　　少数特殊牌型则将可以为任意一对将牌，即不以2、5、8序数牌做将，详情请查阅番型说明。",style:contentTextStyleJson}
            ,{text:"\n\n三、牌局行为:",style:tetleTextStyleJson}
            ,{text:"\n\n　　可吃、碰、杠",style:contentTextStyleJson}
            ,{text:"\n\n　　可自摸、放炮",style:contentTextStyleJson}
            ,{text:"\n\n　　有人胡牌后，立即扎鸟",style:contentTextStyleJson}
            ,{text:"\n\n　　结算后，重新开局",style:contentTextStyleJson}
            ,{text:"\n\n四、庄家确定方式:",style:tetleTextStyleJson}
            ,{text:"\n\n　　第一局扔骰子决定庄家，其它人为闲家",style:contentTextStyleJson}
            ,{text:"\n\n　　第二盘起，上盘谁胡牌，下盘谁做庄。",style:contentTextStyleJson}
            ,{text:"\n\n五、通炮（一炮多响）",style:tetleTextStyleJson}
            ,{text:"\n\n　　几个玩家胡同一张牌，此牌即为通炮。",style:contentTextStyleJson}
            ,{text:"\n\n六、漏胡:",style:tetleTextStyleJson}
            ,{text:"\n\n　　如果玩家漏掉了炮胡，则在玩家摸牌前禁止炮胡，摸牌后一切正常",style:contentTextStyleJson}
            ,{text:"\n\n　　只对该玩家漏胡的那张牌有效。",style:contentTextStyleJson}
        ];
        //特殊规则
        this.jp_text_Clearing = <Array<egret.ITextElement>>[
            {text:"一、起手胡:",style:tetleTextStyleJson}
            ,{text:"\n\n　　四个玩家发完牌后,即可查看是否符合起手胡牌型",style:contentTextStyleJson}
            ,{text:"\n\n    大四喜:起完牌后，玩家手上已有四张一样的牌，即可胡牌。（四喜计分等同小胡自摸）",style:contentTextStyleJson}
            ,{text:"\n\n　　板板胡：起完牌后，玩家手上没有一张 2 、 5 、 8 （将牌），即可胡牌。（等同小胡自摸）",style:contentTextStyleJson}
            ,{text:"\n\n　　缺一色：起完牌后，玩家手上筒、索、万任缺一门，即可胡牌。（等同小胡自摸）",style:contentTextStyleJson}
            ,{text:"\n\n　　六六顺：起完牌后，玩家手上已有 2 个刻子（刻子：三个一样的牌），即可胡牌。（等同小胡自摸）",style:contentTextStyleJson}
            ,{text:"\n\n　　三同：三色同序数相同的牌各有一对，即可胡牌。（等同小胡自摸）。如有一对一筒，一对一索，一对一万。",style:contentTextStyleJson}
            ,{text:"\n\n　　步步高：同花色序数依次增1的牌各有一对，即可胡牌。（等同小胡自摸）。如2万、3万、4万各2张。",style:contentTextStyleJson}
            ,{text:"\n\n　　一枝花：某种花色只有一张牌，而且其他两种花色没有与这张牌同序数的牌，即可胡牌。（等同小胡自摸）。如：只有1张索子，为3索，并且没有3筒、3万。",style:contentTextStyleJson}
            ,{text:"\n\n    起手胡牌后，骰子当鸟牌",style:contentTextStyleJson}
            ,{text:"\n\n二、掷骰子抓鸟",style:tetleTextStyleJson}
            ,{text:"\n\n    1点和5点 每家都输2倍",style:contentTextStyleJson}
            ,{text:"\n\n    2点和6点 胡牌者下家输2倍 ",style:contentTextStyleJson}
            ,{text:"\n\n    3点 胡牌者对家输2倍 ",style:contentTextStyleJson}
            ,{text:"\n\n    4点 胡牌者上家输2倍",style:contentTextStyleJson}
        ];

        //结算
        this.jp_text_special = <Array<egret.ITextElement>>[
             {text:"一、小胡自摸:",style:tetleTextStyleJson}
            ,{text:"\n\n　　庄家自摸，闲家每人输2X；",style:contentTextStyleJson}
            ,{text:"\n\n　　闲家自摸，庄家输2X，闲家输1X。",style:contentTextStyleJson}
            ,{text:"\n\n二、小胡捉炮:",style:tetleTextStyleJson}
            ,{text:"\n\n　　点炮方输1X；",style:contentTextStyleJson}
            ,{text:"\n\n　　如果点炮方为庄家，则庄家输2X，如果捉炮方为庄家，点炮的闲家输2X。",style:contentTextStyleJson}
            ,{text:"\n\n三、大胡自摸:",style:tetleTextStyleJson}
            ,{text:"\n\n　　庄家自摸，闲家每人输 4X；",style:contentTextStyleJson}
            ,{text:"\n\n　　闲家自摸，庄家输4X，闲家输3X。",style:contentTextStyleJson}
            ,{text:"\n\n四、大胡捉炮:",style:tetleTextStyleJson}
            ,{text:"\n\n　　点炮方输6X；",style:contentTextStyleJson}
            ,{text:"\n\n　　如果点炮方为庄家，则庄家输7X，如果捉炮方为庄家，点炮的闲家输7X。",style:contentTextStyleJson}
            ,{text:"\n\n五、附加情况:",style:tetleTextStyleJson}
            ,{text:"\n\n　　小胡和小胡之间能组合累计（如四喜 + 六六顺），小胡和大胡之间按照大胡计算，大胡之间可以累计计算（算加法） 如：小七对+天胡",style:contentTextStyleJson}
            ,{text:"\n\n　　被扎鸟的玩家赢输计分翻倍。",style:contentTextStyleJson}
            ,{text:"\n\n　　起手胡算小胡",style:contentTextStyleJson}
            ,{text:"\n\n备注:",style:tetleTextStyleJson}
            ,{text:"\n\n　　X=番型得分*10",style:contentTextStyleJson}
        ];
    }

    /**
     * 设置基本番型
     */
    public setJiHuFanType(){
        if(this.jpFanTypeGroup.numChildren > 1){
            return;
        }
        //0番 鸡胡
        var itemGroup:eui.Group = this.jpFanTypeGroup;
        var item:FanTypeItem = new FanTypeItem();
        item.setName("屁胡：");
        item.setDescripe("2 、 5 、 8 作将，其余成刻子或顺子，即可胡牌。", 0x7e5a3d);
        item.setCardList([0x11,0x12,0x13,0x14,0x14,0x14,0x25,0x26,0x27,0x37,0x38,0x39,0x38,0x38]);
        itemGroup.addChild(item);

        //1番 平胡
        item = new FanTypeItem();
        item.setName("天胡：");
        item.setDescripe("单指庄家。庄家起牌后，即已经胡牌。",0x7e5a3d);
        item.setCardList([]);
        itemGroup.addChild(item);

        //2番 碰碰胡，混一色
        item = new FanTypeItem();
        item.setName("地胡：");
        item.setDescripe("指闲家。当庄家打出第一张牌时，给闲家点炮。",0x7e5a3d);
        item.setCardList([]);
        itemGroup.addChild(item);
        
        item = new FanTypeItem();
        item.setName("全求人：");
        item.setDescripe("吃、碰、杠后只剩一张（熟称单钓）由别人打出或者自己摸到相同牌张即可胡牌。可以乱将。",0x7e5a3d);
        item.setCardList([]);
        itemGroup.addChild(item);

        //4番 清一色，混碰
        item = new FanTypeItem();
        item.setName("碰碰胡：");
        item.setDescripe("由4副刻子（或杠）、将牌组成的和牌,乱将，将牌不要求为任意花色的2、5、8序数牌",0x7e5a3d);
        item.setCardList([0x12,0x12,0x12,0x23,0x23,0x23,0x36,0x36,0x36,0x39,0x39,0x39,0x29,0x29]);
        itemGroup.addChild(item);
        
        item = new FanTypeItem();
        item.setName("将将胡：");
        item.setDescripe("手上每一张牌都为任意花色的2、5、8序数牌",0x7e5a3d);
        item.setCardList([0x12,0x12,0x12,0x15,0x15,0x22,0x22,0x25,0x25,0x28,0x28,0x35,0x35,0x38]);
        itemGroup.addChild(item);

        //5番 清碰、混幺九、小三元、小四喜
        item = new FanTypeItem();
        item.setName("清一色：");
        item.setDescripe("由一种花色序数牌组成的胡牌,乱将，将牌不要求为任意花色的2、5、8序数牌",0x7e5a3d);
        item.setCardList([0x31,0x32,0x33,0x33,0x34,0x35,0x34,0x35,0x36,0x37,0x38,0x39,0x39,0x39]);
        itemGroup.addChild(item);
        
        item = new FanTypeItem();
        item.setName("七小对：");
        item.setDescripe("胡牌时，手上任意七对牌。",0x7e5a3d);
        item.setCardList([0x11,0x11,0x13,0x13,0x23,0x23,0x24,0x24,0x36,0x36,0x37,0x37,0x39,0x39]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("豪华七小对：");
        item.setDescripe("胡牌时，手中任意五对牌，以及有四张一样的牌。",0x7e5a3d);
        item.setCardList([0x11,0x11,0x13,0x13,0x23,0x23,0x24,0x24,0x36,0x36,0x37,0x37,0x37,0x37]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("海底捞月：");
        item.setDescripe("最后一张牌胡牌,即为海底捞月。",0x7e5a3d);
        item.setCardList([]);
        itemGroup.addChild(item);

        //6番 字一色、清幺九、大三元、大四喜、九宝莲灯、十三幺、天和，地和，人和
        item = new FanTypeItem();
        item.setName("海底炮：");
        item.setDescripe("打出最后一张牌导致其它玩家胡牌,叫海底炮。",0x7e5a3d);
        item.setCardList([]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("杠上开花：");
        item.setDescripe("杠牌后摸的牌可以胡牌时,即为杠上开花。",0x7e5a3d);
        item.setCardList([]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("抢杠胡：");
        item.setDescripe("暗杠不能抢杠胡， 只有明杠可以抢胡。玩家在明杠的时候，其他玩家可以胡被杠的此张牌，叫抢杠胡；",0x7e5a3d);
        item.setCardList([]);
        itemGroup.addChild(item);

        item = new FanTypeItem();
        item.setName("杠上炮：");
        item.setDescripe("如果开杠者补张，补张的牌开杠者若不能胡而其他玩家可以胡属于杠上炮，若胡，则属于杠上炮。",0x7e5a3d);
        item.setCardList([]);
        itemGroup.addChild(item);

        // item = new FanTypeItem();
        // item.setName("九莲宝灯：");
        // item.setDescripe("同种牌形成1112345678999，在摸到该种牌任何一张即可胡牌，不计清一色。");
        // item.setCardList([0x11,0x11,0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x19,0x19]);
        // itemGroup.addChild(item);

        // item = new FanTypeItem();
        // item.setName("十三幺：");
        // item.setDescripe("1、9万、筒、索，东、南、西、北、中、发、白以上牌型任意一张牌作将。");
        // item.setCardList([0x11,0x19,0x31,0x39,0x21,0x29,0x41,0x42,0x43,0x44,0x51,0x52,0x53,0x53]);
        // itemGroup.addChild(item);

        // item = new FanTypeItem();
        // item.setName("天和：");
        // item.setDescripe("只有庄家独有的权利，庄家起牌后即成和牌牌型。");
        // item.setCardList([]);
        // itemGroup.addChild(item);

        // item = new FanTypeItem();
        // item.setName("人和：");
        // item.setDescripe("起牌后，庄家打出第一张牌，闲家吃和。");
        // item.setCardList([]);
        // itemGroup.addChild(item);

        // item = new FanTypeItem();
        // item.setName("地和：");
        // item.setDescripe("起牌后，第一圈里闲家自摸的第一张牌和牌。\n注：第一圈里如有人吃、碰牌，有人摸第一张牌，已不生效，不成地和。");
        // item.setCardList([]);
        // itemGroup.addChild(item);
    }
}