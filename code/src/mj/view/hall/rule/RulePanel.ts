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

    public constructor() {
        super();
        this.skinName = "RulePanelSkin"
    }

    private _commonDesc = [];   //常见问题
    private _basicDesc = [];    //基本玩法
    private _integralDesc = []; //积分结算
    private _btnArr = [];

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
        egret.Tween.get(this.focusImg).to({ x: xn }, 100);
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
        var tetleTextStyleJson = { "size": 27.2, "textColor": 0xeacd11, "fontFamily": "微软雅黑" }
        var contentTextStyleJson = { "size": 26.2, "textColor": 0xffffff, "fontFamily": "微软雅黑" }

        //常见问题
        this._commonDesc = <Array<egret.ITextElement>>[
            { text: "Q:客服电话与QQ号?", style: tetleTextStyleJson }
            , { text: "\nA:", style: contentTextStyleJson }
            , { text: "\nQQ：339680847 电话：88234009", style: contentTextStyleJson }
            , { text: "\nQ：如何获取金币？", style: tetleTextStyleJson }
            , { text: "\nA:", style: contentTextStyleJson }
            , { text: "\n1、通过商城购买", style: contentTextStyleJson }
            , { text: "\n2、每日签到奖励", style: contentTextStyleJson }
            , { text: "\n1、参加金币场比赛，赢得金币", style: contentTextStyleJson }
            , { text: "\nQ: 我的游戏币为什么不见了", style: tetleTextStyleJson }
            , { text: "\nA:请及时通过官方Q群、客服等途径提交丢失游戏币的数量和时间，我们会尽快核查处理", style: contentTextStyleJson }
            , { text: "\nQ: 为什么我的牌局结算不正确？", style: tetleTextStyleJson }
            , { text: "\nA:请及时通过官方Q群、客服等途径提交具体的牌局时间、输赢金币情形和手牌信息，若有截图请一并提交，我们会尽快核查处理", style: contentTextStyleJson }
        ];

        //基本玩法
        this._basicDesc = <Array<egret.ITextElement>>[
            { text: "一、玩法简介", style: tetleTextStyleJson }
            , { text: "\n贵阳麻将起源于贵州地区，牌面只有万、条、筒三门，游戏中可碰杠，不可吃。除一般牌型外特色玩法如冲锋鸡、责任鸡、闷豆、明豆和转弯豆等，富有别致趣味性。目前游戏中有金币场比赛场和私人局玩法。", style: contentTextStyleJson }
            , { text: "\n1、金币场：玩家可以在金币场选择不同的场馆，和陌生玩家一较牌技高下，输赢结算为金币；", style: contentTextStyleJson }
            , { text: "\n2、比赛场：玩家可以在比赛场选择不同的比赛报名参加，赢得比赛即可获得相应的奖励，具体玩法和奖励详见比赛场内介绍；", style: contentTextStyleJson }
            , { text: "\n3、私人局：可以创建自己喜欢的规则类型、牌局人数、打牌局数等，尽情享受与朋友的私密玩牌时间；", style: contentTextStyleJson }
        ];

        //积分结算
        this._integralDesc = <Array<egret.ITextElement>>[
            { text: "抓鸡麻将根据底注倍数计算输赢额度，捉鸡麻将的底注设定为1分，一下介绍各种牌型胡牌的分值。", style: contentTextStyleJson }
        ];

        this.contentLab.textFlow = this._commonDesc;
    }

}
