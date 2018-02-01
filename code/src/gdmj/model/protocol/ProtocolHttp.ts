/**
 * Http协议
 * @author chenkai
 * @date 2016/11/17
 */
class ProtocolHttp {
    /**http 头*/
    public static httpHead = {
        ver: "1.6.1",
        AssetID: 1,
        mainID: 100
    }

    /**接收登录*/
    public static rev_z_login = {
        ret: 0,
        desc: "",
        action: "",
        mainID: 0,
        AssetID: 0,
        data: {
            hadinvited: 1,
            deskTime: "",
            user: "",
            name: "",
            sex: -1,
            skey: "",
            avater_url: "",
            password: "",
            is_overtime: 0,
            last_ip: "",
            uid: 0,
            ip: "",
            port: "",
            prushport: "",
            excluroom_name: "",
            excluroom_code: "",
            is_visitor: 0
        }
    }


    /**测试账号登录*/
    public static send_z_login = {
        action: "Login",
        param: {}
    };

    /**微信授权页面登录*/
    public static send_z_loginweixin = {
        action: "LoginWeiXin",
        param: { code: "" }
    }

    /**Native微信登录*/
    public static send_z_loginapp = {
        action: "LoginApp",
        param: { code: "", refToken: "" }
    };

    /**雀神榜 {"playerID":9226}}*/
    public static send_z_godrank = {
        action: "Billboard",
        param: { playerID: 0 }
    }

    /**财富榜榜*/
    public static send_z_richrank = {
        action: "Wealthboard", param: { playerID: 0 }
    }

    /**积分榜榜*/
    public static send_z_scorerank = {
        action: "Integrationboard", param: { playerID: 0 }
    }

    /**领奖*/
    public static send_z_avard = {
        action: "Receiveprize", skey: "74db1b6807182ffa1bf7a04cbc6a4562", uid: 0, param: []
    }

    /**战绩*/
    public static send_z_combat = {
        action: "CombatGains",
        param: { playerID: 0 }

    }

    /**战绩详情*/
    public static send_z_combatdetail = {
        action: "CombatGainsdetail",
        param: { deskno: 0, buildDate: 0, playerID: 0, roomid: 0 }
    }


    /**反馈*/
    public static send_z_feedback = {
        skey: "",
        uid: 0,
        action: "Feedbacks",
        param: { content: "" }
    }

    /**购买*/
    public static send_z_buyprop = {
        action: "BuyProp",
        skey: "",
        uid: 0,
        param: { propid: 0, platform: 1}
    }

     /**支付方式*/
    public static send_z_buypayment = {
        action: "Payment",
        skey: "",
        uid: 0,
        param: {}
    }

    /**确认支付接口 */
    public static send_z_buySure = {
        action: "PlaceOrder",
        skey: "",
        uid: 0,
        param: {goodsid:1, pay_type:1}
    }

     /**获取背包*/
    public static get_z_back = {
        action: "GetBackpack",
        skey: "",
        uid: 0,
        param: {}
    }

    /**商品列表   type(1钻石，2独立型房卡，3共付型房卡)*/
    public static send_z_goodsList = {
        action: "GoodsList",
        skey: "",
        uid: 0,
        param: { type: 0 }
    }
    
    /**公告跑马灯*/
    public static send_z_marquee={
        action:"Marquee",
        param:[]
    }

    /**回放*/
    public static send_z_replayCombatGain = {
        action: "ReplayCombatGain",
        skey: "",
        uid: 0,
        param: { replaycode: 0 }
    }

    /**爱贝支付*/
    public static send_z_Pay = {
        action: "ApplyABPay",
        skey: "",
        uid: 0,       
        param: { goodsid: 0, pay_type: 0 }
    }

    /**邮件列表*/
    public static send_z_emailList = {
        action: "GetEmailByUser",
        skey: "",
        uid: 0,
        param: []
    }

    /**邮件详情*/
    public static send_z_emailDetail = {
        action: "ReadEmail",
        skey: "",
        uid: 0,
        param: { eid: 0 }
    }

    /**获取邮件物品*/
    public static send_z_getEmailGoods = {
        action: "ReceiveEmail",
        skey: "",
        uid: 0,
        param: { eid: 0 }
    }

    /**获取所有邮件物品*/
    public static send_z_getAllEmailGoods = {
        action: "ReceiveEmail",
        skey: "",
        uid: 0,
        param: []
    }

    /**删除所有邮件*/
    public static send_z_delAllEmail = {
        action: "OneKeyDel",
        skey: "",
        uid: 0,
        param: []
    }

    /**检查邮件状态*/
    public static send_z_checkMail = {
        action: "CheckMail",
        skey: "",
        uid: 0,
        param: []
    }
    /**检查分享领取状态*/
    public static send_z_checkShareAward = {
        action: "CheckShare",
        skey: "",
        uid: 0,
        param: []
    }

    /**签到奖品列表*/
    public static send_z_signInList = {
        action: "SignInPriceList",
        skey: "",
        uid: 0,
        param: []
    }

    /**签到详情*/
    public static send_z_signInDetail = {
        action: "SignInPricedetail",
        skey: "",
        uid: 0,
        param: { id: 0 }
    }

    /**抽奖奖品列表*/
    public static send_z_lotteryList = {
        action: "LotteryDrawList",
        skey: "",
        uid: 0,
        param: []
    }

    /**抽奖详情*/
    public static send_z_lotteryDetail = {
        action: "LotteryDrawDetail",
        skey: "",
        uid: 0,
        param: []
    }

    /**背包*/
    public static send_z_bag = {
        action: "BackPack",
        skey: "",
        uid: 0,
        param: { type: 0 }
    }


    public static send_z_shareCount = {
        action: "ShareCount",
        skey: "",
        uid: 0,
        param: []
    }

    public static send_z_shareDetial = {
        action: "ShareDetail",
        skey: "",
        uid: 0,
        param: { mid: 0, type: 0, sharenum: 0 }// 1   2
    }
    /**当被分享进入游戏时，插入一条分享数据*/
    public static send_z_one_insertShare = {
        action: "InsertShare",
        skey: "",
        uid: 0,
        param: { pid: 0, sid: 0 }     //pid分享链接的人，sid点击进入链接，并玩了一局游戏的人
    }

    /**发送点击分享链接进入，并且玩了一局游戏*/
    public static send_z_InsertShare = {
        action: "UpdateShare",
        skey: "",
        uid: 0,
        param: {}
        //        action: "InsertShare",
        //        skey: "",
        //        uid: 0,
        //        param: { pid: 0, sid: 0 }     //pid分享链接的人，sid点击进入链接，并玩了一局游戏的人
    }

    public static aibData = {
        transId: "",
        retFunc: "callback"
    }

    /**检查vip*/
    public static send_z_CheckVip = {
        action: "CheckVip",
        skey: "",
        uid: 0,
        param: []
    }

    /**获取福利列表*/
    public static send_z_WelfareList = {
        action: "WelfareList",
        skey: "",
        uid: 0,
        param: []
    }

    /**领取救济金*/
    public static send_z_AlmsList = {
        action: "AlmsList",
        skey: "",
        uid: 0,
        param: []
    }

    /**开通vip */
    public static send_z_openVip = {
        action: "ApplyABPay",
        skey: "",
        uid: 0,
        param: {
            goodsid: 0,
            pay_type: 0
        }
    }
    /**金币场**/
    public static sendGoldRoom = {
        action: "Getvenue",
        skey: "",
        uid: 0,
        param: []
    }

    /**金币场房间数据。部分数据是int型，发过来都是string，需要parseInt自己转*/
    public static GoldRoomJson = {
        GameID: "",                              //游戏id
        base_money: "",                           //底注
        id: "",                                  //?
        level: "",                               //房间等级
        max_money: "",                            //最高金币限制
        min_money: "",                            //最低金币限制
        versusroomcfg: {
            hasBenefit: true,                   //该房间是否有救济金领取功能
            benefitLower: 2000,                 //救济金最低领取限制
            benefitList: [2500, 3000, 3500],      //救济金抽奖的备选金额
            benefitMaxCnt: 3,                   //救济金最多领取次数
            gameConfig: {
                gameType: 1,            //游戏配置，游戏类型 1鸡平胡 2推倒胡
                maiMaNum: 0
            }            //买马数
        }
    }

    /**专属房信息*/
    public static sendExclusiveRoom = {
        action: "GetExclusiveRoom",
        skey: "",
        uid: "",
        param: []
    }
    /**专属房信息修改 */
    public static SendEditExclusiveRoom = {
        action: "EditExclusiveRoom",
        skey: "",
        uid: "",
        param: {
            gameConfig: {},
            deskName: "",
            basePoint: 0,
            playCount: 0,
            chip: 0,
            deposit: 0
        },
    }

    /**二维码分享**/
    public static ShareByQrcode = {
        action: "ShareByQrcode",
        skey: "",
        uid: 0,
        param: {
            deskCode: "",
            deskId: 0
        }
    }

    /**增加桌子**/
    public static AddDesk = {
        action: "AddDesk",
        uid: 0,
        skey: "",
        param: {
            gameConfig: ProtocolData.gameConfig,
            basePoint: 0,
            ip:"",
            port:0
        }
    }

    /**
     * 获取排行榜
     */
    public static GetRankList = {
        action: "Billboard",
        skey: "",
        uid: 0,
        param: []

    }
    /**
     * 获取算分列表
     */
    public static GetScoreList = {
        action: "CombatGains",
        skey: "",
        uid: 0,
        param: []
    }

    /**
     * 获取战绩详情列表
     */
    public 　static GetScoreDetailList = {
        action: "CombatGainsdetail",
        skey: "",
        uid: 0,
        param: { deskBuildDate: 0, deskCode: 0 }
    }

    /**
     * 个人信息
     */
    public static getUserInfo = {
        action: "PersonalInfo",
        skey: "",
        uid: 0,
        param: {}
    }

    /**
     * 玩家信息
     */
    public static getOtherUserInfo ={
        action: "OtherPlayerInfo",
        skey: "",
        uid: 0,
        param: {uid:0}
    }

    /**
     * 修改昵称
     */
    public static editNickName = {
        action: "EditNickName",
        skey: "",
        uid: 0,
        param: {nickname:"xx"}
    }

    /**
     * IM登录
     */
    public static IMLogin = {
        action:"LoginIM",
        ver:"1.6.1",
        param:{token:"", uid:"123"}

    }

    /**
     * 报备
     */
    public static baoBei ={
        action:"LoginIM",
        ver:"1.6.1",
        param:{imei:"",platform_type:0}
    }

    /**
     * 添加好友
     */
    public  static AddFriend={
        action:"AddFriend",
        ver:"1.6.1",
        skey: "",
        uid: 0,
        param:{uid:0}
    }

    /**
     * 分享记录
     */
    public  static getShareRecord={
        action:"CombatGainsShare",
        ver:"1.6.1",
        skey: "",
        uid: 0,
        param:{
            deskBuildDate: "0",
            deskCode: "0"
        }
    }

    /**
     * 获取二维码
     */
    public static getQrCodeImg = {
        action:"ShareByQrcode",
        ver:"1.6.1",
        skey: "",
        uid: 0,
        param:{
        }
    }

    /**
     * 获取列表头像url
     */
    public static getIconUrl = {
        "action":"HeadimgList",
        "ver":"1.6.1",
        "skey":"",
        "uid":0,
        "param":{}
    }

    /**
     * 发送基础信息
     */
    public static sendBaseInfo = {
        "action":"EditPersonalInfo",
        "ver":"1.6.1",
        "skey":"",
        "uid":0,
        "param":{
            "sex":"2",
            "headimgindex":"1",
            "name":"abc"
        }
    }
}