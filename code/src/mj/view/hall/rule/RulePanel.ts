/**
 *
 * @author chen
 * 2016/07/13
 */
class RulePanel extends BasePanel {
    public backBtn: eui.Button;

    public constructor() {
        super();
        this.skinName = "RulePanelSkin"

    }


    protected childrenCreated() {

    }


    //添加场景
    protected onEnable() {
        this.setCenter();
        this.backBtn.addEventListener("touchTap", this.hide, this);
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
        var tetleTextStyleJson = { "size": 27.2, "textColor": 0xfdd586, "fontFamily": "SimHei" }
        var contentTextStyleJson = { "size": 26.2, "textColor": 0xf2ffda, "fontFamily": "SimHei" }

        //鸡平胡基本规则
        // this.jp_text_basic = <Array<egret.ITextElement>>[
        //     {text:"一、用牌:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　万条筒东南西北中发白,共136张牌",style:contentTextStyleJson}
        //     ,{text:"\n\n二、执位:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　当四位玩家准备游戏后，由系统随机分配风位。按照东、南、西、北的次序逆时针排列",style:contentTextStyleJson}
        //     ,{text:"\n\n三、风圈:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　第一圈风圈为东。每打完一圈，则按照东、南、西、北的次序转换风圈。当最后一位玩家做庄之牌局完结而没有连庄情况出现，则牌局的一个循环完结，称为“一圈”",style:contentTextStyleJson}
        //     ,{text:"\n\n四、定庄:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　逆时针下家轮庄,庄家胡牌或者荒庄(流局)则继续坐庄；4个玩家任意一个离开后重新组成的牌局，将重新执位。",style:contentTextStyleJson}
        //     ,{text:"\n\n五、",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　可以吃（只能吃上家的牌），碰，杠",style:contentTextStyleJson}
        //     ,{text:"\n\n六、杠牌规则:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　玩家在胡牌时，有暗杠或明杠，番数+1，爆胡以外不加番。结算有点杠时，若放杠者也是点炮者，番数+1，爆胡以外不加番；否则不加番",style:contentTextStyleJson}
        //      ,{text:"\n\n七、自摸:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　在爆胡以内自摸+1番，爆胡以外不加番",style:contentTextStyleJson}
        // ];
        // //鸡平胡结算
        // this.jp_text_Clearing = <Array<egret.ITextElement>>[
        //     {text:"一、失败玩家的积分将消耗： X*N;",style:contentTextStyleJson}
        //     ,{text:"\n\n　　胜利玩家积分将奖励： X*P*N;",style:contentTextStyleJson}
        //    // ,{text:"\n　　系统自动回收的金币：A;",style:contentTextStyleJson}
        //     ,{text:"\n　　X=胡牌番数（包含杠牌等特殊情况后的番数），P=失败玩家数量，N=房间底分;",style:contentTextStyleJson}
        //     ,{text:"\n\n二、有玩家离线时，离线的玩家将会自动被托管并参与最后的正常结算，离线的玩家再次上线会自动重连断开的牌局;",style:contentTextStyleJson}
        // ]

        // //鸡平胡特殊规则
        // this.jp_text_special = <Array<egret.ITextElement>>[
        //      {text:"一、漏胡:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　若玩家A为叫胡的状态下，如下家B打出一张玩家A可以胡的牌而玩家A却放弃不胡，那若对家C或上家D打出相同的一张牌时，玩家A是不能胡那一张的。除非玩家A有进行动牌的情况，动牌的意思在于碰、上、杠、模牌的。当有动牌后，那不能胡那一张的规则便解除。",style:contentTextStyleJson}
        //     ,{text:"\n\n二、一炮三响:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　同一张牌点三个炮，点炮者包三家。胡牌者不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
        //     ,{text:"\n\n三、海底捞月:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　摸最后一张牌胡牌。不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
        //     ,{text:"\n\n四、承包:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　1.抢杠胡：明刻开明杠，可以被抢杠胡，抢杠胡等同杠开，当自摸，被抢杠者（欲开杠者）包三家牌，暗杠不可抢杠胡。抢杠者牌型不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
        //     ,{text:"\n　　2.杠上开花：不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
        //     ,{text:"\n　　3.杠上开花包杠：开暗刻明杠补牌后胡牌，计自摸，点杠者包三家牌。 不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
        //     ,{text:"\n　　4.包自摸规则： 十二张落地包自模，包先不包后。例一：若玩家A打出一张牌让其中一名玩家做成十二张落地（即已碰/吃/明杠出的牌共有12张牌）而做成该玩家为单吊一张叫胡的情况时，该名打出者A必须承担包自模的责任，即若该名玩家在12张落地的情况时自模胡牌．该打出让玩家成立12张落地的玩家A便需要为其余两家代付该笔自模的积分．例二：玩家A放一张让玩家B12张落地达成，及后玩家A再放一张让玩家C或 D12张落地达成，此时玩家A只需要承担包玩家B自模的责任，不需要承包玩家C和D",style:contentTextStyleJson}
        //     ,{text:"\n　　5.特殊牌型包自摸： 大四喜：玩家已碰出东、南、西、北，任意3款．若有人打出余下一款者，那人则需承担包自模的责任。 大三元：玩家已碰出红中、白板、发财，任意2款．若有人打出余下一款者，那人则需承担包自模的责任",style:contentTextStyleJson}
        //     ,{text:"\n　　6.暗刻开明杠，不算抢杠胡，胡牌者只能胡点杠那张牌，只算普通胡牌",style:contentTextStyleJson}
        //     ,{text:"\n\n五、特殊情况:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　1.天和：只有庄家独有的权利，庄家起牌后即成和牌牌型。按6番计算",style:contentTextStyleJson}
        //     ,{text:"\n　　2.人和：起牌后，庄家打出的第一张牌，闲家吃和。按6番计算",style:contentTextStyleJson}
        //     ,{text:"\n　　3.地和：起牌后，第一圈里闲家自摸的第一张牌和牌。按6番计算。注：第一圈里如有人吃、碰牌，有人摸第一张牌，已不生效，不成地和",style:contentTextStyleJson}
        // ]

        // //推倒胡规则
        // this.td_text_basic = <Array<egret.ITextElement>>[
        //     {text:"一、用牌:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　万条筒东南西北中发白,共136张牌",style:contentTextStyleJson}
        //     ,{text:"\n\n二、执位:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　当四位玩家准备游戏后，由系统随机分配风位。按照东、南、西、北的次序逆时针排列",style:contentTextStyleJson}
        //     ,{text:"\n\n三、风圈:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　第一圈风圈为东。每打完一圈，则按照东、南、西、北的次序转换风圈。当最后一位玩家做庄之牌局完结而没有连庄情况出现，则牌局的一个循环完结，称为“一圈”",style:contentTextStyleJson}
        //     ,{text:"\n\n四、定庄:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　谁赢谁坐庄,庄家胡牌或者荒庄(流局)则继续坐庄；4个玩家任意一个离开后重新组成的牌局，将重新执位",style:contentTextStyleJson}
        //     ,{text:"\n\n五、",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　不可以吃，可以碰和杠",style:contentTextStyleJson}
        //     ,{text:"\n\n六、杠牌规则:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　1、杠牌立即结算积分",style:contentTextStyleJson}
        //     ,{text:"\n　　2、放杠：即玩家所出牌造成了其他人的杠牌，则该玩家将赔 3 倍底分给杠牌者",style:contentTextStyleJson}
        //     ,{text:"\n　　3、明杠：某玩家摸牌后明杠牌（已有碰的牌继续杠）。在最后结算时，其余三家每人均赔给杠牌者 1 倍底分",style:contentTextStyleJson}
        //     ,{text:"\n　　4、暗杠：同自摸原理。某玩家暗杠后，在最后结算时，其余三家每人均赔给杠牌者 2 倍底分",style:contentTextStyleJson}
        // ]
        // //推倒胡结算
        // this.td_text_Clearing = <Array<egret.ITextElement>>[
        //     {text:"一、失败玩家的积分将消耗： (X*N)*(K+1);",style:contentTextStyleJson}
        //     ,{text:"\n　　胜利玩家积分将奖励： (X*N*3)*(K+1);",style:contentTextStyleJson}
        //     //,{text:"\n　　系统自动回收的金币：A;",style:contentTextStyleJson}
        //     ,{text:"\n　　X=自摸番数（包含特殊情况），K=抓中马数，N=房间底分;",style:contentTextStyleJson}
        //     ,{text:"\n\n二、有玩家离线时，离线的玩家将会自动被托管并参与最后的正常结算，离线的玩家再次上线会自动重连断开的牌局;",style:contentTextStyleJson}
        // ]

        // //推倒胡特殊规则
        // this.td_text_special = <Array<egret.ITextElement>>[
        //     {text:"一、抓马:",style:tetleTextStyleJson}
        //     ,{text:"\n\n　　1、牌局结束，胡牌者从剩余的牌中进行抓马操作，不同的场次抓马的数量",style:contentTextStyleJson}
        //     ,{text:"\n　　2、假设4个玩家以ABCD来代替，A为庄家，若玩家抓马抓中以下牌时，每中一个马，赢家赢的分值加一倍，输家输的分值也加一倍",style:contentTextStyleJson}
        //     ,{text:"\n　　　 A：1，5，9，东；共40张牌",style:contentTextStyleJson}
        //     ,{text:"\n　　　 B：2，6，中，南；共32张牌",style:contentTextStyleJson}
        //     ,{text:"\n　　　 C：3，7，发，西；共32张牌",style:contentTextStyleJson}
        //     ,{text:"\n　　　 D：4，8，白板，北；共32张牌",style:contentTextStyleJson}
        //     ,{text:"\n\n二、承包:",style:tetleTextStyleJson}
        //     // ,{text:"\n\n　　1、抢杠胡：明刻开明杠，可以被抢杠胡，抢杠胡等同杠开，当自摸，被抢杠者（欲开杠者）包三家牌，暗杠不可抢杠胡。抢杠者牌型不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
        //     // ,{text:"\n　　2、杠上开花：不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
        //     // ,{text:"\n　　3、杠上开花包杠：开暗刻明杠补牌后胡牌，计自摸，点杠者包三家牌。 不满3番牌型，按照3番满计算，大于3番的牌型，按照实际牌型计算",style:contentTextStyleJson}
        //     ,{text:"\n\n　　杠上开花包杠：开暗刻明杠补牌后胡牌，计自摸，点杠者包三家牌。",style:contentTextStyleJson}

        // ]
    }

}
