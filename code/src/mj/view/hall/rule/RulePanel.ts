/**
 *
 * @author chen
 * 2016/07/13
 */
class RulePanel extends BasePanel {
    public backBtn: eui.Button;
    public commonBtn: eui.Button;
    public basicBtn: eui.Button;
    public integralBtn: eui.Button;
    public contentLab: eui.Label;
    public focusImg: eui.Image;
    public ruleScll: eui.Scroller;

    public constructor() {
        super();
        this.skinName = "RulePanelSkin"
    }

    private _commonDesc = [];   //常见问题
    private _basicDesc = [];    //基本玩法
    private _integralDesc = []; //积分结算
    private _btnArr = [];
    private fanGroup: eui.Group;

    //添加场景
    protected onEnable() {
        this.setCenter();
        this.setContenText();
        this._btnArr = [this.commonBtn, this.basicBtn, this.integralBtn]
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(evt: egret.TouchEvent) {
        switch (evt.target) {
            case this.backBtn:
                this.hide();
                break;
            case this.commonBtn:
                this.contentLab.textFlow = this._commonDesc;
                this.clearBtnEnabled(evt.target);
                break;
            case this.basicBtn:
                this.contentLab.textFlow = this._basicDesc;
                this.clearBtnEnabled(evt.target);
                break;
            case this.integralBtn:
                this.contentLab.textFlow = this._integralDesc;
                this.clearBtnEnabled(evt.target);
                this.setFanType();
                break;
            default:
                break;
        }
    }

    private clearBtnEnabled(focus: eui.Button) {
        this._btnArr.forEach((btn) => {
            btn.enabled = true;
        })

        focus.enabled = false;
        let xn = focus.x - (this.focusImg.width - focus.width) / 2
        egret.Tween.get(this.focusImg).to({ x: xn }, 50);
        this.ruleScll.viewport.scrollV = 0;
        this.fanGroup && this.fanGroup.parent && this.fanGroup.parent.removeChild(this.fanGroup);
    }


    //删除场景
    protected onRemove() {
        this.backBtn.removeEventListener("touchTap", this.hide, this);
    }

    /**
     * 格式化内容文本
     */
    private setContenText() {
        //"fontFamily":"楷体"
        var tetleTextStyleJson = { "size": 24, "textColor": 0xeacd11, "fontFamily": "微软雅黑" }
        var contentTextStyleJson = { "size": 21, "textColor": 0xffffff, "fontFamily": "微软雅黑" }

        //常见问题
        this._commonDesc = <Array<egret.ITextElement>>[
            { text: "Q:客服电话与QQ号?", style: tetleTextStyleJson }
            , { text: "\nA:", style: contentTextStyleJson }
            , { text: "\nQQ：339680847 电话：88234009", style: contentTextStyleJson }
            , { text: "\nQ：如何获取金币？", style: tetleTextStyleJson }
            , { text: "\nA:", style: contentTextStyleJson }
            , { text: "\n1、通过商城购买", style: contentTextStyleJson }
            , { text: "\n2、每日签到奖励", style: contentTextStyleJson }
            , { text: "\n3、参加金币场比赛，赢得金币", style: contentTextStyleJson }
            , { text: "\nQ: 我的游戏币为什么不见了", style: tetleTextStyleJson }
            , { text: "\nA: 请及时通过官方Q群、客服等途径提交丢失游戏币的数量和时间，我们会尽快核查处理", style: contentTextStyleJson }
            , { text: "\nQ: 为什么我的牌局结算不正确？", style: tetleTextStyleJson }
            , { text: "\nA: 请及时通过官方Q群、客服等途径提交具体的牌局时间、输赢金币情形和手牌信息，若有截图请一并\n提交，我们会尽快核查处理", style: contentTextStyleJson }
            , { text: "\nQ: 为什么我支付成功了，钻石却没有到账？", style: tetleTextStyleJson }
            , { text: "\nA: 钻石的发放时间一般在五分钟之内，请耐心等待，若长时间未到账，请查看是否已经成功扣费，\n若已经扣费，请联系我们的客服", style: contentTextStyleJson }
            , { text: "\nQ: 为什么我无法进行支付", style: tetleTextStyleJson }
            , { text: "\nA: 请检查您的网络是否稳定，是否有足够的额度进行充值，若重新点击充值，仍无法支付，\n请联系我们的客服", style: contentTextStyleJson }
            , { text: "\nQ: 为什么有时无法登录游戏、突然掉线、画面停止或者频繁被托管？", style: tetleTextStyleJson }
            , { text: "\nA: 游戏运行需要稳定流畅的网络环境，上述情况可能是您当前网络不佳或无网络，请先检查网络连接，\n清除手机缓存，若问题依然存在，请彻底关闭游戏，稍后在重新启动", style: contentTextStyleJson }
            , { text: "\nQ: 为什么有时游戏会自动退出或者无法进入？", style: tetleTextStyleJson }
            , { text: "\nA: 如果您的网络不佳，手机内存不足等，可能会出现上述情况，请先检查网络，关闭后台其他应用程序\n再重新登录；若问题依然存在，请及时反馈", style: contentTextStyleJson }
            , { text: "\nQ: 游戏币有什么用？可以兑换成现金或实物吗？", style: tetleTextStyleJson }
            , { text: "\nA: 每局输赢不超过1亿，每日不超过10亿", style: contentTextStyleJson }
            , { text: "\nQ: 每局和每日金币输赢是否又上限呢？", style: tetleTextStyleJson }
            , { text: "\nA: 请及时通过官方Q群、客服等途径提交丢失游戏币的数量和时间，我们会尽快核查处理", style: contentTextStyleJson }
            , { text: "\nQ: 游戏是否收服务费", style: tetleTextStyleJson }
            , { text: "\nA: 游戏会根据不同场次，不同玩法收取不同的金币作为服务费", style: contentTextStyleJson }
        ];

        //基本玩法
        this._basicDesc = <Array<egret.ITextElement>>[
            { text: "一、玩法简介", style: tetleTextStyleJson }
            , { text: "\n贵阳麻将起源于贵州地区，牌面只有万、条、筒三门，游戏中可碰杠，不可吃。除一般牌型外特色玩法\n如冲锋鸡、责任鸡、闷豆、明豆和转弯豆等，富有别致趣味性。\n目前游戏中有金币场比赛场和私人局玩法。", style: contentTextStyleJson }
            , { text: "\n1、金币场：玩家可以在金币场选择不同的场馆，和陌生玩家一较牌技高下，输赢结算为金币；", style: contentTextStyleJson }
            , { text: "\n2、比赛场：玩家可以在比赛场选择不同的比赛报名参加，赢得比赛即可获得相应的奖励，具体玩法和\n奖励详见比赛场内介绍；", style: contentTextStyleJson }
            , { text: "\n3、私人局：可以创建自己喜欢的规则类型、牌局人数、打牌局数等，尽情享受与朋友的私密玩牌时间；", style: contentTextStyleJson }
            , { text: "\n\n二、基本规则", style: tetleTextStyleJson }
            , { text: "\n1、共有108张牌，其中有条、筒、万各有36张", style: contentTextStyleJson }
            , { text: "\n2、起张牌数：庄家的起张牌数伟14张，现价的起张牌数为13张", style: contentTextStyleJson }
            , { text: "\n3、行牌顺序是逆时针", style: contentTextStyleJson }
            , { text: "\n4、可摸牌，可碰，可杠，可胡", style: contentTextStyleJson }
            , { text: "\n5、过手胡牌：如果玩家在听牌的情况下，在别人点炮的情况下不胡，在自己未摸牌的情况下，\n又有人点炮，则不能胡", style: contentTextStyleJson }
            , { text: "\n6、报听：玩家在拿起所有牌后，立即叫牌（天听、硬报）或闲家在摸第一张牌立即叫牌\n（低报、软报）即算为报听，报听玩家不能修改手上的牌型，且在没有“豆”的情况下\n可以接炮胡牌", style: contentTextStyleJson }
            , { text: "\n\n三、术语解释", style: tetleTextStyleJson }
            , { text: "\n1、闷豆：即暗杠，自己摸到4张相同牌并杠出", style: contentTextStyleJson }
            , { text: "\n2、转弯豆：碰牌后，自己再摸到最后一张杠牌", style: contentTextStyleJson }
            , { text: "\n3、点豆：即明豆，玩家手中有三张相同的牌，然后杠了其他玩家的一张牌", style: contentTextStyleJson }
            , { text: "\n4、翻牌鸡：也叫捉鸡，玩家胡牌后摸得下一张排序数+1为捉鸡，如翻开的是5万，则6万为“鸡”；\n翻开9筒，1筒为“鸡”", style: contentTextStyleJson }
            , { text: "\n5、固定鸡：幺鸡，也叫一条", style: contentTextStyleJson }
            , { text: "\n6、金鸡：翻牌鸡是9条时，幺鸡是金鸡", style: contentTextStyleJson }
            , { text: "\n7、冲锋鸡：一牌局中，玩家第一张打出的幺鸡为冲锋鸡，也叫英雄鸡", style: contentTextStyleJson }
            , { text: "\n8、责任鸡：起牌后，若玩家打出的第一张幺鸡被其他玩家碰走，则此鸡称为责任鸡", style: contentTextStyleJson }
            , { text: "\n9、一炮多响：有玩家出牌点了2家或者3家的炮", style: contentTextStyleJson }
            , { text: "\n10、报听：玩家在拿起所有牌后，立即叫牌（天听、硬报）或闲家在摸第一张牌后立即叫牌\n（低报、软报）即算为报听，报听玩家不能修改手上的牌型", style: contentTextStyleJson }
            , { text: "\n11、杀报：在有任何玩家报听的情况下，报听玩家打出的牌，其他玩家任何时候都可以胡牌或者自摸", style: contentTextStyleJson }
            , { text: "\n12、荒庄：在所有牌都被摸完的情况下，没人胡牌", style: contentTextStyleJson }
        ];

        //积分结算
        this._integralDesc = <Array<egret.ITextElement>>[
            { text: "\n抓鸡麻将根据底注倍数计算输赢额度，捉鸡麻将的底注设定为1分，一下介绍各种牌型胡牌的分值。", style: contentTextStyleJson }
            , { text: "\n\n一、牌型分值", style: tetleTextStyleJson }
            , { text: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" }
            // , { text: "\n1、平胡：平胡可以自摸胡牌，或在有“豆”情况下允许点胡。积分为1倍底注", style: contentTextStyleJson }
            // , { text: "\n2、大对子：即对对胡，成牌时有4个三张相同的和1个对。积分为5倍底注", style: contentTextStyleJson }
            // , { text: "\n3、七对：成牌时由7个对子组成。积分为10倍底注", style: contentTextStyleJson }
            // , { text: "\n4、龙七对：成牌时由5个对子和4个相同的牌组成。积分为20倍底注", style: contentTextStyleJson }
            // , { text: "\n5、清一色：成牌时所有牌都由条、筒、万中的一种组成。积分为10倍底注", style: contentTextStyleJson }
            // , { text: "\n6、清大对：成牌由7个对子组成，且所有牌都由条、筒、万中的一种组成，积分为20倍底注", style: contentTextStyleJson }
            // , { text: "\n7、清七对：成牌由7个对子组成，且所有牌都由条、筒万中的一种组成，积分为20倍底注", style: contentTextStyleJson }
            , { text: "\n8、清龙背：成牌时由5个对子和4个相同的牌组成，且所有牌都由条、筒、万中的一种组成。\n积分为30倍底注", style: contentTextStyleJson }
            , { text: "\n9、单吊：玩家手里的牌经过碰杠之后手里只剩下一张牌了，算单吊，积分按10倍底注计算", style: contentTextStyleJson }
            , { text: "\n10、单吊清一色：单吊清一色按两个清一色计算，积分按20倍底注计算", style: contentTextStyleJson }
            , { text: "\n\n二、额外分值", style: tetleTextStyleJson }
        ];
        this.contentLab.textFlow = this._commonDesc;
    }

    private setFanType() {
        if (!this.fanGroup) {
            let fanGroup = this.fanGroup = new eui.Group();
            let fanType = new FanTypeItem();
            fanType.setDescripe("1、平胡：平胡可以自摸胡牌，或在有“豆”情况下允许点胡。积分为1倍底注");
            fanType.setCardList([11, 12, 13, 14, 14, 14, 33, 34, 35, 36, 37, 38, 39, 39]);
            fanGroup.addChild(fanType);


            fanType = new FanTypeItem();
            fanType.setDescripe("2、大对子：即对对胡，成牌时有4个三张相同的和1个对。积分为5倍底注");
            fanType.setCardList([11, 11, 11, 14, 14, 14, 33, 33, 33, 38, 38, 38, 38, 39, 39]);
            fanType.y = fanType.height * 1;
            fanGroup.addChild(fanType);

            fanType = new FanTypeItem();
            fanType.setDescripe("3、七对：成牌时由7个对子组成。积分为10倍底注");
            fanType.setCardList([11, 11, 13, 13, 14, 14, 33, 33, 35, 35, 38, 58, 58, 58, 39, 39]);
            fanType.y = fanType.height * 2;
            fanGroup.addChild(fanType);

            fanType = new FanTypeItem();
            fanType.setDescripe("4、龙七对：成牌时由5个对子和4个相同的牌组成。积分为20倍底注");
            fanType.setCardList([11, 11, 13, 13, 14, 14, 33, 33, 35, 35, 58, 58, 58, 58]);
            fanType.y = fanType.height * 3;
            fanGroup.addChild(fanType);

            fanType = new FanTypeItem();
            fanType.setDescripe("5、清一色：成牌时所有牌都由条、筒、万中的一种组成。积分为10倍底注");
            fanType.setCardList([31, 31, 31, 32, 32, 32, 33, 34, 35, 36, 37, 38, 39, 39]);
            fanType.y = fanType.height * 4;
            fanGroup.addChild(fanType);

            fanType = new FanTypeItem();
            fanType.setDescripe("6、清大对：成牌由7个对子组成，且所有牌都由条、筒、万中的一种组成，积分为20倍底注");
            fanType.setCardList([31, 31, 32, 32, 33, 33, 34, 34, 35, 35, 38, 38, 39, 39]);
            fanType.y = fanType.height * 5;
            fanGroup.addChild(fanType);

            fanGroup.y = 24*4;
        }
        (this.ruleScll.getChildAt(0) as eui.Group).addChild(this.fanGroup);
    }

}
