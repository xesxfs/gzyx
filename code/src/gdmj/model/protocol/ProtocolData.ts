/**
 * Socket通讯协议
 * @author  chenkai
 * @date 2016/7/4
 */
class ProtocolData {

    /**接收准备*/
    public static Rev100165 = {
        userid: 0,      //玩家id
        deskstation: 0, //位置
    }

    /**接收取消准备*/
    public static Rev108_2_2 = {
        userid: 0,      //玩家id
        deskstation: 0, //位置
    }

    /**玩家加入房间(to_game)*/
    public static Rev104_4_2 = {
        userid: 0,
        exp: 0,
        money: 0,
        dwBank: 0,
        deskno: 0,
        deskstation: 0,
        userstate: 0,
        sex: 0,
        wincount: 0,
        losecount: 0,
        midcount: 0,
        szName: "",
        nickname: "",
        signature: 0,
        isrobot: 0,
        avater: "",
        point:0,
        reconnect: 0,
        vip_rank: 0,
        build_desk_count: 0
    }

    /**用户信息*/
    public static toGame = {
        userid: 0,
        exp: 0,
        money: 0,
        dwBank: 0,
        deskno: 0,
        deskstation: 0,
        userstate: 0,
        sex: 0,
        point:0,
        wincount: 0,
        losecount: 0,
        midcount: 0,
        szName: "",
        nickname: "",
        signature: 0,
        isrobot: 0,
        avater: "",
        reconnect: 0,
        vip_rank: 0,
        build_desk_count: 0
    }

    /**游戏开始*/
    // public static Rev180_51_0 = {
    //     seatID: 0,   //庄家位置
    //     userID: 0,   //玩家ID
    //     fengWei: 0,  //庄家风位
    //     fengQuan: 0,  //当前局的风圈
    //     changeCnt: 0, //换庄次数
    //     diceList: [] //随机庄家时需要打骰子比大小, 可选
    // }

    /**
     * 游戏开始
     */
    public static Rev100806 = {
        dice2: 0,
        seatID: 0,
        userID: 0,
        zhaNiaoNum: 0,
        dice1: 0
    }

    /**起手胡数据 */
    public static Rev100900 = {
        code: 0,
        command_id: 0,
        info: []
    }

    public static QiShouHU = {
        seatID: 0,
        loseWinPoint: [],
        dice: {
            dice1: 0,
            dice2: 0
        },
        typeList: [],
        cardList: []
    }

    /**骰子数据*/
    public static diceInfo = {
        dice1: 0, //范围 1 - 6
        dice2: 0  //范围 1 - 6
    }

    /**游戏开始发牌每人13张*/
    public static Rev180_52_0 = {
        deleaveCard: [] //发牌信息列表 deleaveCardInfo
    }

    /**发牌信息*/
    public static deleaveCardInfo = {
        seatID: 0,   //座位
        userID: 0,   //用户ID
        cardList: [] //玩家牌列表
    }

    /**玩家摸牌(摸牌、吃碰杠胡)*/
    public static Rev180_53_0 = {
        seatID: 0,         //座位
        state: 0,         //玩家操作状态 enum ACT
        cardList: [],      //摸到的牌
        cannotOutCard: []  //不能出的牌
    }

    /**玩家请求操作，吃、碰、胡等*/
    public static Send100810 = {
        seatID: 0,    //座位
        act: 0,      //动作 enum ACT
        cardList: []  //吃、碰的牌，吃牌时，牌放在列表首位
    }

    /**通知玩家操作(其他玩家打出牌，通知玩家吃、碰等)*/
    public static Rev180_55_0 = {
        seatID: 0,   //座位
        state: 0,   //动作 enum ACT
        card: 0,     //被吃、碰的牌
        isAgainstAct: false,    //是否针对操作?
        isAgainstQiangGangHu: false, //是否针对抢杠胡?
    }

    /**响应玩家操作 (其他玩家吃、碰等，广播给另外3玩家)*/
    public static Rev180_56_0 = {
        seatID: 0,     //座位
        act: 0,       //动作 enum ACT
        cardList: [], //操作的牌,可选,吃牌的时候要吃的牌放在列表首位
        actParam: 0    //操作的额外参数， 吃碰牌时该值为吃碰的那张牌， 杠时是牌的张数（1张是补杠， 3张是点杠， 4张是暗杠）， 胡牌时是胡的那张牌， 过牌和出牌该值不传无用
    }

    /**通知玩家出牌  (吃碰牌后通知出牌 ?)*/
    public static Rev180_57_0 = {
        seatID: 0,  //座位
        state: 0   //动作 enum ACT
    }

    /**游戏结束*/
    public static Rev180_58_0 = {
        resultList: [],   //结算信息,resultInfo
        maxPlayCount: 0,  //最大游戏局数
        curPlayCount: 0,  //当前游戏局数
        curTime: 0,       //当前时间
        isDianPao: false, //是否点炮
        dianPaoSeat: 0,   //点炮玩家座位，可选
        isBaoSanJia: false,//是否包三家
        baoSanJiaType: 0,  //包三家的类型
        baoSanJiaSeat: 0,  //包三家玩家的位置
        isQiShouHu: false,   //是否起手胡
        dice: [],            //骰子
        niaoPai: [],          //中鸟的牌
        zhongNiaolist: [],    //中鸟人列表
        zhuangSeat: 0,            //庄的座位号
        huSeatList: []               //胡牌的人的座位号
    }

    /**结算信息*/
    public static resultInfo = {
        seatID: 0,       //座位
        isBanker: false, //是否庄家
        lossWinPoint: 0, //输赢分数 (金币场代表本场输赢总金币，积分场代表本场输赢总积分)
        cards: [],       //手牌
        chiCards: [],    //吃的牌
        pengCards: [],   //碰的牌
        gangCards: [],   //杠的牌
        anGangCards: [], //暗杠的牌
        huCard: 0,       //胡的牌
        fan: 0,          //番数
        curPiont: 0,     //当前分数  (金币场无用，积分场代表当前拥有积分)
        is_zi_mo:false,
        gangLossWinPoint: 0, //杠分  
        huType: []         //胡牌类型 MJ_TYPE
    }

    /**游戏状态*/
    public static Rev100803 = {
        gameConfig:{},// ProtocolData.gameConfig,   //游戏配置，预留(内含GAME_TYPE)
        lastCardNum: 0,    //剩余牌数
        oniCard: 0,        //鬼牌
        bankerSeat: 0,     //庄家位置
        deskStatus: 0,    //游戏状态 GS_GAME_STATION
        gameSeatInfo: [], //位置信息  GameSeatInfo
        fengQuan: 0,       //风圈
        maxPlayCount: 0,   // 最大游戏局数
        curPlayCount: 0,   //当前游戏局数
        curCanDoAct:0,     //游戏动作状态
        pre_op_card:0,     //最后一张打出的牌
        pre_speaker_seat:0, //最后一个出牌的人
        changeCnt: 0       //换庄次数
    }

    /**位置信息*/
    public static GameSeatInfo = {
        seatID: 0,             //座位
        userID: 0,            //玩家ID
        status: 0,            //玩家状态 PLAYER_STATE
        handCards: [],         //手牌
        chiCards: [],          //吃牌
        pengCards: [],         //碰牌
        gangCards: [],         //明杠牌
        anGangCards: [],       //暗杠牌
        playOutCards: [],      //打出的牌
        point: 0,              //玩家分数
        last_card:0,           //最后一张摸到牌
        feiWei: 0              //风位
    }

    /**发送聊天*/
    public static Send111_1_0 = {
        msgType: 0,  //消息类型 CHAT_TYPE
        msg: ""       //消息
    }

    /**接收聊天*/
    public static Rev111_1_1 = {
        msgType: 0,   //消息类型
        msg: "",       //消息
        sendUserID: 0, //发送的玩家ID
        sendSeatID: 0  //发送玩家的位置
    }

    /**接受禁言 */
    public static Gag111_2_1 = {
        banPostUserID: 0, //禁言玩家ID
        banType: 0        //禁言类型
    }

    /**接收退出房间*/
    public static Rev102_5_1 = {
        userid: 0,      //玩家ID
        deskno: 0,
        deskstation: 0, //位置
    }

    /**接收牌局信息，桌子解散时接收*/
    public static Rev180_62_0 = {
        RecordList: [],
        maxPlayCount: 0,  //最大局数
        curPlayCount: 0   //当前局数
    }

    /**牌局信息*/
    public static recordInfo = {
        userID: 0,      // 玩家ID
        point: 0,       //分数
        ziMoNum: 0,     //自摸数
        jiePaoNum: 0,   //接炮数
        dianPaoNum: 0,  //点炮数
        anGangNum: 0,   //暗杠数
        mingGangNum: 0 //明杠数
    }

    /**发送再来一战 104_8_0*/
    public static Send104_8_0 = {
        inviterID: 0,   //邀请者ID
        inviterName: "",//邀请者名称
        deskCode: "",   //邀请进入的房间
        deskno: 0,      //邀请进入的房间号
    }

    /**接收再来一战 104_8_0*/
    public static Rev104_8_0 = {
        inviterID: 0,   //邀请者ID
        inviterName: 0, //邀请者名称
        deskCode: "",   //邀请进入的房间
        deskno: 0,      //邀请进入的房间号
    }

    /**发送测试换牌*/
    public static Send180_100_0 = {
        seatID: 0,   //位置
        preCard: 0,  //要换的牌
        newCard: 0   //新换得的牌
    }

    /**接收测试换牌*/
    public static Rev100822 = {
        seatID: 0,    //位置
        cardList: []  //新的手牌(不包括吃碰等，只有手牌)
    }

    /**测试色子点数 */
    public static Send100824 = {
        seatID: 0,  //位置
        dice1: 0,   //点数1
        dice2: 0    //点数2
    }

    /**测试确定下次发的牌*/
    public static Send180_99_0 = {
        seatID: 0,
        cardList: []
    }

    /**测试看最后一张牌，用来测试海底捞月*/
    public static Send180_102_0 = {
        cardpos: 0   //-1最后一张，0第一张
    }

    /**接收测试看最后一张牌*/
    public static Rev180_103_0 = {
        card: 0 //要看的牌
    }

    /**玩家申请解散桌子*/
    public static Send104_5_0 = {
        deskno: 0   //桌子号
    }

    /**接收申请解散返回*/
    public static Rev104_5_1 = {
        retCode: 0 //1 桌子直接解散， 2 等待其他玩家确认
    }

    /**返回询问是否同意解散*/
    public static Rev104_5_2 = {
        deskno: 0,        //桌子号
        solveUserID: 0,   //解散桌子玩家ID
        solveUserName: "" //解散桌子玩家名字
    }

    /**发送是否同意解散的回答*/
    public static Send104_5_5 = {
        deskno: 0,  //桌子号
        isArgee: false //是否同意
    }

    /**接收桌子解散广播*/
    public static Rev104_5_6 = {
        isDissolve: false,  //是否解散成功, 可选
        isOwnerRepel: false //是否是房主拒绝
    }

    /**买马结果*/
    public static Rev180_59_0 = {
        seatID: 0,    //座位号
        cardList: [], //买的马
        hitNum: 0,    //买中数
        hitCardList: []//买中的马
    }

    /**通知鬼牌*/
    public static Rev180_60_0 = {
        oniCard: 0,  //鬼牌
        diceNum1: 0, //摇骰子的数1， int， 可选
        diceNum2: 0, // 摇骰子的数2, int , 可选
        digOutCard: 0//实际翻出的牌 int, 可选
    }

    /**通知杠结算*/
    public static Rev180_61_0 = {
        gangSeatID: 0,    //杠牌的玩家位置
        actParam: 0,      // 1 为 补杠， 3 为点杠， 4 为暗杠
        preGangSeatID: 0, //可选， 被杠的玩家位置
        lossWinPoint: []  //输赢的点数
    }

    /**接收更新玩家信息*/
    public static Rev180_5_0 = {
        playerInfoList: [] //游戏里的玩家信息 playerGameInfo
    }

    /**玩家信息*/
    public static playerGameInfo = {
        userID: 0, //用户id
        seatID: 0, //座位号
        point: 0   //玩家分数
    }

    /**接收桌子结束*/
    public static Rev104_4_0 = {
        deskID: 0,   //桌子ID
        overType: 0  // 结束类型, 1 局数打完， 2 时间到期， 3 房主解散桌子
    }

    /**发送托管*/
    public static Send180_6_0 = {
        isTrship: false // 托管(true)或者取消托管(false)
    }

    /**接收托管*/
    public static Rev180_7_0 = {
        seatID: 0,      //位置id 
        isTrship: false // 托管(true)或者取消托管(false)
    }

    /**赠送房间*/
    public static Send104_3_0 = {
        deskno: 0,    //桌子ID
        giftUserID: 0 //被转赠的玩家ID
    }

    /**转增房间返回*/
    public static Rev104_3_1 = {
        retCode: 0  // 0 成功, 1 桌子不存在， 2 不是房主， 3 被赠予玩家不在线或者不在桌子上, 4 房卡不足
    }

    /**接收赠送房间*/
    public static Rev104_3_2 = {
        deskno: 0,  //桌子ID
        preDeskOwnerID: 0,    //之前的桌子房主ID
        preDeskOwnerName: "", //之前桌子房主名称
        newDeskOwnerID: 0,    //新的桌子房主ID
        newDeskOwnerName: "", //新的桌子房主名称
    }

    /**回放数据*/
    public static replay = {
        PI: [],                         //用户信息列表 [[userName:"",userid:0,seatid:0,point:0, [card1,card2,...]], [], ...]
        GC:{},// ProtocolData.gameConfig,    //游戏配置
        ST: 0,                          //开始时间
        ET: 0,                          //结束时间
        GI: {
            bseat: 0,                   //庄家位置
            fq: 0,                      //风圈
            fw: 0,                      //风位
            dice: [],                   //骰子  [[d1,d2],[d1,d2],...]
            oni: 0,                     //可选
            maNum: 0,                   //可选
            maima: [],                  //可选 [{seat:0,hit:0,ma:[card1,card2,...]}, {},...]
        },
        GA: [],                         //游戏动作 [  [seatid:0,actid:0,[card1,card2,...],act_time:0,[change_point1,...]], [], ...]
        SI: ProtocolData.Rev180_58_0    //结算信息   
    }

    /**发送互动道具*/
    public static Send112_1_0 = {
        toUserid: 0, //接受互动道具的玩家ID
        itemType: 0, //道具类型 类型 1-6
    }

    /**接收互动道具失败*/
    public static Rev112_1_1 = {
        retCode: 0 //失败原因， 1 货币不足， 2 玩家和接收玩家不在同一桌子上, 3 道具不存在
    }

    /**广播互动道具*/
    public static Rev112_1_2 = {
        sendUserid: 0,//发送玩家
        toUserid: 0,  //接受玩家
        itemType: 0,  //道具类型
        burn: 0,      //货币消耗数量
    }

    /**发送领取救济金*/
    public static Send113_2_0 = {
        choose: 0, //玩家选择的宝箱标号
    }

    /**接收领取救济金*/
    public static Rev113_2_1 = {
        "retCode": 0,   //返回码， 0 成功， 1 当前不能领取
        "money": 0,     //获取的金币数
        "all": []        //所有宝箱中金币的数目
    }

    /**接收踢人广播*/
    public static Rev102_20_1 = {
        kickByUserid: -1,   //踢人的玩家ID， 负数为系统
        kickUserid: 0,
        kickCause: 0      //踢人理由 KickCause
    }
    /**房主踢人返回**/
    public static Rev102_20_2 = {
        retCode: -1,// 0 成功,1 不在桌子上,2 不是房主,3 被踢的玩家不存在， 4 玩家现在还不能被踢
    }
    /***通知玩家被踢出*/
    public static Rev102_20_3 = {
        kickByUserid: -1,// 踢人的玩家ID， 负数为系统
        deskID: 0,// 桌子ID
        ownerID: 0,// 房主ID
        kickCause: 0,// 踢人理由

    }


    ///////////////////////////////////////////////
    //----------------[websocket platfrom]---------
    ///////////////////////////////////////////////
    /**游戏服务器登录*/
    public static Send100002 = {
        userid: 0, //用户id
        pass: ""    //密码 md5
    }

    /**登录返回 */
    public static Rev100002 = {
        code: 0,
        command_id: 100002,
        info: {}
    }

    /**推送服务器登录*/
    public static Send181_0_0 = {
        userid: 0, //用户id
    }

    /**用户数据*/
    public static to_game = {
        userid: 0,    //用户id
        exp: 0,       //经验
        money: 0,     //
        dwBank: 0,
        deskno: 0,
        deskstation: 0,
        userstate: 0,
        sex: 0,
        point:0,
        wincount: 0,
        losecount: 0,
        midcount: 0,
        szName: 0,
        nickname: "",
        signature: 0,
        isrobot: 0,
        avater: "",
        reconnect: false,
        vip_rank: 0,
        build_desk_count: 0
    }

    /**玩家游戏中登录或没有正常登出*/
    public static Rev100_3_8 = {
        gamename: 0,  //游戏名字
        gameid: 0,    //游戏ID
        roomname: 0,  //房间名字
        roomid: 0,    //房间Id
        userid: 0    //用户Id
    }

    /**断线重连*/
    public static Rev100010 = {
        code: 0,
        command_id: 0,
        info: {
            deskInfo:{} ,//ProtocolData.deskInfo,
            desk_code: "",
            deskindex: 0,
            deskstation: 0,
            userid: 0,
            userlist: [],
            userpoint: 0,
            userstate: 0,
            chat_room_id: ""
        }


    }

    /**创建房间*/
    public static Send104_1_0 = {
        deskName: "",// 房间名字， string
        playCount: 0,// 对战局数， int,可选
        //        deskCode: "",// 房间暗号， string,可选
        gameConfig: {}, //游戏配置
        isCooperate: false,// 是否是合作型房间
        isOneMoreHand: false,// 是否是再来一局
    }

    /**接收创建房间*/
    public static Rev104_1_1 = {
        retCode: 0,  //返回结果码, int，0 成功, 3 创建数量达到上限， 1 消耗XXX(开房卡)不足, 2 桌子数达到上限, 4 暗号已存在或为空
        deskInfo: {}  //开好的房间信息
    }


    /**获取游戏服务器*/
    public static Send200_1_0 = {
        userid: 0,//# 玩家id
        deskCode: "",//string,# 房间暗号，如果是创建房间，可以不传
        serverType: 0,//int,# 服务器类型， 1 创建房间， 2 加入房间 ; 币场为 鸡平胡 1， 推倒胡 2
        roomLevel: 0,
        gameid: 0
    }

    /**接收游戏服务器*/
    public static Rev200_1_1 = {
        retCode: 0,//0正常返回 1房间不存在
        host: "",//string,# 房间暗号，如果是创建房间，可以不传
        port: 0//int,# 服务器类型， 1 创建房间， 2 加入房间 
    }

    //查询房间号是否存在
    public static Send200_2_0 = {
        gameid: 0,
        deskCode: 0
    }

    //返回房间号是否存在
    public static Rev200_2_1 = {
        isExist: false
    }


    /**玩家进入广播*/
    public static Rev102_4_2 = {
        user: {}
    }

    /**桌子信息*/
    public static deskInfo = {
        deskID: 0,     //桌子号
        deskName: 0,
        ownerName: 0,
        ownerID: 0,
        isHavePassword: 0,
        peoplecount: 0,
        curSitPeopleCoiunt: 0,
        curUpPeopleCount: 0,
        gameConfig: {},
        playCount: 0,
        curPlayCount: 0,
        lastTime: 0,
        deskDesc: 0,
        curTalkRoomPepCount: 0,
        talkRoomMaxPepCount: 0,
        isCooperate: false,//是否为共付房间
        deskCode: 0,    //桌子暗号，创建和加入房间输入的6位数
        needCard: 0,
        deskLevel: 0, //房间等级
        basepoint: 0, //底分
        gameid: 0,    //游戏id
    }


    /**游戏配置*/
    public static gameConfig = {
        gameType: 0,//,// 游戏类型
        hasYiPaoSanXiang: false,// 是否有一炮三响
        hasHaiDiLaoYue: false,// 是否有海底捞月
        hasGangShangKaiHua: false,// 是否有杠上开花
        hasQiangGang: false,// 是否有抢杠胡
        hasMaiMa: false,// 是否买马
        maiMaNum: 0,// 买马数
        hasOni: false,// 是否有鬼
        hasYiPaoDuoXiang: true,// 是否有一炮多响
        hasFengQuan: false,// 是否有风圈刻子    (风位风圈刻子是一个选项)
        hasFengWei: false,// 是否有风位刻子
        hasSanYuan: false,// 是否有三元牌刻子
        hasBuBuGao: false,  //是否步步高
        hasGangAddFan: false //杠牌加番 
    }
    /**专属房修改配置 */
    public static exGameConfig = {
        gameType: 0,
        hasYiPaoSanXiang: false,// 是否有一炮三响
        hasHaiDiLaoYue: false,// 是否有海底捞月
        hasMaiMa: false,// 是否买马
        hasFengQuan: false,// 是否有风圈刻子    (风位风圈刻子是一个选项)
        hasFengWei: false,// 是否有风位刻子 
        hasSanYuan: false,// 是否有三元牌刻子  
        hasGangAddFan: false //杠牌加番  
    }


    /**搜索房间*/
    public static Send104_2_0 = {
        deskCode: "",//房间暗号， string,可选
    }

    /**接收搜索房间*/
    public static Rev104_2_1 = {
        deskList: [] // 房间列表 
    }

    /**进入房间*/
    public static Send102_4_0 = {
        deskCode: 0,// 房间ID， int,可选
        deskid: 1//桌子
    }

    //更改房间配置
    public static Send120_1_0 = {
        deskNo: 0,//要修改的房间号
        deskName: "",//房间名称
        deskDesc: "",//房间注释
        basePoint: 0,//底分
        playCount: 0,//每轮玩的局数
        chip: 0,//筹码
        deposit: 0,//押金
        gameConfig: ProtocolData.gameConfig //游戏配置
    }


    /**接收进入房间**/
    //    CANNOT_ENTER_KICK    //专属房     -11 不能加入原因， 被房主踢出
    //    CANNOT_ENTER_FORCED //专属房    -12 不能加入原因， 强退了其他房间
    //    CANNOT_ENTER_FULL  //专属房   -13 不能加入原因， 人满
    public static Rev102_4_1 = {
        retCode: 0,//结果码,0 成功， 1 房间不存在， 2 房间人满， 3 XXX不足,4 位置上已经有人,5 XXX太多
        deskstation: 0,// 位置ID， int,可选		
        deskno: 0,
        deskLst: [],
        userList: [],// 玩家列表,可选,to_game
    }

    /**接收更新房卡*/
    public static Rev103_10_0 = {
        userID: 0,          //玩家ID
        changeCardNum: 0,   //变化的数量
        isCoop: false      //是否是合作型房卡
    }

    /**推送消息**/
    public static pushMessage = {
        action: "",
        receiver: 0,
        param: {}
    };

    /**通知金币变化*/
    public static Rev103_6_0 = {
        money: 0,   //变化的金币
        tax: 0,     //收的台费
        userid: 0,
        exp: 0,
        point: 0
    }
    /**专属房**/
    public static Rev121_1_0 = []

    //    加入桌子（从同一房间的一张桌子移动到另一张）
    public static Send102_8_0 = {
        deskno: 0
    }

    //    #102, 8, 1 返回加入桌子
    public static Rev102_8_1 = {
        retCode: 0,// 0 成功,1 房间不存在,2 桌子人满,3 两个桌子不在同一房间
    }

    //    获取指定的桌子的信息 
    public static Send104_10_0 = {
        deskNo: 0,//# 桌子号
    }

    //    返回获取指定的桌子的信息
    public static Rev104_10_1 = {
        deskinfo: DeskInfo,//# 桌子号 
        userList: [],// # 玩家列表
    }
    //修改房间信息返回
    public static Rev120_1_1 = {
        retCode: -1// 返回码， 0 成功， 2 不是房主或房间不存在， 3 游戏中不能修改
    }

    //修改房间规则返回
    public static Rev100103 = {
        code: 0
    }

    //修改房间信息广播    
    public static Rev120_1_2 = ProtocolData.Send120_1_0;


    /**踢人*/
    public static Send102_20_0 = {
        kickUserID: 0   //被踢玩家
    }
    /**禁言*/
    public static Send111_2_0 = {
        banPostUserID: 0,    //被禁言的玩家ID
        type: 0              //禁言类型
    }

    /**禁言*/
    public static Rev111_2_1 = {
        banPostUserID: 0,    //被禁言的玩家ID
        type: 0              //禁言类型
    }

    /**加入房间广播 */
    public static Rev100145 = {
        avater: "",
        build_desk_count: 0,
        deskno: 0,
        deskstation: 0,
        dwBank: 0,
        exp: 0,
        isrobot: 0,
        losecount: 0,
        midcount: 0,
        money: 0,
        nickname: "",
        reconnect: false,
        room_card: 0,
        room_card_coop: 0,
        sex: 1,
        signature: "",
        szName: "",
        userid: 0,
        userstate: 0,
        vip_rank: 0,
        win_point: 0,
        wincount: 0
    }
    /**
     * 加入匹配房
     */
    public static Send100120 = {
        userid: 0,
        deviceID: ""
    }

    /**
     * 匹配房返回
     */
    public static Rev100120 = {
        code: 0,
        command_id: 0,
        info: {
            deskInfo: {
                curSitPeopleCount: 0,
                deskID: 0,
                deskLevel: 0,
                deskName: "",
                gameConfig: null,
                gameid: 0,
                peoplecount: 0
            },
            deskstation: 0,
            retCode: 0,
            chat_room_id: "0",
            userList: []
        }
    }

    /**请求准备 */
    public static Send100162 = {
        userid: 0,
        deviceID: ""
    }

    /**接收玩家准备 */
    public static Rev100162 = {
        code: 0,
        command_id: 0,
        info: {
            deskstation: 0,
            userid: 0
        }

    }

    /**接收玩家取消准备 */
    public static Rev100167 = {
        deskstation: 0,
        userid: 0
    }

    /**断线重连请求  （没用） */
    public static Send100801 = {
        userid: 0,
        deviceID: ""
    }

    /**获取游戏状态 */
    public static Send100150 = {
        userid: 0,
        room_name: ""
    }

    /**发送好友房内记录 */
    public static Send101004 = {
        
    }

    /**创建好友房 */
    public static Send101000 = {
        userid: 0,
        desk_name: "",
        deviceID: ""
    }

    /**创建好友房返回 */
    public static Rev101000 = {
        code: 0,
        command_id: 0,
        info: {
            ownerID: 0,          //桌子拥有者ID
            ownerName: "",       //桌子拥有者昵称,
            createTime: "",
            deskName: "",        //桌子名
            deskCode: 0,         //桌子号码（唯一标识）
            basePoint: 0,        //每局基础积分
            isWork: 0,
            play_times_limit: 0,
            gameConfig: ProtocolData.gameConfig, //游戏配置
            retData: {
                chat_room_id: "",
                deskno: 0,
                deskstation: 0,
                userList: []
            }
        }
    }

    /**发送加入好友房 */
    public static Send101001 = {
        userid: 0,
        desk_code: 0,
        deviceID: "string"
    }

    /**接受好友房返回 */
    public static Rev101001 = {
        code: 0,
        command_id: 101001,
        info: {
            deskID: 0,       //桌子ID
            deskName: "",    //桌子名称
            deskno: 0,       //桌子序号
            deskstation: 0,  //所坐桌子位置
            userList: [],     //用户资料
            chat_room_id: ""
        }
    }

    /**
     * 匹配房发送退出房间
     */
    public static Send100121 = {
        userid: 0,
        deviceID: ""
    }

    /**
     * 好友房发送退出房间
     */
    public static Send101002 = {
        userid: 0,
        deviceID: ""
    }

    /**
     * 接收好友房退出房间
     */
    public static Rev100121 = {
        code: 0,
        command_id: 0,
        info: {}
    }

    /**
     * 接收好友房退出房间
     */
    public static Rev101002 = {
        code: 0,
        command_id: 0,
        info: {}
    }

    /**
     * 广播通知有玩家掉线
     */
    public static Rev100012 = {
        code: 0,
        command_id: 0,
        info: {
            deskno: 0,    //所在桌子号
            userid: 0,   //新进入的玩家id
            nickname: "", //新进入玩家的昵称
            deskstation: 0   //新玩家坐桌位置
        }
    }

    /**
     * 发送修改好友房规则
     */
    public static Send100102 = {
        desk_id: 0,
        play_times_limit: 0,
        gameConfig: {
            gameType: 0,
            hasSanTong: false,
            hasBuBuGao: false,
            hasYiZhiHua: false,
            zhaNiaoNum: 0
        }
    }

    /**
     * 接受好友房规则修改
     */
    public static Rev100102 = {
        code: 0,
        command_id: 0,
        info: {
            retCode: 0
        }
    }

    /**
     * 接收游戏结束扎鸟
     */
    public static Rev100901 = {
        cardList: [],
        seatID: 0
    }

    /**测试接收规则 */
    public static Send100117 = {
        desk_id: 0
    }

    /**修改规则初始值 */
    public static Send100118 = {
        desk_id: 0
    }

    /**发送邀请 */
    public static Send100119 = {
        desk_id: 0
    }

    /**
     * 请求解散好友房桌子
     */
    public static Send100151 = {
        userid: 0,
        deviceID: ""
    }

    /**
     * 接收解散好友房返回
     */
    public static Rev100151 = {
        code: 0,
        command_id: 0,
        info: {}
    }

    /**
     * 接收解散房间广播
     */
    public static Rev100155 = {
        code: 0,
        command_id: 0,
        info: {
            deskno: 0,
            solveUserID: 0,
            solveUserName: ""
        }
    }

    /**
     * 发送断线重连
     */
    public static Send100010 = {
        userid: 0,
        room_name: ""
    }

    /**
     * 发送解散房间回应
     */
    public static Send100156 = {
        userid: 0,
        isArgee: 0,
        deviceID: ""
    }

    /**
     * 广播通知某玩家对解散桌子的回应
     */
    public static Rev100159 = {
        code: 0,
        command_id: 0,
        info: {
            user_id: 0,
            is_agree: 0
        }
    }

    /**
     * 广播通知解散桌子
     */
    public static Rev100160 = {
        code: 0,
        command_id: 0,
        info: {
            deskID: 0,
            overType: 0
        }
    }

    /**
     * 广播通知有玩家离开房间
     */
    public static Rev100047 = {
        deskno: 0,
        deskstation: 0,
        userid: 0
    }

    /**
     * 查看规则
     */
    public static Rev100117 = {
        code: 0,
        command_id: 0,
        info: {
            basePoint: 0,
            current_play_count: 0,
            gameType: 0,
            hasBuBuGao: false,
            hasSanTong: false,
            hasYiPaoSanXiang: false,
            desk_owner_id: 0,
            hasYiZhiHua: false,
            play_times_limit: 0,
            zhaNiaoNum: 0
        }
    }

    /**
     * 接收一轮游戏结束
     */
    public static Rev100818 = {
        code: 0,
        command_id: 0,
        info: {
            maxPlayCount: 0,
            curPlayCount: 0,
            RecordList: []
        }
    }

    /**
     *发送踢人消息 
     */
    public static Send100128 = {
        kickUserID:0
    }

    /**
     * 发送换桌消息
     */
    public static Send100124 = {
        userid: 0
    }

}











